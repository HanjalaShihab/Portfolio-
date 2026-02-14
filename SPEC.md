# Extraordinary Portfolio Website - Specification

## 1. Project Overview

**Project Name:** HANJALA Portfolio
**Type:** Single Page Application (SPA) - Portfolio Website
**Core Functionality:** A visually stunning, animated portfolio showcasing personal brand, skills, and projects with immersive user experience
**Target Users:** Potential employers, clients, and collaborators

---

## 2. UI/UX Specification

### Layout Structure

**Sections (in order):**
1. **Hero Section** - Full viewport height, animated text & background
2. **About Section** - Split layout with image and bio
3. **Skills Section** - Animated skill cards with progress indicators
4. **Projects Section** - Masonry/Grid gallery with hover effects
5. **Contact Section** - Interactive form with social links
6. **Footer** - Minimal with copyright and back-to-top

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette (Dark Theme - Primary):**
- Background Primary: `#0a0a0f` (Deep Space Black)
- Background Secondary: `#12121a` (Midnight)
- Accent Primary: `#00ff88` (Neon Green)
- Accent Secondary: `#ff006e` (Hot Pink)
- Accent Tertiary: `#00d4ff` (Electric Cyan)
- Text Primary: `#ffffff`
- Text Secondary: `#8a8a9a`
- Gradient: `linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff006e 100%)`

**Typography:**
- Headings: 'Clash Display', sans-serif (from CDN)
- Body: 'Satoshi', sans-serif (from CDN)
- Accent/Mono: 'JetBrains Mono', monospace (Google Fonts)
- Hero Title: 80px (desktop), 40px (mobile)
- Section Titles: 48px (desktop), 32px (mobile)
- Body Text: 18px
- Small Text: 14px

**Spacing System:**
- Section Padding: 120px vertical (desktop), 60px (mobile)
- Container Max Width: 1200px
- Component Gap: 40px
- Card Padding: 32px

**Visual Effects:**
- Glassmorphism cards with `backdrop-filter: blur(10px)`
- Glow effects on hover using box-shadow
- Particle background in hero
- Smooth parallax scrolling
- Custom cursor with trailing effect

### Components

**1. Custom Cursor:**
- Circular cursor, 20px diameter
- Color: `#00ff88` with glow
- Scale up on hover over interactive elements
- Trailing particles effect

**2. Navigation:**
- Fixed top, transparent initially
- Background blur on scroll
- Logo on left, nav links on right
- Hamburger menu on mobile with full-screen overlay
- Nav items: Home, About, Skills, Projects, Contact

**3. Hero Section:**
- Animated typing effect for tagline
- Floating geometric shapes in background
- Particle network animation (connected dots)
- CTA buttons with gradient border animation
- Scroll indicator at bottom

**4. About Section:**
- Split layout: Image left, text right
- Image has animated border glow
- Stats counters (years experience, projects, clients)
- "Hire Me" CTA button

**5. Skills Section:**
- Grid of skill cards (6-8 skills)
- Each card has icon, name, animated progress bar
- Hover effect: lift and glow
- Skills: React, JavaScript, CSS, Node.js, Python, etc.

**6. Projects Section:**
- Filterable by category (All, Web, Mobile, Design)
- Project cards with:
  - Image thumbnail
  - Overlay with title and tech stack
  - Hover: scale up, show "View Project" button
  - Links to live demo and GitHub

**7. Contact Section:**
- Split: Form left, info right
- Form fields: Name, Email, Message
- Animated submit button
- Social links with hover animations
- Email copy to clipboard feature

**8. Footer:**
- Minimal design
- Back to top button
- Copyright text
- Social icons

---

## 3. Functionality Specification

### Core Features

1. **Smooth Scrolling** - CSS scroll-behavior: smooth + Framer Motion scroll animations
2. **Custom Cursor** - Follows mouse with smooth interpolation
3. **Theme Toggle** - Dark/Light mode switch (stored in localStorage)
4. **Scroll Animations** - Elements fade/slide in on scroll using Framer Motion
5. **Project Filtering** - Filter projects by category with animation
6. **Form Validation** - Client-side validation with error messages
7. **Responsive Design** - Fully responsive across all breakpoints
8. **Performance Optimized** - Lazy loading images, code splitting

### User Interactions

- Hover effects on all interactive elements
- Click to navigate between sections
- Scroll-triggered animations
- Form submission with loading state
- Social links open in new tab
- Back-to-top smooth scroll

### Animations (Framer Motion)

- Page load: Staggered reveal of elements
- Scroll: Fade up + scale from 0.9 to 1
- Hover: Scale to 1.05, glow increase
- Exit: Fade out
- Page transitions: Crossfade

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Hero section fills viewport with animated background
- [ ] Custom cursor visible and following mouse
- [ ] Navigation fixed and readable on scroll
- [ ] All sections have proper spacing
- [ ] Colors match specified palette exactly
- [ ] Typography is consistent throughout
- [ ] Responsive on mobile, tablet, desktop

### Functional Checkpoints
- [ ] Smooth scroll works between sections
- [ ] All hover effects working
- [ ] Project filter works correctly
- [ ] Form validates inputs
- [ ] Theme toggle works and persists
- [ ] No console errors
- [ ] Page loads under 3 seconds

---

## 5. Technical Stack

- **Framework:** React 18+ with Vite
- **Styling:** CSS Modules + CSS Variables
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather Icons)
- **Routing:** React Router DOM (single page, anchor navigation)
- **Fonts:** Google Fonts + CDN fonts

---

## 6. File Structure

```
/src
  /components
    Cursor.jsx
    Cursor.css
    Navbar.jsx
    Navbar.css
    Hero.jsx
    Hero.css
    About.jsx
    About.css
    Skills.jsx
    Skills.css
    Projects.jsx
    Projects.css
    Contact.jsx
    Contact.css
    Footer.jsx
    Footer.css
  /assets
    (images)
  App.jsx
  App.css
  index.css
  main.jsx
index.html
```

