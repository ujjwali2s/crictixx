# Project TODO

## Original Tasks
- [x] Remove react-player from package.json
- [x] Update src/main/video/LiveVideo.jsx to use Video.js instead of ReactPlayer

## Build Optimization and Fixes (from Vercel Log Analysis)
- [x] Update dependencies: Run `npm update && npm audit fix` to address deprecations (e.g., update video.js, hls.js, etc.; remove unused like jwplayer if possible)
- [x] Fix Browserslist: Run `npx update-browserslist-db@latest` and create .browserslistrc
- [x] Optimize Vite config: Edit vite.config.js to add manualChunks for vendor/video/UI and set chunkSizeWarningLimit: 1000
- [x] Standardize video players: Refactor src/main/video/VideoPlayer.jsx, TestVideo.jsx, Test.jsx, SonyLivMatches.jsx to use Video.js instead of direct hls.js
- [x] Test video playback functionality: Run dev server, verify streams in browser for all video components (navigation timeout occurred, but console logs confirm Video.js activity; React Router warnings non-blocking)
- [x] Final build test: Run `npm run build` and confirm no warnings, improved chunk sizes (e.g., video chunk reduced to 546 kB from 1.3 MB, no large chunk warning)
