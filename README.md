# Week 4 — Performance & Accessibility Portfolio

## Files
- `index.html` — semantic portfolio structure and accessible controls.
- `style.css` — responsive styling, visible keyboard focus and reduced-motion support.
- `script.js` — menu, theme toggle, typing effect, reveal/skill animations, project modal, form validation and back-to-top.
- `profile.webp`, `about.webp`, `image1.webp`, `image2.webp`, `image3.webp` — optimized copies of the supplied images.

## Run in VS Code
1. Extract the ZIP to a folder.
2. In VS Code choose **File → Open Folder** and select the extracted `Week4_Accessible_Portfolio` folder.
3. Open `index.html`; run it using the Live Server extension, or double-click `index.html` to open it in your browser.
4. Keep all files together in the same folder. No npm install or framework is required.

## Improvements
- Semantic landmarks, descriptive image alt text, labelled form fields, live status messages, accessible navigation labels and dialog attributes.
- Images converted to WebP and resized to reduce transfer size; below-the-fold images use lazy loading.
- CSS includes keyboard focus styling and respects `prefers-reduced-motion`.
- JavaScript uses event listeners and `IntersectionObserver`; project modal feature text is built with DOM methods.
- Responsive layout supports desktop, tablet and mobile widths.

## Testing checklist
- Test keyboard-only navigation with Tab, Shift+Tab, Enter, Space and Escape.
- Resize browser to desktop/tablet/mobile widths.
- Run Chrome Lighthouse (Performance and Accessibility) and optionally WAVE or axe DevTools. Record the actual scores after testing; scores depend on the browser and environment.
- The contact form is a front-end demo only; it validates input but does not send messages without a backend.
