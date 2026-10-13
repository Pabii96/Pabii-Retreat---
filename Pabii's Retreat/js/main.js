document.addEventListener('DOMContentLoaded', () => {
  // Site-wide page search filters visible links/content and provides helpful feedback.
  const searchForms = document.querySelectorAll('[data-site-search]');
  searchForms.forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const field = form.querySelector('input[type="search"]');
    const query = (field?.value || '').trim().toLowerCase();
    let results = [...document.querySelectorAll('main h2, main h3, main p, main li, main a')];
    results = results.filter(el => el.textContent.toLowerCase().includes(query));
    let panel = document.getElementById('site-search-results');
if (!panel) {
      panel = document.createElement('section'); panel.id = 'site-search-results';
      panel.className = 'search-results'; panel.setAttribute('aria-live','polite');
      document.querySelector('main')?.prepend(panel);
    }
    panel.replaceChildren();
    const heading = document.createElement('h2'); heading.textContent = query ? `Search results for “${field.value.trim()}”` : 'Search the website';
    panel.append(heading);
    if (!query) { const p=document.createElement('p'); p.textContent='Enter a word or phrase to search this page.'; panel.append(p); return; }
    const unique = [...new Set(results)].slice(0,12);
    if (!unique.length) { const p=document.createElement('p'); p.textContent='No matching content was found on this page. Try another search term or use the navigation menu.'; panel.append(p); }
    else { const ul=document.createElement('ul'); unique.forEach(el=>{ const li=document.createElement('li'); const a=document.createElement('a'); a.href = el.closest('a')?.href || '#'; a.textContent=el.textContent.trim().slice(0,180); if(a.href.endsWith('#')) a.addEventListener('click',e=>e.preventDefault()); li.append(a); ul.append(li); }); panel.append(ul); }
    panel.scrollIntoView({behavior:'smooth',block:'start'});
    }));
  // Accessible gallery lightbox.
  const galleryImages = [...document.querySelectorAll('main img')].filter(img => /gallery/i.test(location.pathname) || img.closest('.gallery-grid, .gallery, .image-gallery'));
  if (galleryImages.length) {
    const overlay = document.createElement('div'); overlay.className='lightbox'; overlay.hidden=true;
    overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true'); overlay.setAttribute('aria-label','Expanded gallery image');
    overlay.innerHTML='<button type="button" class="lightbox-close" aria-label="Close expanded image">&times;</button><button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>';
    document.body.append(overlay);
    const big=overlay.querySelector('img'), caption=overlay.querySelector('figcaption');
    let index=0;
 const show=i=>{index=(i+galleryImages.length)%galleryImages.length; const im=galleryImages[index]; big.src=im.currentSrc||im.src; big.alt=im.alt||'Pabii Retreat gallery image'; caption.textContent=im.alt||`Gallery image ${index+1}`; overlay.hidden=false; overlay.querySelector('.lightbox-close').focus();};
    galleryImages.forEach((img,i)=>{img.classList.add('gallery-zoomable'); img.tabIndex=0; img.setAttribute('role','button'); img.setAttribute('aria-label',`View larger image: ${img.alt||'gallery image'}`); img.addEventListener('click',()=>show(i)); img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i);}});});
    const close=()=>{overlay.hidden=true; galleryImages[index]?.focus();};
    overlay.querySelector('.lightbox-close').addEventListener('click',close);
    overlay.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));
    overlay.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));
    overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
    document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
}
  // Front-end validation/demo feedback. This does not transmit or store form submissions.
  document.querySelectorAll('form').forEach(form=>{
    form.querySelectorAll('input[type="email"]').forEach(input=>input.setAttribute('autocomplete','email'));
    form.querySelectorAll('input[type="tel"]').forEach(input=>input.setAttribute('autocomplete','tel'));
    const date=form.querySelector('input[type="date"]'); if(date) date.min=new Date().toISOString().slice(0,10);
    form.addEventListener('submit', event=>{
      if(!form.checkValidity()){event.preventDefault();form.reportValidity();return;}
      if(form.getAttribute('action')==='#' || !form.getAttribute('action')) {
        event.preventDefault();
        let msg=form.querySelector('.form-feedback');
        if(!msg){msg=document.createElement('p');msg.className='form-feedback';msg.setAttribute('role','status');msg.setAttribute('aria-live','polite');form.append(msg);}
        msg.textContent='Thank you. Your details passed the form checks. This demonstration website does not send messages yet; please contact the retreat directly to confirm your enquiry.';
        msg.scrollIntoView({behavior:'smooth',block:'nearest'});
      }
        });
  });
});
