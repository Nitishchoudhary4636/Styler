/**
 * Evergage Blocker
 * 
 * Completely blocks Evergage scripts, visual editor, and sitemap tools
 * from loading or executing. This prevents errors from Evergage's
 * visual editor and other tools that may be injected by browser extensions
 * or cached scripts.
 */

(function() {
  'use strict';
  
  // Block Evergage domains
  const evergageDomains = [
    'evergage.com',
    'evgnet.com',
    'australia-3.evergage.com',
    'visual-editor',
    'monaco-editor'
  ];
  
  // Suppress Evergage errors
  const originalError = console.error;
  console.error = function() {
    const args = Array.from(arguments);
    const message = args.join(' ');
    
    // Suppress Evergage-related errors
    if (evergageDomains.some(domain => message.includes(domain)) ||
        message.includes('Debug Failure') ||
        message.includes('tsWorker.js') ||
        message.includes('visual-editor') ||
        message.includes('monaco-editor') ||
        message.includes('Sitemap') ||
        message.includes('evergage')) {
      return; // Silently ignore
    }
    
    originalError.apply(console, args);
  };
  
  // Block fetch requests to Evergage
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function() {
      const url = arguments[0];
      if (typeof url === 'string' && evergageDomains.some(domain => url.includes(domain))) {
        return Promise.reject(new Error('Blocked: Evergage request'));
      }
      return originalFetch.apply(this, arguments);
    };
  }
  
  // Block XMLHttpRequest to Evergage
  if (window.XMLHttpRequest) {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      const url = arguments[1];
      if (typeof url === 'string' && evergageDomains.some(domain => url.includes(domain))) {
        this._blockEvergage = true;
      }
      return originalOpen.apply(this, arguments);
    };
    
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      if (this._blockEvergage) {
        return; // Block the request
      }
      return originalSend.apply(this, arguments);
    };
  }
  
  // Block script tags loading Evergage
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && typeof value === 'string' && 
            evergageDomains.some(domain => value.includes(domain))) {
          // Block Evergage scripts
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    if (tagName.toLowerCase() === 'iframe') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && typeof value === 'string' && 
            evergageDomains.some(domain => value.includes(domain))) {
          // Block Evergage iframes
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };
  
  // Remove existing Evergage scripts and iframes
  function removeEvergageElements() {
    // Remove script tags
    const scripts = document.querySelectorAll('script[src*="evergage"], script[src*="evgnet"]');
    scripts.forEach(script => script.remove());
    
    // Remove iframes
    const iframes = document.querySelectorAll('iframe[src*="evergage"], iframe[src*="evgnet"], iframe[src*="visual-editor"]');
    iframes.forEach(iframe => {
      iframe.remove();
    });
    
    // Remove elements with Evergage classes/IDs
    const evergageElements = document.querySelectorAll('[class*="evergage"], [id*="evergage"], [class*="evg-"], [id*="evg-"]');
    evergageElements.forEach(el => {
      if (el.textContent && (el.textContent.includes('Sitemap') || el.textContent.includes('Evergage'))) {
        el.remove();
      }
    });
  }
  
  // Run immediately
  removeEvergageElements();
  
  // Watch for dynamically added elements
  const observer = new MutationObserver(function(mutations) {
    removeEvergageElements();
  });
  
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
    });
  }
  
  // Block postMessage from Evergage
  const originalPostMessage = window.postMessage;
  window.postMessage = function(message, targetOrigin) {
    if (typeof message === 'string' && evergageDomains.some(domain => message.includes(domain))) {
      return; // Block Evergage postMessages
    }
    if (typeof targetOrigin === 'string' && evergageDomains.some(domain => targetOrigin.includes(domain))) {
      return; // Block messages to Evergage
    }
    return originalPostMessage.apply(this, arguments);
  };
  
  // Suppress unhandled errors from Evergage
  window.addEventListener('error', function(event) {
    const message = event.message || '';
    const filename = event.filename || '';
    
    if (evergageDomains.some(domain => message.includes(domain) || filename.includes(domain)) ||
        message.includes('Debug Failure') ||
        filename.includes('tsWorker.js') ||
        filename.includes('visual-editor') ||
        filename.includes('monaco-editor')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Suppress unhandled promise rejections from Evergage
  window.addEventListener('unhandledrejection', function(event) {
    const reason = event.reason;
    const message = reason && (reason.message || reason.toString());
    
    if (message && (evergageDomains.some(domain => message.includes(domain)) ||
        message.includes('Debug Failure') ||
        message.includes('tsWorker.js') ||
        message.includes('visual-editor'))) {
      event.preventDefault();
      return false;
    }
  });
})();

