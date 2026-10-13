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
