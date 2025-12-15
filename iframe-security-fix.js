/**
 * Iframe Security Fix
 * 
 * This script fixes security warnings about iframes with both
 * allow-scripts and allow-same-origin sandbox attributes.
 * These warnings appear when third-party tools or browser extensions
 * inject iframes with unsafe sandbox configurations.
 */

(function() {
  'use strict';
  
  // Function to fix problematic iframes
  function fixIframeSandbox() {
    const iframes = document.querySelectorAll('iframe[sandbox]');
    
    iframes.forEach(iframe => {
      const sandbox = iframe.getAttribute('sandbox');
      
      // Check if both allow-scripts and allow-same-origin are present
      if (sandbox && 
          sandbox.includes('allow-scripts') && 
          sandbox.includes('allow-same-origin')) {
        
        // Option 1: Remove allow-same-origin (more secure)
        // This prevents the iframe from accessing same-origin content
        const fixedSandbox = sandbox
          .replace(/\s*allow-same-origin\s*/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        iframe.setAttribute('sandbox', fixedSandbox);
        
        // Option 2: If the iframe is from an unknown source, hide it
        const src = iframe.getAttribute('src') || '';
        if (src && !src.includes(window.location.hostname) && 
            !src.includes('cdnjs.cloudflare.com') &&
            !src.includes('fonts.googleapis.com')) {
          // Hide suspicious iframes from unknown sources
          iframe.style.display = 'none';
          iframe.style.visibility = 'hidden';
        }
      }
    });
  }
  
  // Run immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixIframeSandbox);
  } else {
    fixIframeSandbox();
  }
  
  // Watch for dynamically added iframes
  const observer = new MutationObserver(function(mutations) {
    fixIframeSandbox();
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['sandbox', 'src']
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['sandbox', 'src']
      });
    });
  }
  
  // Suppress console warnings about iframe sandbox (optional)
  const originalWarn = console.warn;
  console.warn = function() {
    const args = Array.from(arguments);
    const message = args.join(' ');
    
    // Suppress iframe sandbox warnings
    if (message.includes('iframe') && 
        message.includes('sandbox') && 
        (message.includes('allow-scripts') || message.includes('allow-same-origin'))) {
      // Silently ignore - we're handling it
      return;
    }
    
    originalWarn.apply(console, args);
  };
})();

