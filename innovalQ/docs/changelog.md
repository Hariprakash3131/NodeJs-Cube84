# Changelog

All notable changes to the **Servora** Multipurpose HTML5 Template are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-04

### Added
- **Core Architecture:**
  - Modern semantic HTML5 markup with WCAG 2.2 AA accessibility standards.
  - Tailwind CSS 3.4+ compilation with design tokens (colors, radii, shadows, typography scale).
  - Dark mode and Light mode engine with FOUC prevention script in `<head>`.
  - Brand Palette Switcher supporting 5 curated color schemes (Indigo, Emerald, Ocean, Rose, Amber).
  - Comprehensive Right-to-Left (RTL) engine with Arabic typography (Cairo font) and directional mirroring.
  - HTML build-time partials system for zero-maintenance header, footer, and sidebar chunks.

- **Public Site (15 templates):**
  - `index.html`: Home 1 (General Services Landing) with Three.js 3D floating glassmorphic hero, trust logos marquee, services grid with hover tilt, process steps, stats counters, testimonials slider, pricing teaser, blog preview, CTA banner, and comprehensive footer.
  - `home-saas.html`: Home 2 (SaaS / Digital Agency) with 3D interactive particle field, 3D device tilt perspective, interactive feature tabs, integration ecosystem grid, metrics, and FAQ accordion.
  - `about.html`: Team showcase, Mission/Vision, company timeline, core values, awards, and partner credentials.
  - `services.html`: Searchable catalog with category filter chips and Grid / List view toggle.
  - `service-details.html`: Long-form description, benefits, 5-phase project process, FAQ accordion, pricing, related services, and sticky consultation sidebar.
  - `blog.html`: Live search, category/tag filtering pills, author cards, read time estimates, and accessible pagination.
  - `blog-details.html`: Full article layout, sticky Table of Contents (TOC) with scroll spy, author box, social share buttons with clipboard toast, related articles, and comments form.
  - `contact.html`: Leaflet OpenStreetMap with custom branded markers, validated contact brief form, global office cards, and business hours.
  - `pricing.html`: Monthly / Yearly toggle (with 20% discount badge), 4 tiered cards, matrix feature comparison table across 20+ capabilities, and pricing FAQ.
  - `login.html`: Split-screen authentication layout with social OAuth buttons and password visibility toggle.
  - `register.html`: Registration with real-time password strength meter and terms verification.
  - `forgot-password.html`: Password recovery flow with success state feedback.
  - `404.html`: Interactive Three.js zero-gravity lost beacon element, search form, and jump links.
  - `coming-soon.html`: Reactive Alpine.js countdown timer and VIP lead capture.
  - `maintenance.html`: Live system upgrade indicator with status percentage and emergency contacts.

- **Admin Dashboard (6 templates in `/admin`):**
  - `admin/dashboard.html`: 4 KPI cards with trend badges, Chart.js Revenue vs. Expenses line/area graph, acquisition donut chart, active orders table, and live activity stream.
  - `admin/users.html`: Filterable client data table with search, role badges, status chips, and "Add New Member" modal.
  - `admin/orders.html`: Kanban sprint pipeline tabs, slide-over order detail drawer, and printable/downloadable invoice preview modal.
  - `admin/messages.html`: Split-pane communications hub (folders, message list, active thread view, quick reply, and rich compose modal).
  - `admin/analytics.html`: Date range selector, conversion funnel bar chart, top-converting pages table, and geographical traffic breakdown.
  - `admin/settings.html`: Tabbed configuration (Profile & Avatar, Appearance & Branding presets, Notification toggles, 2FA security sessions, Billing & Payment cards).

- **3D & Animation Engine:**
  - Three.js WebGL hero with `MeshPhysicalMaterial`, mouse parallax, and dynamic color syncing with theme palette.
  - Comprehensive performance safeguards: IntersectionObserver pause, Visibility API tab suspension, devicePixelRatio capped at 2, mobile CSS mesh fallback, and resource disposal teardown.
  - GSAP ScrollTrigger reveals, animated counters, card 3D tilt on hover, and magnetic buttons.
  - Lenis smooth scroll toggle.

- **Documentation & Component Library:**
  - `docs/index.html`: Complete guide covering quick start, folder organization, customization, RTL, 3D scenes, and deployment.
  - `docs/components.html`: UI kitchen sink with buttons, badges, form controls, alerts, cards, modals, accordions, and tables.

