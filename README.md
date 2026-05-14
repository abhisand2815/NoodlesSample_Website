# Ching's Secret — Korean Ramen Landing Page

A scroll-driven product landing page for Ching's Secret Korean Ramen, built as a personal frontend experiment to explore canvas-based scroll animation, GSAP ScrollTrigger, and immersive UI design.

---

## Project Purpose

This project was built to practice and demonstrate:

- Scroll-linked frame-by-frame canvas animation (Apple-style video scrubbing)
- GSAP ScrollTrigger for timeline-driven UI storytelling
- Combining Tailwind CSS with custom CSS for design-system-level theming
- Building a complete, multi-section product site from scratch

---

## Features

### Scroll Animation Engine
- 240 pre-rendered JPEG frames loaded into a `<canvas>` element
- Frames advance in sync with the user's scroll position using GSAP `scrub`
- Custom `object-fit: cover` rendering logic ensures the canvas fills any viewport
- Overlay text sections animate in and out as the user scrolls through the canvas zone

### Preloader
- Full-screen loader with a live progress bar
- Displays load percentage as all 240 frames are fetched before the site reveals

### Navigation
- Fixed navbar with scroll-aware background — transparent at the top, frosted glass (`backdrop-filter: blur`) after 50px of scroll
- Smooth anchor-based navigation across all sections
- Animated underline hover effect on nav links

### Page Sections

| Section | Description |
|---|---|
| Hero / Animation | Sticky scroll canvas with cinematic overlay text |
| Intensity | Product highlights with animated reveal |
| Anatomy | Visual breakdown of the noodle pack's ingredients |
| Recipes | 6 recipe cards that open in a modal with full instructions |
| Spice Ritual | Step-by-step cooking guide with GSAP stagger animations |
| Community | Social proof and community engagement |
| Find Store | Simulated store locator by city or zip code |
| Contact | Contact form with loading state and success animation |
| Footer | Brand links, social icons, and product navigation |

### Modal System
- Reusable modal overlay for Recipe Detail View and Nutritional Facts
- Backdrop blur, close-on-overlay-click, and body scroll lock

### Store Locator (Simulated)
- Search by city or zip code
- Randomized store results with In Stock, Limited Stock, and Out of Stock states
- 1.2 second simulated fetch delay for realistic UX

### Contact Form
- Country selector with auto-populated phone country code
- Form submission with loading state and animated success screen

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 Canvas | Frame-by-frame scroll animation |
| GSAP 3 + ScrollTrigger | All scroll-driven animations and reveals |
| Tailwind CSS (CDN) | Utility-first layout and component styling |
| Custom CSS | CSS variables, glass effects, nav transitions |
| Vanilla JavaScript | Canvas rendering, modal logic, form handling, store search |
| Google Fonts | Bebas Neue (display), Inter (body), Outfit (base) |
| Material Icons | UI iconography |

---

## Project Structure

```
project-root/
├── index.html          # Main HTML — all sections and layout
├── style.css           # Custom CSS — variables, canvas, nav, overlays
├── script.js           # All JS — canvas engine, GSAP, modals, forms
├── logo.png            # Brand logo
└── frames/             # 240 JPEG animation frames
    ├── ezgif-frame-001.jpg
    ├── ezgif-frame-002.jpg
    └── ...
```

> The `frames/` folder is required for the scroll animation to work. Without it, the preloader will stall at 0%.

---

## Getting Started

The page loads local frame images and must be served over a local server — opening it as a plain file will not work.

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code
# Install the Live Server extension and click "Go Live"
```

Then open `http://localhost:8000` in your browser.

---

## Design System

```css
--accent-color:  #e63946  /* Primary Red  */
--bg-color:      #0a0a0a  /* Near Black   */
--text-color:    #ffffff  /* White        */
--glass:         rgba(255, 255, 255, 0.03)
--glass-border:  rgba(255, 255, 255, 0.10)
```

Tailwind theme extensions:

- `primary: #FF2A00` — Scorched Red
- `secondary: #FFA000` — Fiery Orange
- `background-dark: #131313`

---

## Known Limitations

- The store locator and contact form are frontend-only with no backend
- Frame images must be manually exported and placed in the `frames/` directory
- No mobile hamburger menu — nav links are hidden on small screens

---

## Author

Built as a personal skill-building project to explore scroll animation techniques and immersive product UI design.
