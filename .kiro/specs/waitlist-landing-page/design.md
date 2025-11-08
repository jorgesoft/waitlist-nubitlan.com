# Design Document

## Overview

The waitlist landing page is a single-page React application built with TypeScript and Vite, styled exclusively with Bootstrap 5.3.3 via CDN. The page follows a linear narrative structure guiding visitors from problem awareness through solution understanding to signup action. The design prioritizes mobile-first responsiveness, accessibility, fast load times, and conversion optimization.

The page architecture is intentionally minimal: one React component (App.tsx), no custom CSS files, no state management beyond a single ref for scroll behavior, and no client-side routing. All styling leverages Bootstrap utility classes to maintain consistency and reduce bundle size.

## Architecture

### Technology Stack

- **Framework**: React 19.1.1 with TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Bootstrap 5.3.3 (CDN only, no npm package)
- **Form**: Airtable embedded iframe
- **Deployment**: Static HTML/CSS/JS bundle

### Component Structure

```
App.tsx (single component)
├── Header (navigation bar)
├── Hero Section (headline + CTA)
├── Problem Section (pain points)
├── Solution Section (value proposition)
├── Waitlist Form Section (Airtable embed)
├── Trust Section (credibility statement)
└── Footer (links + contact)
```

The application uses a single functional component with one `useRef` hook to enable smooth scrolling to the form. No additional components are needed given the simplicity of the page.

### File Modifications

1. **index.html**: Add Bootstrap CDN links, SEO meta tags, Open Graph tags, Twitter Card tags, analytics placeholder
2. **src/App.tsx**: Replace default Vite template with landing page layout
3. **src/App.css**: Delete (not needed)
4. **src/index.css**: Keep minimal or delete (Bootstrap handles base styles)

## Components and Interfaces

### App Component

**Purpose**: Render the complete landing page with all sections

**Props**: None (root component)

**State**: 
- `formRef`: React ref pointing to the form section div for smooth scroll behavior

**Key Methods**:
- `scrollToForm()`: Smooth scrolls to the form section when CTA button is clicked

**TypeScript Interface**:
```typescript
// No explicit interface needed - component uses standard React types
const formRef = useRef<HTMLDivElement | null>(null);
```

### Section Breakdown

#### 1. Header
- **Layout**: Fixed-height bar with container
- **Content**: Brand name (left), Privacy Policy link (right)
- **Bootstrap Classes**: `border-bottom`, `py-2`, `container`, `d-flex`, `align-items-center`, `justify-content-between`

#### 2. Hero Section
- **Layout**: Full-width with light background, responsive padding
- **Content**: H1 headline, lead paragraph, primary CTA button, micro-copy
- **Bootstrap Classes**: `py-5`, `py-md-6`, `bg-light`, `display-5`, `fw-bold`, `lead`, `btn-primary`, `btn-lg`
- **Behavior**: Button onClick triggers `scrollToForm()`

#### 3. Problem Section
- **Layout**: Container with standard padding
- **Content**: H2 heading, intro paragraph, unordered list of pain points
- **Bootstrap Classes**: `py-5`, `h4`, `mb-2`, `mt-2`

#### 4. Solution Section
- **Layout**: Container with light background
- **Content**: H2 heading, intro paragraph, unordered list of benefits
- **Bootstrap Classes**: `py-5`, `bg-light`, `h4`, `mb-2`, `mt-2`

#### 5. Waitlist Form Section
- **Layout**: Centered column (8/12 on large screens, full width on mobile)
- **Content**: H2 heading, intro text, Airtable iframe, privacy note
- **Bootstrap Classes**: `py-5`, `row`, `justify-content-center`, `col-12`, `col-lg-8`, `text-center`, `ratio`, `ratio-4x3`
- **Iframe Attributes**:
  - `src`: Airtable embed URL
  - `frameBorder`: "0"
  - `width`: "100%"
  - `height`: "100%"
  - `style`: `{ background: "transparent", border: "1px solid #ccc" }`
  - `title`: "Waitlist form" (accessibility)
- **Ref**: Attached to wrapper div for scroll target

#### 6. Trust Section
- **Layout**: Container with bordered card
- **Content**: Single paragraph with credibility statement
- **Bootstrap Classes**: `py-4`, `bg-white`, `border`, `rounded-3`, `p-3`, `p-md-4`

#### 7. Footer
- **Layout**: Flex container with responsive direction
- **Content**: Copyright, Privacy Policy link, contact email
- **Bootstrap Classes**: `py-4`, `border-top`, `d-flex`, `flex-column`, `flex-md-row`, `justify-content-between`, `align-items-center`

## Data Models

No data models required. The page is purely presentational with no client-side data management. The Airtable form handles all data collection and storage externally.

## Error Handling

### Build-Time Errors
- TypeScript compilation errors will be caught by `tsc -b` during build
- ESLint will catch unused imports and code quality issues
- Vite will report any module resolution failures

### Runtime Errors
- **Iframe Loading**: If Airtable embed fails to load, the iframe will display a blank area with border. No JavaScript error handling needed as this is external content.
- **Scroll Behavior**: The `scrollIntoView` method is well-supported; no fallback needed for modern browsers.
- **Missing Ref**: TypeScript ensures `formRef.current` is checked with optional chaining (`?.`) before calling `scrollIntoView`.

### Accessibility Errors
- Semantic HTML ensures screen readers can navigate properly
- All interactive elements (buttons, links) have visible focus states via Bootstrap defaults
- Iframe includes `title` attribute for screen reader context

## Testing Strategy

### Manual Testing Checklist

1. **Visual Regression**
   - Verify all copy matches specification exactly
   - Check spacing and alignment on mobile (375px), tablet (768px), desktop (1440px)
   - Confirm Bootstrap styles load correctly (no FOUC)

2. **Functional Testing**
   - Click "Únete a la lista de espera" button → smooth scroll to form
   - Verify Airtable form loads and is interactive
   - Test all footer links (even if placeholder)
   - Verify header Privacy Policy link scrolls to footer anchor

3. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge (latest versions)
   - Mobile Safari (iOS), Chrome Mobile (Android)

4. **Accessibility Testing**
   - Tab through all interactive elements (keyboard navigation)
   - Test with screen reader (VoiceOver/NVDA) for semantic structure
   - Verify color contrast meets WCAG AA standards (Bootstrap defaults comply)

### Automated Testing

1. **Build Validation**
   ```bash
   npm run build
   # Should complete without errors
   # Should output dist/ folder with index.html, assets/
   ```

2. **Lighthouse Audit**
   - Run Lighthouse in Chrome DevTools (mobile simulation)
   - Target scores:
     - Performance: ≥ 90
     - Accessibility: ≥ 95
     - Best Practices: ≥ 95
     - SEO: ≥ 90

3. **TypeScript Check**
   ```bash
   tsc -b
   # Should complete with no errors
   ```

4. **Linting**
   ```bash
   npm run lint
   # Should pass with no errors
   ```

### Performance Validation

- **First Contentful Paint**: < 1.5s (Bootstrap CDN is cached globally)
- **Largest Contentful Paint**: < 2.5s (text-based content loads fast)
- **Cumulative Layout Shift**: < 0.1 (no dynamic content shifts)
- **Total Bundle Size**: < 200KB (React + minimal app code)

## SEO Implementation

### Meta Tags (in index.html)

```html
<title>Nubitlan — Cumplimiento y Seguridad de Datos (El Salvador)</title>
<meta name="description" content="Herramienta impulsada por IA para cumplir la Ley de Protección de Datos Personales de El Salvador y fortalecer la ciberseguridad en PYMEs." />

<!-- Open Graph -->
<meta property="og:title" content="Cumplimiento y Seguridad de Datos — El Salvador" />
<meta property="og:description" content="Evita sanciones y mejora tu seguridad con una guía simple e impulsada por IA. Únete a la lista de espera." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tu-dominio.com/" />
<meta property="og:image" content="https://tu-dominio.com/og.png" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Cumplimiento y Seguridad de Datos — El Salvador" />
<meta name="twitter:description" content="Evita sanciones y mejora tu seguridad con una guía simple e impulsada por IA." />
<meta name="twitter:image" content="https://tu-dominio.com/og.png" />
```

### Semantic HTML

- `<header>` for navigation
- `<section>` for each content block
- `<footer>` for footer content
- `<h1>` for main headline (only one per page)
- `<h2>` for section headings
- `<ul>` and `<li>` for lists

### Analytics Placeholder

Add comment in `<head>` for future analytics integration:
```html
<!-- Analytics placeholder -->
<!-- TODO: Add Plausible/GA snippet here when available -->
```

## Responsive Design Strategy

### Breakpoints (Bootstrap defaults)

- **xs**: < 576px (mobile)
- **sm**: ≥ 576px (large mobile)
- **md**: ≥ 768px (tablet)
- **lg**: ≥ 992px (desktop)
- **xl**: ≥ 1200px (large desktop)

### Mobile-First Approach

1. Base styles target mobile (single column, larger touch targets)
2. Use responsive utilities: `col-12 col-lg-8`, `py-5 py-md-6`, `flex-column flex-md-row`
3. Form section uses `ratio ratio-4x3` for responsive iframe sizing
4. Typography scales with Bootstrap's responsive font sizes

### Touch Targets

- Buttons: `btn-lg` class ensures minimum 44px height
- Links: Adequate padding via Bootstrap defaults
- Form: Airtable handles its own touch optimization

## Conversion Optimization

### Above-the-Fold Strategy

- Clear value proposition in headline (addresses pain point)
- Subheadline explains solution and benefit
- Primary CTA button is visually prominent (Bootstrap primary blue)
- Micro-copy below CTA reinforces value ("guía gratuita")

### Trust Building

- Professional credibility statement in dedicated section
- Privacy reassurance near form (lock emoji + message)
- Footer contact information (transparency)
- Clean, professional design (Bootstrap's polished defaults)

### Friction Reduction

- Single CTA action (join waitlist)
- No navigation menu to distract
- Smooth scroll creates seamless experience
- Airtable form is embedded (no redirect)
- Spanish language throughout (target audience)

## Future Enhancements (Out of Scope)

- A/B testing different headlines
- Adding testimonials or social proof
- Implementing analytics tracking
- Creating actual Privacy Policy page
- Adding FAQ section
- Implementing email capture confirmation message
- Adding exit-intent popup
- Implementing custom domain and SSL
