/**
 * Evergage Script Loader with Error Suppression
 * 
 * This script loads Evergage while suppressing console errors from failed API calls.
 * Evergage is a third-party personalization platform that may not be fully configured,
 * causing 404 errors for internal endpoints. This wrapper prevents those errors from
 * cluttering the console.
 */

(function() {
  'use strict';
  
  // Suppress Evergage-related console errors
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const evergageErrorPatterns = [
    /evergage/i,
    /internal\/auth\/activeSession/i,
    /internal\/dataset/i,
    /visual-editor/i,
    /Cannot read properties of null/i,
    /Failed to load resource.*404/i,
    /Suppressed Evergage API call/i,
    /restResource\.ts/i,
    /session\.ts/i,
    /historyService\.ts/i
  ];
  
  function shouldSuppressError(message) {
    if (typeof message === 'string') {
      return evergageErrorPatterns.some(pattern => pattern.test(message));
    }
    if (message && message.message) {
      return evergageErrorPatterns.some(pattern => pattern.test(message.message));
    }
    if (message && message.stack) {
      return evergageErrorPatterns.some(pattern => pattern.test(message.stack));
    }
    return false;
  }
  
  // Override console.error temporarily
  console.error = function() {
    const args = Array.from(arguments);
    if (!args.some(shouldSuppressError)) {
      originalError.apply(console, args);
    }
    // Silently ignore Evergage errors
  };
  
  // Override console.warn temporarily
  console.warn = function() {
    const args = Array.from(arguments);
    if (!args.some(shouldSuppressError)) {
      originalWarn.apply(console, args);
    }
    // Silently ignore Evergage warnings
  };
  
  // Load Evergage script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//cdn.evgnet.com/beacon/a556rq555550mxe43n3n3n091568480/styler/scripts/evergage.min.js';
  script.async = true;
  
  script.onerror = function() {
    // Restore console if script fails to load
    console.error = originalError;
    console.warn = originalWarn;
  };
  
  // Insert script into head
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
  
  // Hide Evergage login modals and authentication UI
  function hideEvergageAuthUI() {
    // Hide any existing Evergage login modals
    const selectors = [
      '[class*="evergage"]',
      '[id*="evergage"]',
      '[class*="evg-"]',
      '[id*="evg-"]',
      '[data-evg-auth]',
      'iframe[src*="evergage"]',
      'iframe[src*="evgnet"]',
      'div[class*="modal"]',
      'div[class*="dialog"]',
      'div[class*="popup"]'
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // Check if element contains login-related text
          const text = (el.textContent || el.innerText || '').toLowerCase();
          const hasLoginText = /login|authenticate|please login|open login prompt|login window|try again/i.test(text);
          const hasLoginChild = el.querySelector('[class*="login"], [id*="login"], [class*="auth"], [id*="auth"], button[class*="login"], button[id*="login"]');
          
          if (hasLoginText || hasLoginChild) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '-9999';
            // Also try to remove it
            try {
              el.remove();
            } catch(e) {}
          }
        });
      } catch(e) {
        // Ignore errors
      }
    });
    
    // Also check all divs for login modal content
    try {
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        const text = (div.textContent || div.innerText || '').toLowerCase();
        if ((text.includes('please login') || text.includes('open login prompt') || text.includes('login window')) && 
            (div.style.position === 'fixed' || div.style.position === 'absolute' || 
             window.getComputedStyle(div).position === 'fixed' || window.getComputedStyle(div).position === 'absolute')) {
          div.style.display = 'none';
          div.style.visibility = 'hidden';
          div.style.opacity = '0';
          div.style.pointerEvents = 'none';
          div.style.zIndex = '-9999';
          try {
            div.remove();
          } catch(e) {}
        }
      });
    } catch(e) {
      // Ignore errors
    }
  }
  
  // Watch for dynamically added Evergage UI elements
  const observer = new MutationObserver(function(mutations) {
    hideEvergageAuthUI();
  });
  
  // Start observing after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      hideEvergageAuthUI();
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'style']
      });
    });
  } else {
    hideEvergageAuthUI();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'style']
    });
  }
  
  // Also hide after Evergage script loads
  script.onload = function() {
    // Hide immediately and then periodically for a few seconds
    hideEvergageAuthUI();
    const interval = setInterval(hideEvergageAuthUI, 100);
    setTimeout(function() {
      clearInterval(interval);
      hideEvergageAuthUI();
      console.error = originalError;
      console.warn = originalWarn;
    }, 5000);
  };
  
  // Also run periodically on page load
  let checkCount = 0;
  const maxChecks = 50; // Check for 5 seconds (50 * 100ms)
  const periodicCheck = setInterval(function() {
    hideEvergageAuthUI();
    checkCount++;
    if (checkCount >= maxChecks) {
      clearInterval(periodicCheck);
    }
  }, 100);
  
  // Add CSS to hide Evergage auth UI
  const style = document.createElement('style');
  style.textContent = `
    [class*="evergage"][class*="login"],
    [class*="evergage"][class*="auth"],
    [id*="evergage"][id*="login"],
    [id*="evergage"][id*="auth"],
    [class*="evg-"][class*="login"],
    [class*="evg-"][class*="auth"],
    iframe[src*="evergage"],
    iframe[src*="evgnet"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      position: absolute !important;
      left: -9999px !important;
      pointer-events: none !important;
    }
  `;
  head.appendChild(style);
  
  // Suppress unhandled promise rejections from Evergage
  window.addEventListener('unhandledrejection', function(event) {
    const reason = event.reason;
    const message = reason && (reason.message || reason.toString());
    if (message && shouldSuppressError(message)) {
      event.preventDefault(); // Prevent the error from appearing in console
      return false;
    }
  });
  
  // Also suppress network errors via fetch/XHR interception
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function() {
      const url = arguments[0];
      if (typeof url === 'string' && /internal\/(auth|dataset)/i.test(url)) {
        // Return a mock successful response instead of rejecting
        // This prevents uncaught promise rejections
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          json: () => Promise.resolve({}),
          text: () => Promise.resolve('{}'),
          headers: new Headers()
        });
      }
      return originalFetch.apply(this, arguments);
    };
  }
  
  // Suppress XMLHttpRequest errors
  if (window.XMLHttpRequest) {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      const url = arguments[1];
      if (typeof url === 'string' && /internal\/(auth|dataset)/i.test(url)) {
        // Suppress Evergage internal API calls
        this._suppressEvergage = true;
      }
      return originalOpen.apply(this, arguments);
    };
    
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      if (this._suppressEvergage) {
        // Simulate a failed request without actually sending it
        // Set readyState to DONE and status to 404
        setTimeout(() => {
          if (this.onerror) {
            try {
              this.onerror();
            } catch(e) {
              // Suppress errors from error handlers
            }
          }
        }, 0);
        return;
      }
      return originalSend.apply(this, arguments);
    };
  }
})();

