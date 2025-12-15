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
    /Failed to load resource.*404/i
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
  
  // Also suppress network errors via fetch/XHR interception
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function() {
      const url = arguments[0];
      if (typeof url === 'string' && /internal\/(auth|dataset)/i.test(url)) {
        // Suppress Evergage internal API calls
        return Promise.reject(new Error('Suppressed Evergage API call'));
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
        // Don't actually send the request
        return;
      }
      return originalSend.apply(this, arguments);
    };
  }
})();

