# Servora — Multipurpose HTML5 Template & Admin Dashboard

[![License](https://img.shields.io/badge/License-ThemeForest%20Commercial-blue.svg)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4+-38bdf8.svg)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-v0.165.0-black.svg)](https://threejs.org/)
[![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA%20Compliant-emerald.svg)](#)

**Servora** is an ultra-premium, ThemeForest-ready multipurpose HTML5 template built for modern service-based businesses, digital agencies, SaaS companies, and technology consultancies. Crafted with semantic HTML5, Tailwind CSS 3.4+, Vanilla ES Modules, Alpine.js, Three.js, GSAP, and Chart.js.

---

## 🌟 Key Features

- **21+ Ready-to-Deploy Pages**:
  - 15 Public marketing pages: 2 distinct Home layouts (General Agency + SaaS/Tech), About, Services Catalog, Service Deep-Dive, Blog Magazine, Editorial Article, Pricing Matrix, Leaflet Map Contact, Complete Auth Suite (Login, Register, Forgot Password), 404 Error, Coming Soon, Maintenance.
  - 6 Complete Admin Dashboard views: Dashboard Overview, Users Table, Orders & Invoicing Pipeline, Inbox & Communications, Analytics & Conversion Funnel, System Settings.
- **Dynamic 3D Hero Scenes**:
  - Interactive Three.js WebGL hero with floating glassmorphism shapes (`MeshPhysicalMaterial`) and mouse parallax.
  - Interactive 3D particle field and device tilt on SaaS homepage.
  - Interactive zero-gravity space element on 404 page.
  - Complete performance guardrails: `IntersectionObserver` pause, `visibilitychange` tab suspension, capped DPR (2.0), low-power device fallbacks, and memory disposal on teardown.
- **Universal Design System**:
  - **Dark + Light Mode**: Class-based, zero flash of unstyled content (FOUC), system preference detection, and localStorage persistence.
  - **5 Brand Palettes**: Indigo (Default), Emerald, Ocean, Rose, and Amber switchable via CSS variables.
  - **Full RTL Support**: Logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`), Arabic font stack (Cairo), and instant LTR/RTL toggle.
  - **Lenis Smooth Scroll**: Optional momentum-based smooth scrolling.
- **Developer-First Architecture**:
  - Reusable build-time HTML partials (`meta-head`, `navbar`, `footer`, `demo-panel`, `admin-sidebar`, `admin-header`).
  - Vite multi-page bundler delivering minified static HTML, CSS, and JS to `dist/`.
  - Zero jQuery or legacy dependencies.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Local Development
```bash
# 1. Clone or extract files
cd servora

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser: http://localhost:3000
```

### Production Build
```bash
# Compile and optimize static assets into /dist
npm run build

# Preview the compiled production build
npm run preview
```

---

## 📁 Project Architecture

```
servora/
├── index.html               # Home 1: General Services & 3D Hero
├── home-saas.html           # Home 2: SaaS Product & Telemetry
├── about.html               # Leadership, Mission, Values & Timeline
├── services.html            # Searchable Catalog with Grid/List Toggle
├── service-details.html     # Single Practice Deep Dive
├── blog.html                # Insights & Filterable Magazine
├── blog-details.html        # Editorial Article with Sticky TOC
├── contact.html             # Leaflet OpenStreetMap & Validated Form
├── pricing.html             # Monthly/Yearly Matrix Comparison
├── login.html               # Split-Screen Authentication
├── register.html            # Registration with Password Strength Meter
├── forgot-password.html     # Recovery Token Dispatch Flow
├── 404.html                 # 3D Zero-Gravity Lost Beacon Scene
├── coming-soon.html         # Live Countdown Timer & Lead Capture
├── maintenance.html         # Scheduled Maintenance Status
├── admin/                   # Complete Admin Control Plane
│   ├── dashboard.html       # KPI Cards & Dual Chart.js Graphs
│   ├── users.html           # Data Table with Add Member Modal
│   ├── orders.html          # Sprint Pipeline & Invoice Preview
│   ├── messages.html        # Split-Pane Communications Hub
│   ├── analytics.html       # Multi-Stage Funnel Telemetry
│   └── settings.html        # Tabs: Profile, Theme, 2FA & Billing
├── docs/                    # Buyer & Developer Documentation
│   ├── index.html           # Comprehensive Guide
│   ├── components.html      # Interactive Component Kitchen Sink
│   ├── changelog.md         # Version History
│   └── credits.md           # Third-Party Attributions
├── src/
│   ├── css/                 # main.css, components.css, rtl.css
│   ├── js/                  # main.js, three-hero.js, three-saas.js, charts.js, map.js
│   └── partials/            # meta-head, navbar, footer, demo-panel, admin-sidebar, admin-header
├── tailwind.config.js       # Design tokens & color scale
├── vite.config.js           # Multi-page bundler & HTML partials plugin
└── package.json             # NPM dependencies & scripts
```

---

## 🎨 Customization Guide

### 1. Changing Brand Colors
Update the primary RGB triplet in `src/css/main.css`:
```css
:root {
  --primary-500: 99 102 241; /* Your custom RGB */
  --primary-600: 79 70 229;
}
```

### 2. Enabling Right-to-Left (RTL) Layout
Set `dir="rtl"` on the root `<html>` element:
```html
<html lang="ar" dir="rtl">
```
Servora will automatically mirror layout padding, margins, flex alignments, and switch typography to the **Cairo** Arabic font.

### 3. Editing 3D Scenes
Configure geometric primitive counts, materials, and lighting in `src/js/three-hero.js` and `src/js/three-saas.js`. The WebGL engine automatically synchronizes ambient and point light colors with your active CSS theme!

---

## 📄 License & Attribution

- Built for commercial distribution on ThemeForest / Envato Market.
- Fonts and icons licensed under SIL Open Font License / ISC.
- Stock photography sourced from Unsplash under the Unsplash Free Commercial License. See `docs/credits.md` for complete attribution.

