// Utility to get current zoom level (simplified)
function getZoomLevel() {
  // Use visualViewport.scale if available (modern browsers)
  if (window.visualViewport && window.visualViewport.scale) {
    return window.visualViewport.scale;
  }
  // Fallback to devicePixelRatio
  return window.devicePixelRatio || 1;
}

// Prevent zoom outside 65%–100% for mouse wheel
document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) { // Ctrl + wheel indicates zoom
    const currentZoom = getZoomLevel();
    const minZoom = 0.67;
    const maxZoom = 1.0;

    // Only prevent default if zoom is outside allowed range
    if (currentZoom < minZoom || currentZoom > maxZoom) {
      event.preventDefault(); // Block further zooming
      // Apply zoom only if supported (Chrome/Edge)
      if ('zoom' in document.body.style) {
        const clampedZoom = Math.min(Math.max(currentZoom, minZoom), maxZoom);
        document.body.style.zoom = clampedZoom;
      }
      // Note: Avoid transform: scale to prevent layout issues in Firefox/Safari
      // Rely on meta viewport for other browsers
    }
  }
}, { passive: false });

// Log errors for debugging
try {
  window.addEventListener('error', (event) => {
    console.error('Zoom control error:', event.message, event.filename, event.lineno);
  });
} catch (e) {
  console.error('Failed to set up error handler:', e);
}