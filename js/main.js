/* =========================================================
   Pabii's Retreat - main.js
   1. Site-wide search (all pages)
   2. Image lightbox (larger, scrollable, zoomable)
   3. Form validation + AJAX-style submission
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. SITE-WIDE SEARCH ---------- */
  const box = document.querySelector('.site-search');
  const index = window.SITE_SEARCH_INDEX || [];
  if (box && index.length) {
    const input = box.querySelector('input[type="search"]');
    const list = box.querySelector('.search-results');
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const rx = terms => new RegExp('(' + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
    let active = -1;

    const search = q => {
      const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
      if (!terms.length) return [];
      return index.map(e => {
        const h = e.heading.toLowerCase(), t = e.text.toLowerCase();
        if (!terms.every(w => h.includes(w) || t.includes(w) || e.page.toLowerCase().includes(w))) return null;
        const score = terms.reduce((s, w) => s + (h.includes(w) ? 5 : 0) + (t.split(w).length - 1), 0);
        return { e, score, terms };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
    };

    const snippet = (text, terms) => {
      const pos = Math.max(0, text.toLowerCase().indexOf(terms[0]) - 40);
      return (pos ? '…' : '') + text.slice(pos, pos + 120) + '…';
    };

    const render = () => {
      const q = input.value.trim();
      active = -1;
      if (q.length < 2) { list.hidden = true; return; }
      const res = search(q);
      list.hidden = false;
      if (!res.length) {
        list.innerHTML = '<p class="search-empty">No results for “' + esc(q) + '”. Try “massage”, “facial” or “package”.</p>';
        return;
      }
      list.innerHTML = '<ul>' + res.map(r => {
        const re = rx(r.terms);
        return '<li><a href="' + r.e.url + '?q=' + encodeURIComponent(q) + '">' +
          '<span class="result-page">' + esc(r.e.page) + '</span>' +
          '<span class="result-title">' + esc(r.e.heading).replace(re, '<mark>$1</mark>') + '</span>' +
          '<span class="result-snippet">' + esc(snippet(r.e.text, r.terms)).replace(re, '<mark>$1</mark>') + '</span></a></li>';
      }).join('') + '</ul>';
    };

    input.addEventListener('input', render);
    box.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      render();
      const first = list.querySelector('a');
      if (first) first.click();
    });
    input.addEventListener('keydown', e => {
      const links = [...list.querySelectorAll('a')];
      if (e.key === 'Escape') { list.hidden = true; return; }
      if (!links.length || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach((l, i) => l.classList.toggle('active', i === active));
      links[active].scrollIntoView({ block: 'nearest' });
    });
    document.addEventListener('click', e => { if (!box.contains(e.target)) list.hidden = true; });

    // On the destination page, highlight the searched words and scroll to the first hit.
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
      const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
      if (terms.length) {
        const re = rx(terms);
        const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) if (re.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
        nodes.forEach(n => {
          re.lastIndex = 0;
          const span = document.createElement('span');
          span.innerHTML = esc(n.nodeValue).replace(re, '<mark class="search-hit">$1</mark>');
          n.replaceWith(span);
        });
        const hit = document.querySelector('mark.search-hit');
        if (hit) hit.scrollIntoView({ block: 'center' });
      }
    }
  }

  /* ---------- 2. LIGHTBOX ---------- */
  const imgs = [...document.querySelectorAll('main img')];
  if (imgs.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox'; lb.hidden = true;
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Enlarged image');
    lb.innerHTML =
      '<span class="lightbox-count" aria-live="polite"></span>' +
      '<button type="button" class="lightbox-zoom" aria-label="Zoom in or out">&#43;</button>' +
      '<button type="button" class="lightbox-close" aria-label="Close image">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button>' +
      '<div class="lightbox-stage"><img alt=""></div>' +
      '<button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>' +
      '<p class="lightbox-caption"></p>';
    document.body.append(lb);
    const big = lb.querySelector('.lightbox-stage img');
    const stage = lb.querySelector('.lightbox-stage');
    const cap = lb.querySelector('.lightbox-caption');
    const count = lb.querySelector('.lightbox-count');
    let cur = 0, opener = null;

    const show = i => {
      cur = (i + imgs.length) % imgs.length;
      const im = imgs[cur];
      lb.classList.remove('zoomed');
      big.src = im.currentSrc || im.src;
      big.alt = im.alt;
      cap.textContent = im.alt;
      count.textContent = (cur + 1) + ' / ' + imgs.length;
      stage.scrollTo(0, 0);
      lb.querySelector('.lightbox-prev').hidden = lb.querySelector('.lightbox-next').hidden = imgs.length < 2;
    };
    const open = i => {
      opener = imgs[i];
      lb.hidden = false;
      document.body.classList.add('lightbox-open');
      show(i);
      lb.querySelector('.lightbox-close').focus();
    };
    const close = () => {
      lb.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (opener) opener.focus();
    };
    const toggleZoom = () => lb.classList.toggle('zoomed');

    imgs.forEach((im, i) => {
      im.classList.add('zoomable');
      im.tabIndex = 0;
      im.setAttribute('role', 'button');
      im.setAttribute('aria-label', 'Open larger image: ' + im.alt);
      im.addEventListener('click', () => open(i));
      im.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.querySelector('.lightbox-prev').addEventListener('click', () => show(cur - 1));
    lb.querySelector('.lightbox-next').addEventListener('click', () => show(cur + 1));
    lb.querySelector('.lightbox-zoom').addEventListener('click', toggleZoom);
    big.addEventListener('click', toggleZoom);
    lb.addEventListener('click', e => { if (e.target === lb || e.target === stage) close(); });
    document.addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === '+' || e.key === '-') toggleZoom();
    });
    // swipe left/right on touch screens
    let x0 = null;
    stage.addEventListener('touchstart', e => { x0 = lb.classList.contains('zoomed') ? null : e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 60) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- 3. FORMS: client-side validation + AJAX ---------- */
  const setError = (field, msg) => {
    let err = field.parentNode.querySelector('.field-error[data-for="' + field.id + '"]');
    if (!msg) { if (err) err.remove(); field.removeAttribute('aria-invalid'); return; }
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error'; err.dataset.for = field.id; err.setAttribute('role', 'alert');
      field.after(err);
    }
    err.textContent = msg; field.setAttribute('aria-invalid', 'true');
  };
  const check = f => {
    const v = f.value.trim();
    if (f.required && !v) return 'This field is required.';
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address.';
    if (f.type === 'tel' && v && !/^(\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/.test(v)) return 'Enter a valid South African number, e.g. 061 232 6031.';
    if (f.type === 'date' && v && v < new Date().toISOString().slice(0, 10)) return 'Choose today or a future date.';
    if (f.type === 'number' && v && (+v < +(f.min || 1) || +v > +(f.max || 1e6))) return 'Enter a number between ' + (f.min || 1) + ' and ' + (f.max || 1e6) + '.';
    if (f.minLength > 0 && v && v.length < f.minLength) return 'Please enter at least ' + f.minLength + ' characters.';
    return '';
  };

  document.querySelectorAll('main form').forEach(form => {
    form.noValidate = true;
    const date = form.querySelector('input[type="date"]');
    if (date) date.min = new Date().toISOString().slice(0, 10);
    const fields = [...form.querySelectorAll('input, select, textarea')];
    fields.forEach(f => f.addEventListener('blur', () => setError(f, check(f))));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      let firstBad = null;
      fields.forEach(f => { const m = check(f); setError(f, m); if (m && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }

      let msg = form.querySelector('.form-feedback');
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'form-feedback'; msg.setAttribute('role', 'status'); msg.setAttribute('aria-live', 'polite');
        form.append(msg);
      }
      const data = Object.fromEntries(new FormData(form));
      const kind = form.dataset.form;

      if (kind === 'enquiry') {
        // Process the enquiry and answer with cost + availability (simulated AJAX call).
        msg.textContent = 'Checking availability…';
        await new Promise(r => setTimeout(r, 600));
        const prices = { 'group-booking': 450, 'couples-booking': 900, 'spa-day-package': 600, 'premium-full-day': 1200,
          'maternity-half-day': 500, 'moonlight-spa': 700, 'full-day-package': 950, 'corporate-retreat': 400, 'romantic-escape': 1100, other: 0 };
        const perPerson = ['group-booking', 'corporate-retreat'].includes(data['booking-type']);
        const guests = +data.guests || 1;
        const cost = perPerson ? prices[data['booking-type']] * guests : prices[data['booking-type']];
        const d = data.date ? new Date(data.date) : null;
        const closed = d && d.getDay() === 0;
        msg.textContent = 'Thank you, ' + data.fullname + '. ' +
          (cost ? 'Estimated cost: R' + cost + (perPerson ? ' (R' + prices[data['booking-type']] + ' per person for ' + guests + ' guest(s))' : '') + '. ' : 'We will send you a quote. ') +
          (closed ? 'Sundays are closed - please pick another day; we are open Mon-Fri 09:00-18:00 and Sat 08:00-13:00.'
                  : 'Your preferred slot looks available; we will confirm by email or phone within 24 hours.');
      } else if (kind === 'contact') {
        // Compile the message into an email to the retreat; opens the client's mail app.
        const body = 'Name: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + (data.phone || '-') + '\nType: ' + (data.subject || 'General') + '\n\n' + data.message;
        const href = 'mailto:pabii%27s@retreatspa.co.za?subject=' + encodeURIComponent('Website message: ' + (data.subject || 'General enquiry')) + '&body=' + encodeURIComponent(body);
        msg.innerHTML = 'Thank you, ' + esc2(data.name) + '. Your message is ready - <a href="' + href + '"><strong>click here to send the email</strong></a> if your mail app did not open.';
        window.location.href = href;
      } else {
        msg.textContent = 'Thank you. Your details have been received.';
      }
      msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
  function esc2(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
});


//leaflet map
var map = L.map('map').setView([-26.2659875,27.8957004], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-26.2659875,27.8957004]).addTo(map)
    .bindPopup('Msilinga St, Pimville, 2093<br>Pabii\'s Retreat Spa')
    .openPopup();