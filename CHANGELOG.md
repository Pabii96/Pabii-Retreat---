part 1&2
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

## 28 October 2026 - Search, Lightbox, Centred Layout and Rubric Fixes (Part 3)

**Requested changes**
- **Site-wide search bar:** Added a search field to the header of all 8 pages (`index`, `about`, `services`, `packages`, `gallery`, `enquiry`, `contact`, `reviews`). It searches the content of every page, shows ranked results with the page name, heading and a highlighted snippet, supports keyboard navigation (arrow keys, Enter, Escape) and, on the page that is opened, highlights the searched words and scrolls to the first match. Files: `js/main.js`, `js/search-index.js` (generated), `tools/build-search-index.js`, `css/style.css`. Re-run `node tools/build-search-index.js` after editing page content.
- **Image lightbox:** Every content image now opens in a full-screen lightbox. It opens as large as the screen allows, has Previous/Next buttons (also arrow keys and swipe on touch screens), a caption taken from the alt text, an image counter, a zoom button (click the image or press + / -) that enlarges the picture beyond the screen so it can be **scrolled** in both directions, and closes with the X button, Escape or a click outside the image. Focus returns to the image on close.
- **Centred page margin:** The site now sits in a centred column (`max-width: 1280px; margin: 0 auto`) with equal margins and a soft shadow on wide screens; section content is centred inside it (`max-width: 1100px`). Previously everything was stretched to the left edge.

**Fixes made so the site meets the rubric**
- Created `js/` folder at the root (rubric 4.2: `css`, `js`, `images`) and linked the script on every page; the earlier `main.js` was stored in a nested folder and never linked.
- Added CSS for classes already used in the HTML but missing from the stylesheet (`.services-grid`, `.service-container`, `.cards`, `.contact-container`, `.enquiry-container`, `.button`, `.booking-section`, form fields), so cards, forms and buttons are laid out properly. Navigation now displays as a horizontal bar on desktop (was a vertical list).
- Responsive additions at 900px and 650px: multi-column to single column, stacked hero, mobile menu and search bar, `prefers-reduced-motion` support.
- Fixed broken links: `enquires.html` changed to `enquiry.html` on the Services page.
- Gallery page: closed the unclosed `gallery-grid` div, removed duplicated headings ("Full Body Message", "Foot Message" typos), corrected wrong alt text (full body massage image was labelled "Facial treatment"), fixed "Pabi's" spelling, replaced a copied caption on the Bed Area image, and added missing headings for Pool Pic and Bed Area.
- Services page: corrected duplicated alt text on the facial image.
- Removed a stray `<link>` tag inside the logo container on the Gallery page; fixed a broken HTML comment (`<-- ... -->`) on the Contact page.
- Contact page: the map section now shows two locations (the Retreat and the nearby Maponya Mall landmark) with accessible titles (rubric: more than one location).
- Forms (Part 3 section 4): client-side JavaScript validation with inline error messages (required fields, email format, South African phone format, no past dates, number ranges). The **enquiry** form gives an estimated cost and availability response without reloading the page; the **contact** form compiles the validated message into an email addressed to the Retreat. Forms use `novalidate` so JavaScript messages show consistently.
- SEO (Part 3 section 3): added `robots.txt` and `sitemap.xml`; existing unique titles and meta descriptions, heading hierarchy and alt text kept and corrected.
- Added screen-reader-only label for the search field, `aria-live` results and visible focus styles.
