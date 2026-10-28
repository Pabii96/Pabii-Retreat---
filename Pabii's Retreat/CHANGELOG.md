Part 1&2
Changelog - Pabii's Retreat 

10 July 2026 - Project Initialization & Scope 

Established Pabii’s Retreat as a new wellness business launched in July 2026. 

Create project documentation and defined the objectives of the organisation and stated the affordability therapeutic services, stress relief, and physical wellbeing 

25 July 2026 - Research & Sitemap Planning 

Completed initial sitemap structure and content sourcing for core HTML pages. 

Gathered public domain assets and drafted treatment package descriptions. 

02 August 2026 - Part 1 Deliverables & Feature Additions


Added dedicated area for customers feedback, testimonials, and highlighting reviews are increasing as family and friends try the treatments. 

Added a social media planning to describe the plans, engagement activities, shows their services and strategies to attract more clients. 

Added a roadmap for future improvements that will be dealing with plans for booking systems, secure payments options, mobile accessibility enhancements, and expanded package. 

09 September 2026 - Feedback Corrections & HTML Refinement 

Standardised file paths and corrected relative links across site navigation. 

Improved layout markup to semantic HTML5 tags (<header>, <nav>, <main>, <section>, <footer>). 

Enhanced form inputs for both the enquiry form and contact page. 

14 September 2026 - Part 2 CSS Styling & Layout Implementation 

Created external stylesheet css/style.css and connected all pages. 

Added CSS reset rules, typography scales (rem), and primary/accent colour variables. 

Developed multi-column card layouts using CSS Grid for service/package sections. 

16 September 2026 - Responsive Breakpoints & Final Verification 

Added custom @media queries targeting different screen sizes. 

Tested cross-browser to Google Chrome, and Microsoft Edge. 

Defined a responsive breakpoint for different screen size. 

Part 3 Changelog Pabii's Retreat

21 October 2026 - Changes applied to every page

Site-wide search bar added to the header (all 8 pages) with a screen-reader label and live results
area.

Scripts linked before </body>: js/search-index.js and js/main.js (search, lightbox, form validation).

Centred page margin via css/style.css: page column up to 1280px, centred with equal side margins; content centred at 1100px.

Lightbox applied automatically to every image inside <main> (the logo in the header is excluded).

Layout fixes: horizontal navigation bar on desktop, card/grid styles, buttons, form styling, responsive
breakpoints at 900px and 650px.

21 October 2026- Page by page

Index.html- Home

Search bar added to header; scripts linked.

Hero image, service cards' "why choose us" blocks and buttons now styled and centred (CSS only).

Service images open in the lightbox.

about.html - About us

Search bar added to header; scripts linked.

Facial treatment image opens in the lightbox; "What We Offer" cards laid out in a grid.

services.html - Services

Search bar added to header; scripts linked.

Fixed 6 broken links:  enquires.html → enquiry.html (4 "Enquire Now" buttons plus 2 further links).

Corrected alt text on the facial image (was "Hot stone therapy").

All four service images open in the lightbox; cards laid out in a two-column grid.

22 October 2026 - packages.html - Packages

Replaced the duplicated, nested <header> and unstyled link list with the standard site header and navigation, so the search bar and mobile menu now work on this page.

Fixed broken links: enquires.html → enquiry.html.

Scripts linked.

gallery.html – Gallery

Search bar added; scripts linked.

Removed stray <link rel="stylesheet"> placed inside the logo container.

Added the missing closing </div> for gallery-grid.

Removed duplicated headings and typos ("Full Body Message", "Foot Message", "Facials", "Pool Lunch", "Pool Pic", "Bed Area" appeared twice or above the image).

Corrected alt text: full body massage image (was "Facial treatment"); "Pabi's" → "Pabii's" on Pool Pic and Bed Area.

Added missing headings for Pool Pic and Bed Area; replaced the copied caption on Bed Area with "A calm treatment room with comfortable massage beds."

Lightbox: all 7 images open large with previous/next, zoom and scroll.

enquiry.html - Enquiry

Search bar added; scripts linked.

Form marked data-form="enquiry". JavaScript validates required fields, email, South Africa phone format, past dates and guest numbers, showing inline error messages.

On a valid submit the page shows an estimated cost and availability message without reloading (including a Sunday-cloased notice).




