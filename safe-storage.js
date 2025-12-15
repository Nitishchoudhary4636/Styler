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
  
  // Try to replace window.localStorage and window.sessionStorage
  // This handles cases where the document is sandboxed
  try {
    // Test if localStorage is accessible
    localStorage.getItem('__test__');
  } catch (e) {
    // localStorage is blocked (sandboxed), replace with safe wrapper
    try {
      delete window.localStorage;
      window.localStorage = safeLocalStorage;
    } catch (e2) {
      // Can't delete/replace, wrap the methods instead
      const originalGetItem = Storage.prototype.getItem;
      const originalSetItem = Storage.prototype.setItem;
      const originalRemoveItem = Storage.prototype.removeItem;
      
      Storage.prototype.getItem = function(key) {
        try {
          return originalGetItem.call(this, key);
        } catch (e) {
          if (this === localStorage) {
            return safeLocalStorage.getItem(key);
          } else if (this === sessionStorage) {
            return safeSessionStorage.getItem(key);
          }
          return null;
        }
      };
      
      Storage.prototype.setItem = function(key, value) {
        try {
          return originalSetItem.call(this, key, value);
        } catch (e) {
          if (this === localStorage) {
            safeLocalStorage.setItem(key, value);
          } else if (this === sessionStorage) {
            safeSessionStorage.setItem(key, value);
          }
        }
      };
      
      Storage.prototype.removeItem = function(key) {
        try {
          return originalRemoveItem.call(this, key);
        } catch (e) {
          if (this === localStorage) {
            safeLocalStorage.removeItem(key);
          } else if (this === sessionStorage) {
            safeSessionStorage.removeItem(key);
          }
        }
      };
    }
  }
  
  try {
    // Test if sessionStorage is accessible
    sessionStorage.getItem('__test__');
  } catch (e) {
    // sessionStorage is blocked (sandboxed), replace with safe wrapper
    try {
      delete window.sessionStorage;
      window.sessionStorage = safeSessionStorage;
    } catch (e2) {
      // Already handled by prototype wrapping above
    }
  }
  
  // Also provide as global functions for easier access
  window.safeLocalStorage = safeLocalStorage;
  window.safeSessionStorage = safeSessionStorage;
})();

