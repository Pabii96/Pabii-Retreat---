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
