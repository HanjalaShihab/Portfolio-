# Hanjala Portfolio

A modern, animated personal portfolio built with React and Vite. It features a custom cursor, scroll-triggered section reveals, and a project showcase with modal details.

## Highlights

- Animated hero with canvas particles and rotating titles
- Scroll-triggered section reveals with background transitions
- Filterable projects grid with modal view
- Responsive layout with smooth navigation

## Built With

- React 19
- Vite 7
- Framer Motion
- React Icons
- React Intersection Observer

## Sections

- Hero
- About
- Skills
- Projects
- Contact
- Footer

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

Update these components to change your content:

- Hero text and titles: src/components/Hero/Hero.jsx
- About content: src/components/About/About.jsx
- Skills list: src/components/Skills/Skills.jsx
- Project data: src/components/Projects/Projects.jsx
- Contact details: src/components/Contact/Contact.jsx
- Social links and branding: src/components/Navbar/Navbar.jsx
- Footer content: src/components/Footer/Footer.jsx

Styles live alongside each section in its matching CSS file under src/components.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    About/
    Contact/
    Cursor/
    Footer/
    Hero/
    Navbar/
    Projects/
    Skills/
```

## Scripts

- npm run dev: start the dev server
- npm run build: create a production build
- npm run preview: preview the production build
- npm run lint: run ESLint

## Deployment

This project is ready to deploy on Vercel or any static hosting provider. Build with npm run build and deploy the dist/ folder.

## License

This project is provided as-is for personal portfolio use.
