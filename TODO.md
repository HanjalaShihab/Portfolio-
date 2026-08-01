# Portfolio — Light / Night Mode + Secret Easter Egg Layer

## Light / Night Mode
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
- [x] Update `BackgroundFX.jsx` — adjust orb/grid intensity for light mode
- [x] Verify `npm run build` compiles cleanly

## Secret Easter Egg Layer (Command Palette)
- [x] `src/utils/secretCommands.js` — secret command registry (exact-match only), quotes/fortunes/jokes/knowledge base
- [x] `src/utils/achievements.js` — localStorage-backed achievements (9 achievements, persistent)
- [x] `src/components/CommandPalette/TerminalView.jsx` — embedded Linux-style terminal (help/about/skills/projects/resume/contact/github/linkedin/pwd/ls/whoami/history/neofetch/cat about.md/cat resume.txt/clear/exit)
- [x] `src/components/EasterEggs/MatrixMode.jsx` — ~10s Matrix digital rain + green accents, auto-restore
- [x] `src/components/EasterEggs/PixelCat.jsx` — walking pixel cat with speech bubbles, disappears after crossing
- [x] `src/components/EasterEggs/AchievementsPanel.jsx` — achievements panel with locked (dimmed) + unlocked display
- [x] `src/components/EasterEggs/AskAssistant.jsx` — local keyword-based portfolio Q&A (no external AI)
- [x] `src/components/EasterEggs/RetroMode.jsx` — CRT overlay + pixel font + retro sound + badge (Konami code)
- [x] `src/components/EasterEggs/Confetti.jsx` — lightweight CSS confetti burst
- [x] `src/components/EasterEggs/SecretToast.jsx` — toast output with optional connect buttons
- [x] `src/components/CommandPalette/SecretLayer.css` — theme-aware styles for all secret layers
- [x] `src/components/CommandPalette/CommandPalette.jsx` — secret detection (exact-match only, never leaks to search), mode routing, Konami listener, achievement triggers, retro body class
- [x] Verify `npm run build` compiles cleanly (✓ 470 modules, 4.23s)

## Accepted behaviors
- Secrets ONLY fire on exact full command match — never appear in results/suggestions/autocomplete
- Existing palette commands, keyboard nav, and UI unchanged
- Achievements persist in localStorage; unlocked only through genuine actions
- All Easter egg layers theme-aware, accessible (aria labels), responsive, gracefully degrade

