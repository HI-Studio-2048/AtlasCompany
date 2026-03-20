# Atlas Company — Project Memory

## Stack
- Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide icons
- Running on: `http://localhost:3001` (port 3000 was taken)

## Structure
```
app/
  page.tsx            — home (uses shared components)
  layout.tsx          — root layout, wraps ThemeProvider + LanguageProvider
  globals.css         — all CSS variables + component classes
  affiliates/
    page.tsx          — affiliate landing page
    portal/page.tsx   — affiliate dashboard (mock data, SVG chart)
    resources/page.tsx — marketing materials kit
  about, contact, blog, pricing, trademarks, dashboard, legal, start/
components/
  Navbar.tsx, Footer.tsx
  HeroSection, FeaturesSection, HowItWorksSection, JurisdictionsSection, PricingSection, CtaBanner
context/
  LanguageContext.tsx — EN/ZH translations
  ThemeContext.tsx    — light/dark toggle, persists to localStorage
```

## Theme System (light default, user-toggleable dark)
- `darkMode: 'class'` in tailwind.config.ts
- CSS variables in `globals.css`: `--bg`, `--bg-alt`, `--surface`, `--border`, `--border-strong`, `--text`, `--text-2`, `--text-3`, `--text-4`, `--nav-bg`, `--input-bg`, `--input-border`, `--dot-color`, `--card-shadow`
- `.dark` class on `<html>` switches all vars to dark values
- `globals.css` has light-mode overrides for all `text-white/*`, `border-white/*`, `bg-white/*` Tailwind utilities via `html:not(.dark)` selectors
- `gold-btn` always keeps white text (exempt from overrides)
- Flash prevention: inline `<script>` in layout reads localStorage before paint
- Toggle: sun/moon icon in Navbar (desktop + mobile)
- SVG chart in portal uses `useTheme()` for fill colors

## Affiliate Program Pages
- `/affiliates` — public landing: hero, calc, how it works, perks, FAQ, join form
- `/affiliates/portal` — dashboard: stats, referral link, tabs (Transactions, Sales Team, Payouts, Performance with SVG chart)
- `/affiliates/resources` — marketing kit: email templates, social copy, objection handlers, banner specs, brand guidelines
- Commission: 15% lifetime direct + 5% sales team bonus

## Key Patterns
- All pages: `<div className="min-h-screen">` (no bg/text classes — controlled by body CSS vars)
- Section alternating: `style={{ background: 'var(--bg-alt)' }}`
- Cards: `.glass-card` class (white+shadow in light, dark glass in dark)
- Inputs: `.atlas-input`, `.atlas-select` (use CSS vars)
- Section headers: `.section-badge`, `.section-headline`, `.section-sub`
- Inline text colors: `style={{ color: 'var(--text-2)' }}` etc.
- Red accent: `#DC2626` / `#EF4444` — same in both modes

## Services Built
- Company formation (50+ jurisdictions)
- Trademark registration (Madrid Protocol + national)
- DMCA takedown service
- Brand/infringement monitoring
- Affiliate program with sales team structure
