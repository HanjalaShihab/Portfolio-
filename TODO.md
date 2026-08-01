# Portfolio — Light / Night Mode Implementation

## Steps
- [x] Analyze all components + CSS design tokens (index.css, all section CSS)
- [x] Plan approved by user
- [x] Create `src/context/ThemeContext.jsx` — theme state, localStorage persistence, system-preference default, `data-theme` attribute on `<html>`, theme-color meta sync
- [x] Create `src/components/ThemeToggle/ThemeToggle.jsx` + `ThemeToggle.css` — animated sun/moon navbar button
- [x] Wrap app in `ThemeProvider` in `src/main.jsx`
- [x] Add toggle button to Navbar (`src/components/Navbar/Navbar.jsx`)
- [x] Add "Toggle Light/Night Mode" command to CommandPalette (`src/components/CommandPalette/CommandPalette.jsx`)
- [x] Add light-theme token overrides + new surface variables in `src/index.css`
- [x] Update `Navbar.css` — glass navbar, mobile menu, kbd surfaces for light mode
- [x] Update `Hero.css` — terminal framing, tech-focus icons for light mode
- [x] Update `Projects.css` — mockups, dividers, modal surfaces for light mode
- [x] Update `Contact.css` — terminal framing, form borders for light mode
- [x] Update `Skills.css` — constellation board, popover for light mode
- [x] Update `Cursor.css` — multiply blend in light mode
- [x] Update `BackgroundFX` (CSS variables) — orb/grid intensity for light mode
- [x] Add pre-load theme script in `index.html` to prevent flash of wrong theme
- [x] Verify `npm run build` compiles cleanly

