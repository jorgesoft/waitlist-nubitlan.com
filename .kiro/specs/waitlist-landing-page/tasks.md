# Implementation Plan

- [x] 1. Update index.html with Bootstrap CDN and SEO meta tags
  - Replace the existing index.html with the complete version including Bootstrap CSS and JS CDN links
  - Add all SEO meta tags: title, description, Open Graph tags, and Twitter Card tags
  - Set HTML lang attribute to "es" for Spanish
  - Add analytics placeholder comment in head section
  - Ensure viewport meta tag is configured for mobile responsiveness
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2_

- [x] 2. Implement the main App component with all landing page sections
  - Remove default Vite template code from App.tsx
  - Remove import of App.css file
  - Create useRef hook for form section scroll target
  - Implement scrollToForm function with smooth scroll behavior
  - _Requirements: 3.2, 6.4_

- [x] 3. Build header section
  - Create header element with border-bottom and padding
  - Add brand name "Nubitlan" on the left
  - Add Privacy Policy link on the right
  - Use Bootstrap utility classes for layout and styling
  - _Requirements: 4.5_

- [ ] 4. Build hero section
  - Create section with light background and responsive padding
  - Add H1 headline with exact Spanish copy
  - Add lead paragraph with subheadline copy
  - Create primary CTA button "Únete a la lista de espera" with onClick handler
  - Add micro-copy below button about free guide
  - Use Bootstrap display, lead, and button classes
  - _Requirements: 1.1, 1.2, 1.5, 3.2, 2.1, 2.2_

- [ ] 5. Build problem section
  - Create section with standard padding
  - Add H2 heading "El problema"
  - Add micro-value line paragraph
  - Create unordered list with four pain point bullets
  - Use exact Spanish copy for all content
  - _Requirements: 1.3, 1.5, 4.2_

- [ ] 6. Build solution section
  - Create section with light background
  - Add H2 heading "Nuestra propuesta"
  - Add intro paragraph
  - Create unordered list with four solution bullets
  - Use exact Spanish copy for all content
  - _Requirements: 1.4, 1.5_

- [ ] 7. Build waitlist form section with Airtable embed
  - Create section with centered column layout (col-12 col-lg-8)
  - Add H2 heading "Únete a la lista de espera"
  - Add intro text above form
  - Create div with ref={formRef} for scroll target
  - Embed Airtable iframe with exact URL and all required attributes
  - Set iframe with ratio-4x3 wrapper and minHeight 560px
  - Add privacy reassurance message below form with lock emoji
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 7.5, 4.3_

- [ ] 8. Build trust section
  - Create section with bordered card styling
  - Add credibility statement paragraph
  - Use Bootstrap border, rounded, and padding classes
  - _Requirements: 4.1_

- [ ] 9. Build footer section
  - Create footer with border-top and flex layout
  - Add copyright with current year
  - Add Privacy Policy link with id="privacy" anchor
  - Add contact email link
  - Use responsive flex direction (column on mobile, row on desktop)
  - _Requirements: 4.4_

- [ ] 10. Remove unused files and verify build
  - Delete src/App.css file
  - Remove unused imports from App.tsx
  - Verify no console errors in browser
  - Run build command to ensure successful compilation
  - _Requirements: 6.3, 7.1, 7.2, 7.3_

- [ ]* 11. Validate accessibility and performance
  - Run Lighthouse audit in mobile mode
  - Verify performance score ≥ 90
  - Verify accessibility score ≥ 95
  - Verify best practices score ≥ 95
  - Verify SEO score ≥ 90
  - Test keyboard navigation through all interactive elements
  - _Requirements: 2.3, 2.4, 2.5, 6.6_
