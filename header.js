document.addEventListener('DOMContentLoaded', function() {
  loadHeader();
  updateHeaderUserStatus();
  initScrollHeader();
});

function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  headerPlaceholder.innerHTML = `
    <header class="navbar">
      <div class="container nav-container">
        <div class="nav-brand">
          <a href="index.html">
            <h2><i class="fas fa-gem"></i> Styler</h2>
          </a>
        </div>
        
        <nav class="nav-menu" id="navMenu">
          <a href="/index.html" class="nav-link">Home</a>
          <a href="/Products/bags.html" class="nav-link">Bags</a>
          <a href="/Products/shoes.html" class="nav-link">Shoes</a>
          <a href="/contact.html" class="nav-link">Contact</a>
          
          <div class="search-container">
            <input type="text" id="globalSearch" placeholder="Search products..." class="search-input">
            <button class="search-btn" onclick="performGlobalSearch()">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <a href="/cart.html" class="nav-link cart-link">
            <i class="fas fa-shopping-cart"></i>
            Cart (<span id="cartCount">0</span>)
          </a>
          
          <div class="dropdown">
            <button class="dropdown-btn" id="accountBtn">
              <i class="fas fa-user"></i> <span id="accountText">Account</span>
            </button>
            <div class="dropdown-content" id="accountDropdown">
              <div id="loggedOutMenu">
                <a href="login.html">
                  <i class="fas fa-sign-in-alt"></i> Login
                </a>
                <a href="login.html?mode=signup">
                  <i class="fas fa-user-plus"></i> Sign Up
                </a>
              </div>
              <div id="loggedInMenu" style="display: none;">
                <a href="/orders.html">
                  <i class="fas fa-box"></i> My Orders
                </a>
                <a href="#" onclick="logout()">
                  <i class="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <button class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;

  setupMobileMenu();
  
  setupGlobalSearch();
  
  setupAccountDropdown();
  
  updateCartCount();
  
  highlightActivePage();
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    navMenu.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav-link')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
}

function setupGlobalSearch() {
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performGlobalSearch();
      }
    });
  }
}

function performGlobalSearch() {
  const searchTerm = document.getElementById('globalSearch')?.value.toLowerCase().trim();
  
  if (!searchTerm) {
    showNotification('Please enter a search term', 'warning');
    return;
  }
  
  sessionStorage.setItem('globalSearchTerm', searchTerm);
  
  if (window.location.pathname.includes('index.html')) {
    displayGlobalSearchResults(searchTerm);
  } else {
    window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
  }
}

function filterProductsBySearch(searchTerm) {
  if (window.applySearchFilter) {
    window.applySearchFilter(searchTerm);
  }
}

function setupAccountDropdown() {
  const accountBtn = document.getElementById('accountBtn');
  const dropdown = document.getElementById('accountDropdown');
  
  if (accountBtn && dropdown) {
    accountBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
      dropdown.classList.remove('show');
    });
    
    dropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

function updateHeaderUserStatus() {
  const currentUserData = localStorage.getItem('currentUser');
  const userEmail = localStorage.getItem('userEmail');
  const loggedOutMenu = document.getElementById('loggedOutMenu');
  const loggedInMenu = document.getElementById('loggedInMenu');
  const accountText = document.getElementById('accountText');
  
  if (currentUserData && userEmail && loggedOutMenu && loggedInMenu) {
    loggedOutMenu.style.display = 'none';
    loggedInMenu.style.display = 'block';
    
    if (accountText) {
      try {
        const userData = JSON.parse(currentUserData);
        const displayName = userData.name || userEmail.split('@')[0];
        accountText.textContent = displayName;
      } catch (e) {
        accountText.textContent = userEmail.split('@')[0];
      }
    }
  } else if (loggedOutMenu && loggedInMenu) {
    loggedOutMenu.style.display = 'block';
    loggedInMenu.style.display = 'none';
    
    if (accountText) {
      accountText.textContent = 'Account';
    }
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('cart'); // Clear cart on logout
  showNotification('Logged out successfully', 'success');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function highlightActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === currentPage || 
        (currentPage === 'index.html' && href === 'index.html') ||
        (currentPage === 'products.html' && href === 'products.html') ||
        (currentPage === 'shoes.html' && href === 'shoes.html') ||
        (currentPage === 'cart.html' && href === 'cart.html') ||
        (currentPage === 'contact.html' && href === 'contact.html')) {
      link.classList.add('active');
    }
  });
}

function initScrollHeader() {
  let lastScrollTop = 0;
  let isScrollingUp = false;
  let scrollTimeout;
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;

  navbar.classList.add('at-top');
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop <= 10) {
      navbar.classList.add('at-top');
      navbar.classList.remove('visible');
      return;
    } else {
      navbar.classList.remove('at-top');
    }
    
    if (scrollTop < lastScrollTop) {
      if (!isScrollingUp) {
        isScrollingUp = true;
        navbar.classList.add('visible');
      }
    } else {
      if (isScrollingUp) {
        isScrollingUp = false;
        navbar.classList.remove('visible');
      }
    }
    
    lastScrollTop = scrollTop;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (isScrollingUp) {
        navbar.classList.add('visible');
      }
    }, 150);
  }
  
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

window.performGlobalSearch = performGlobalSearch;
window.logout = logout;
window.initScrollHeader = initScrollHeader;
window.displayGlobalSearchResults = window.displayGlobalSearchResults || function() {};