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
  
  // Restore console after script loads (with delay to catch initial errors)
  script.onload = function() {
    setTimeout(function() {
      console.error = originalError;
      console.warn = originalWarn;
    }, 2000);
  };
  
  script.onerror = function() {
    // Restore console if script fails to load
    console.error = originalError;
    console.warn = originalWarn;
  };
  
  // Insert script into head
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
  
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

