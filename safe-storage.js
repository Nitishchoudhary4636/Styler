/**
 * Safe Storage Wrapper
 * 
 * Provides safe access to localStorage and sessionStorage that handles
 * sandboxed environments gracefully. Falls back to in-memory storage
 * when browser storage is unavailable.
 */

(function() {
  'use strict';
  
  // In-memory fallback storage
  const memoryStorage = {
    localStorage: {},
    sessionStorage: {}
  };
  
  // Check if storage is available
  function isStorageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Safe localStorage wrapper
  const safeLocalStorage = {
    getItem: function(key) {
      if (isStorageAvailable('localStorage')) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          console.warn('localStorage access blocked, using memory fallback');
          return memoryStorage.localStorage[key] || null;
        }
      }
      return memoryStorage.localStorage[key] || null;
    },
    
    setItem: function(key, value) {
      if (isStorageAvailable('localStorage')) {
        try {
          localStorage.setItem(key, value);
          return;
        } catch (e) {
          console.warn('localStorage access blocked, using memory fallback');
        }
      }
      memoryStorage.localStorage[key] = value;
    },
    
    removeItem: function(key) {
      if (isStorageAvailable('localStorage')) {
        try {
          localStorage.removeItem(key);
          return;
        } catch (e) {
          console.warn('localStorage access blocked, using memory fallback');
        }
      }
      delete memoryStorage.localStorage[key];
    },
    
    clear: function() {
      if (isStorageAvailable('localStorage')) {
        try {
          localStorage.clear();
          return;
        } catch (e) {
          console.warn('localStorage access blocked, using memory fallback');
        }
      }
      memoryStorage.localStorage = {};
    }
  };
  
  // Safe sessionStorage wrapper
  const safeSessionStorage = {
    getItem: function(key) {
      if (isStorageAvailable('sessionStorage')) {
        try {
          return sessionStorage.getItem(key);
        } catch (e) {
          console.warn('sessionStorage access blocked, using memory fallback');
          return memoryStorage.sessionStorage[key] || null;
        }
      }
      return memoryStorage.sessionStorage[key] || null;
    },
    
    setItem: function(key, value) {
      if (isStorageAvailable('sessionStorage')) {
        try {
          sessionStorage.setItem(key, value);
          return;
        } catch (e) {
          console.warn('sessionStorage access blocked, using memory fallback');
        }
      }
      memoryStorage.sessionStorage[key] = value;
    },
    
    removeItem: function(key) {
      if (isStorageAvailable('sessionStorage')) {
        try {
          sessionStorage.removeItem(key);
          return;
        } catch (e) {
          console.warn('sessionStorage access blocked, using memory fallback');
        }
      }
      delete memoryStorage.sessionStorage[key];
    },
    
    clear: function() {
      if (isStorageAvailable('sessionStorage')) {
        try {
          sessionStorage.clear();
          return;
        } catch (e) {
          console.warn('sessionStorage access blocked, using memory fallback');
        }
      }
      memoryStorage.sessionStorage = {};
    }
  };
  
  // Replace window.localStorage and window.sessionStorage with safe versions
  // Only if they're not available or throwing errors
  try {
    localStorage.getItem('__test__');
  } catch (e) {
    // localStorage is blocked, use safe wrapper
    Object.defineProperty(window, 'localStorage', {
      value: safeLocalStorage,
      writable: false,
      configurable: false
    });
  }
  
  try {
    sessionStorage.getItem('__test__');
  } catch (e) {
    // sessionStorage is blocked, use safe wrapper
    Object.defineProperty(window, 'sessionStorage', {
      value: safeSessionStorage,
      writable: false,
      configurable: false
    });
  }
  
  // Also provide as global functions for easier access
  window.safeLocalStorage = safeLocalStorage;
  window.safeSessionStorage = safeSessionStorage;
})();

