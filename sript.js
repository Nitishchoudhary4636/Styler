window.dataLayer = window.dataLayer || [];
const products = [
  {
    id: 1,
    name: "Multicolor Mandala Flap Sling Bag",
    price: 799,
    category: "bags",
    image: "/Bags/mockupbee-uVT5GktsQ6o-unsplash.jpg",
    description: "Beautiful multicolor mandala design flap sling bag perfect for daily use. Spacious interior with multiple compartments.",
  colors: ["Red", "Blue", "Green", "Black"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 2,
    name: "Mandrasto Casual Tote",
    price: 2499,
    category: "bags",
    image: "/Bags/pexels-vinta-supply-co-nyc-268013-842959.jpg",
    description: "Elegant casual tote bag with premium materials. Perfect for work or shopping with ample storage space.",
  colors: ["Brown", "Black", "Tan"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 3,
    name: "Premium Black Handbag",
    price: 1299,
    category: "bags",
    image: "/Bags/pexels-bertellifotografia-2905238.jpg",
    description: "Classic black handbag with modern design. Features multiple pockets and comfortable handles for everyday elegance.",
  colors: ["Black", "Grey"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 7,
    name: "Designer Leather Backpack",
    price: 3299,
    category: "bags",
    image: "/Bags/pexels-avinashpatel-1178525.jpg",
    description: "Premium leather backpack with multiple compartments. Perfect for work, travel, or daily commute. Durable and stylish.",
  colors: ["Brown", "Black"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 8,
    name: "Vintage Canvas Messenger Bag",
    price: 1899,
    category: "bags",
    image: "/Bags/pexels-geyonk-1152077.jpg",
    description: "Stylish vintage canvas messenger bag with leather accents. Ideal for students and professionals.",
  colors: ["Green", "Brown", "Black"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 9,
    name: "Luxury Evening Clutch",
    price: 2199,
    category: "bags",
    image: "/Bags/pexels-godisable-jacob-226636-934673.jpg",
    description: "Elegant evening clutch with gold chain strap. Perfect for parties and formal events.",
  colors: ["Gold", "Black"],
  sizes: ["Medium", "One Size"]
  },
  {
    id: 10,
    name: "Casual Crossbody Bag",
    price: 1499,
    category: "bags",
    image: "/Bags/pexels-flat-hito-294826-904350.jpg",
    description: "Lightweight crossbody bag with adjustable strap. Perfect for hands-free convenience during outings.",
  colors: ["Red", "Black", "White"],
  sizes: ["Medium", "Large", "One Size"]
  },
  { 
    id: 11,
    name: "Professional Laptop Bag",
    price: 2799,
    category: "bags",
    image: "/Bags/pexels-godisable-jacob-226636-1936848.jpg",
    description: "Padded laptop bag with multiple pockets for accessories. Suitable for 15-inch laptops.",
  colors: ["Black", "Grey"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 12,
    name: "Bohemian Fringe Handbag",
    price: 1799,
    category: "bags",
    image: "/Bags/pexels-jonathanborba-3155047.jpg",
    description: "Trendy bohemian style handbag with fringe details. Perfect for casual and festival looks.",
  colors: ["Brown", "Tan", "Black"],
  sizes: ["Medium", "Large", "One Size"]
  },
  {
    id: 13,
    name: "Mini Bucket Bag",
    price: 1399,
    category: "bags",
    image: "/Bags/pexels-marleneleppanen-1039518.jpg",
    description: "Compact bucket bag with drawstring closure. Stylish and practical for everyday use.",
  colors: ["Pink", "Black", "White"],
  sizes: ["Small", "Medium", "Large", "One Size"]
  },
    {
      id: 14,
      name: "Executive Briefcase",
      price: 4299,
      category: "bags",
      image: "/Bags/pexels-mart-production-8801089.jpg",
      description: "Professional leather briefcase with combination lock. Perfect for business meetings and office use.",
  colors: ["Black", "Brown"],
  sizes: ["Medium", "Large", "One Size"]
    },
    {
      id: 15,
      name: "Quilted Chain Purse",
      price: 2999,
      category: "bags",
      image: "/Bags/pexels-maxime-wouters-2155901030-34076070.jpg",
      description: "Luxury quilted purse with gold chain strap. Elegant design for sophisticated style.",
  colors: ["Black", "Gold"],
  sizes: ["Medium", "One Size"]
    },

  {
    id: 4,
    name: "Men's Casual Sneakers",
    price: 1899,
    category: "shoes",
    image: "/Shoes/pexels-obviouslyarthur-1102776.jpg",
    description: "Comfortable men's sneakers perfect for daily wear. Breathable material with excellent cushioning and style.",
  colors: ["Black", "White", "Blue", "Grey"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 5,
    name: "Women's Running Shoes",
    price: 2199,
    category: "shoes",
    image: "/Shoes/pexels-jeshoots-com-147458-7432.jpg",
    description: "High-performance women's running shoes with advanced cushioning technology. Perfect for fitness enthusiasts.",
  colors: ["Black", "White", "Pink", "Grey"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 6,
    name: "Formal Leather Shoes",
    price: 1599,
    category: "shoes",
    image: "/Shoes/pexels-goumbik-292999.jpg",
    description: "Professional formal leather shoes crafted from genuine leather. Perfect for office wear and formal occasions.",
  colors: ["Black", "Brown"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 16,
    name: "Women's High Heel Pumps",
    price: 2499,
    category: "shoes",
    image: "/Shoes/pexels-godisable-jacob-226636-1308324.jpg",
    description: "Classic high heel pumps in genuine leather. Perfect for office wear and formal occasions.",
  colors: ["Black", "Red", "Beige"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 17,
    name: "Men's Leather Loafers",
    price: 2199,
    category: "shoes",
    image: "/Shoes/pexels-pixabay-267320.jpg",
    description: "Comfortable leather loafers with cushioned insole. Ideal for casual and semi-formal wear.",
  colors: ["Brown", "Black"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 18,
    name: "Women's Ankle Boots",
    price: 2799,
    category: "shoes",
    image: "/Shoes/pexels-lorena-martinez-1218850-2351858.jpg",
    description: "Stylish ankle boots with side zipper. Perfect for fall and winter fashion.",
  colors: ["Black", "Brown"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 19,
    name: "Men's Sports Training Shoes",
    price: 2599,
    category: "shoes",
    image: "/Shoes/pexels-jddaniel-2385477.jpg",
    description: "High-performance training shoes with excellent grip and support. Perfect for gym and outdoor activities.",
  colors: ["Black", "Blue", "Grey"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 20,
    name: "Women's Ballet Flats",
    price: 1299,
    category: "shoes",
    image: "/Shoes/pexels-mnzoutfits-1598508.jpg",
    description: "Comfortable ballet flats in soft leather. Perfect for daily wear and office use.",
  colors: ["Pink", "Black", "White"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 21,
    name: "Men's Canvas Sneakers",
    price: 1499,
    category: "shoes",
    image: "/Shoes/pexels-chuck-3261069.jpg",
    description: "Classic canvas sneakers with rubber sole. Comfortable and versatile for casual wear.",
  colors: ["Black", "White", "Blue"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 22,
    name: "Women's Sandals",
    price: 1799,
    category: "shoes",
    image: "/Shoes/pexels-monicore-134064.jpg",
    description: "Elegant sandals with adjustable straps. Perfect for summer and casual outings.",
  colors: ["Black", "White", "Tan"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 23,
    name: "Men's Oxford Dress Shoes",
    price: 2999,
    category: "shoes",
    image: "/Shoes/pexels-mnzoutfits-1598505.jpg",
    description: "Premium Oxford dress shoes in genuine leather. Perfect for weddings and formal events.",
  colors: ["Black", "Brown"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 24,
    name: "Women's Wedge Heels",
    price: 2299,
    category: "shoes",
    image: "/Shoes/pexels-didsss-2237456.jpg",
    description: "Comfortable wedge heels with platform sole. Stylish and comfortable for all-day wear.",
  colors: ["Black", "Beige", "Brown"],
  sizes: ["7", "8", "9", "10", "11", "12"]
  }
];




function formatCurrency(amount) {
  const numAmount = parseFloat(amount) || 0;
  return `₹${Math.round(numAmount).toLocaleString('en-IN')}`;
}

function truncate(text, length = 100) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function currentUser() {
  const userData = localStorage.getItem('currentUser');
  const userEmail = localStorage.getItem('userEmail');
  if (userData && userEmail) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      return userEmail;
    }
  }
  return null;
}

function isLoggedIn() {
  const userData = currentUser();
  return !!(userData && localStorage.getItem('userEmail'));
}

function ensureLoggedInBefore(action) {
  if (!isLoggedIn()) {
    sessionStorage.setItem('returnUrl', window.location.href);
    sessionStorage.setItem('pendingAction', JSON.stringify(action));
    showNotification('Please login to continue', 'warning');
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 1500);
    return false;
  }
  return true;
}

function productCardHtml(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" 
             alt="${escapeHtml(product.name)}">
      </div>
      <div class="product-info">
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <div class="product-category">
          <i class="fas ${product.category === 'bags' ? 'fa-shopping-bag' : 'fa-shoe-prints'}"></i>
          <span class="category-label">${product.category === 'bags' ? 'Bag' : 'Shoe'}</span>
        </div>
        <p class="product-description">${truncate(product.description, 65)}</p>
        <div class="product-price">${formatCurrency(product.price)}</div>
        <div class="product-actions">
          <a href="/Products/product.html?id=${product.id}" class="btn btn-primary btn-full">
            <i class="fas fa-eye"></i> View Details
          </a>
        </div>
      </div>
    </div>
  `;
}

function quickAddToCart(productId) {
  window.location.href = `product.html?id=${productId}`;
}

function addToCart(productId, colorOverride = null, sizeOverride = null) {
  if (!ensureLoggedInBefore({type: 'addToCart', productId: productId})) {
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    showNotification('Product not found', 'error');
    return;
  }

  let color = colorOverride;
  let size = sizeOverride;
  
  if (!color) {
    const colorSelect = document.getElementById('colorSelect');
    color = colorSelect ? colorSelect.value : getDefaultColor(product.category);
  }
  
  if (!size) {
    const sizeSelect = document.getElementById('sizeSelect');
    size = sizeSelect ? sizeSelect.value : getDefaultSize(product.category);
  }

  if (window.addToCartWithVariant) {
    const success = window.addToCartWithVariant(productId, color, size, 1);
    if (success) {
      setTimeout(() => {
        window.location.href = '/cart.html';
      }, 1500);
    }
  } else {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(
      item => item.id == productId && item.color === color && item.size === size
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
      saveCart(cart);
      showNotification(`Quantity updated for ${product.name} in cart!`, 'success');
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        color: color,
        size: size,
        quantity: 1,
        category: product.category
      });
      saveCart(cart);
      showNotification(`${product.name} added to cart!`, 'success');
    }
    
    setTimeout(() => {
      window.location.href = 'cart.html';
    }, 1500);
    
    return true;
  }
}

function getDefaultColor(category) {
  return category === 'bags' ? 'Black' : 'Black';
}

function getDefaultSize(category) {
  return category === 'shoes' ? '9' : 'Medium';
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('#cartCount');
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

let loadedProductsCount = 3;
let loadedBagsCount = 3;
let loadedShoesCount = 3;

function loadFeaturedProducts() {
  const globalSearchTerm = getGlobalSearchTerm();
  
  if (globalSearchTerm) {
    displayGlobalSearchResults(globalSearchTerm);
    return;
  }
  
  const container = document.getElementById('featuredProducts');
  const hiddenContainer = document.getElementById('hiddenProducts');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const sectionTitle = document.querySelector('.section-title');
  
  if (!container) return;

  if (sectionTitle) {
    sectionTitle.textContent = 'Featured Products';
  }

  loadedProductsCount = 6;
  window.globalSearchResults = null;
  
  const shuffledProducts = [...products];
  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
  }
  const featuredProducts = shuffledProducts.slice(0, 6);
  
  container.innerHTML = featuredProducts.map(product => productCardHtml(product)).join('');
  
  if (hiddenContainer) {
    hiddenContainer.innerHTML = '';
  }
  if (viewMoreBtn) {
    viewMoreBtn.style.display = 'none';
  }
}

function loadBagsPage() {
  const container = document.getElementById('bagsGrid');
  const hiddenContainer = document.getElementById('hiddenBagsGrid');
  const viewMoreBtn = document.getElementById('viewMoreBagsBtn');
  const noProducts = document.getElementById('noProducts');
  if (!container) return;

  loadedBagsCount = 3;


  const sortFilter = document.getElementById('sortFilter')?.value || '';
  const priceFilter = document.getElementById('priceFilter')?.value || '';
  const searchTerm = getSearchTerm();

  let bagsProducts = products.filter(p => p.category === 'bags');

  if (searchTerm) {
    bagsProducts = bagsProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  if (priceFilter) {
    const [min, max] = priceFilter.includes('-') ? priceFilter.split('-').map(Number) : [parseInt(priceFilter.replace('+', '')), Infinity];
    bagsProducts = bagsProducts.filter(product => 
      product.price >= min && (max === Infinity ? true : product.price <= max)
    );
  }

  if (sortFilter) {
    switch (sortFilter) {
      case 'price-low':
        bagsProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        bagsProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        bagsProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  window.filteredBags = bagsProducts;


  if (bagsProducts.length === 0) {
    container.innerHTML = '';
    if (hiddenContainer) hiddenContainer.innerHTML = '';
    if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    if (noProducts) noProducts.style.display = 'block';
  } else {
    if (noProducts) noProducts.style.display = 'none';
    
    const initialBags = bagsProducts.slice(0, 3);
    const remainingBags = bagsProducts.slice(3);
    
    container.innerHTML = initialBags.map(product => productCardHtml(product)).join('');
    
    if (remainingBags.length > 0) {
      if (hiddenContainer) {
        hiddenContainer.innerHTML = '';
      }
      if (viewMoreBtn) {
        viewMoreBtn.style.display = 'inline-flex';
        viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> View More Bags (${remainingBags.length} remaining)`;
      }
    } else {
      if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    }
  }
}

function loadShoesPage() {
  const container = document.getElementById('shoesGrid');
  const hiddenContainer = document.getElementById('hiddenShoesGrid');
  const viewMoreBtn = document.getElementById('viewMoreShoesBtn');
  const noProducts = document.getElementById('noProducts');
  if (!container) return;

  loadedShoesCount = 3;


  const sizeFilter = document.getElementById('sizeFilter')?.value || '';
  const sortFilter = document.getElementById('sortFilter')?.value || '';
  const searchTerm = getSearchTerm();

  let shoesProducts = products.filter(p => p.category === 'shoes');

  if (searchTerm) {
    shoesProducts = shoesProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }


  if (sortFilter) {
    switch (sortFilter) {
      case 'price-low':
        shoesProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        shoesProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        shoesProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  window.filteredShoes = shoesProducts;


  if (shoesProducts.length === 0) {
    container.innerHTML = '';
    if (hiddenContainer) hiddenContainer.innerHTML = '';
    if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    if (noProducts) noProducts.style.display = 'block';
  } else {
    if (noProducts) noProducts.style.display = 'none';
    
    const initialShoes = shoesProducts.slice(0, 3);
    const remainingShoes = shoesProducts.slice(3);
    
    container.innerHTML = initialShoes.map(product => productCardHtml(product)).join('');
    
    if (remainingShoes.length > 0) {
      if (hiddenContainer) {
        hiddenContainer.innerHTML = '';
      }
      if (viewMoreBtn) {
        viewMoreBtn.style.display = 'inline-flex';
        viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> View More Shoes (${remainingShoes.length} remaining)`;
      }
    } else {
      if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    }
  }
}

function getSearchTerm() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearch = urlParams.get('search');
  const sessionSearch = sessionStorage.getItem('searchTerm');
  
  if (urlSearch) {
    sessionStorage.setItem('searchTerm', urlSearch);
    return urlSearch.toLowerCase();
  }
  
  return sessionSearch ? sessionSearch.toLowerCase() : '';
}

function getGlobalSearchTerm() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearch = urlParams.get('search');
  const sessionSearch = sessionStorage.getItem('globalSearchTerm');
  
  if (urlSearch) {
    sessionStorage.setItem('globalSearchTerm', urlSearch);
    return urlSearch.toLowerCase();
  }
  
  return sessionSearch ? sessionSearch.toLowerCase() : '';
}

function displayGlobalSearchResults(searchTerm = null) {
  const container = document.getElementById('featuredProducts');
  const hiddenContainer = document.getElementById('hiddenProducts');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const sectionTitle = document.querySelector('.section-title');
  
  if (!container) return;

  const searchQuery = searchTerm || getGlobalSearchTerm();
  
  if (!searchQuery) {
    loadFeaturedProducts();
    return;
  }

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  if (sectionTitle) {
    sectionTitle.textContent = `Search Results for "${searchQuery}" (${searchResults.length} found)`;
  }

  loadedProductsCount = 3;
  window.globalSearchResults = searchResults;

  if (searchResults.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>No products match your search for "${searchQuery}"</p>
        <button class="btn btn-primary" onclick="clearGlobalSearch()">
          <i class="fas fa-times"></i> Clear Search
        </button>
      </div>
    `;
    if (hiddenContainer) hiddenContainer.innerHTML = '';
    if (viewMoreBtn) viewMoreBtn.style.display = 'none';
  } else {
    const initialResults = searchResults.slice(0, 3);
    const remainingResults = searchResults.slice(3);
    
    container.innerHTML = initialResults.map(product => productCardHtml(product)).join('');
    
    if (remainingResults.length > 0) {
      if (hiddenContainer) hiddenContainer.innerHTML = '';
      if (viewMoreBtn) {
        viewMoreBtn.style.display = 'inline-flex';
        viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> View More Results (${remainingResults.length} remaining)`;
      }
    } else {
      if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    }
  }
}

function clearGlobalSearch() {
  sessionStorage.removeItem('globalSearchTerm');
  sessionStorage.removeItem('searchTerm');
  
  const url = new URL(window.location);
  url.searchParams.delete('search');
  window.history.replaceState({}, document.title, url);
  
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) searchInput.value = '';
  
  loadFeaturedProducts();
  

  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    sectionTitle.textContent = 'Featured Products';
  }
}

function applySearchFilter(searchTerm) {
  sessionStorage.setItem('searchTerm', searchTerm);
  
  if (window.location.pathname.includes('bags.html')) {
    loadBagsPage();
  } else if (window.location.pathname.includes('shoes.html')) {
    loadShoesPage();
  } else if (window.location.pathname.includes('index.html')) {
    displayGlobalSearchResults(searchTerm);
  }
}

function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  const product = products.find(p => p.id === productId);
  if (!product) {
    showNotification('Product not found', 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    return;
  }

  const container = document.getElementById("productDetail");
  if (!container) return;

  const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
  const productBreadcrumb = document.getElementById('productBreadcrumb');
  if (categoryBreadcrumb) {
    categoryBreadcrumb.textContent = product.category === 'bags' ? 'Bags' : 'Shoes';
    categoryBreadcrumb.innerHTML = `<a href="/Products/${product.category}.html">${product.category === 'bags' ? 'Bags' : 'Shoes'}</a>`;
  }
  if (productBreadcrumb) {
    productBreadcrumb.textContent = product.name;
  }

  const colorOptions = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors
    : ["Black"];
    
  const sizeOptions = Array.isArray(product.sizes) && product.sizes.length > 0
    ? product.sizes
    : ["Medium"];

  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-image-section">
        <div class="main-image">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" id="mainProductImage">
        </div>
      </div>
      
      <div class="product-info-section">
        <div class="product-header">
          <h1>${escapeHtml(product.name)}</h1>
          <div class="product-price-large">${formatCurrency(product.price)}</div>
          <div class="product-category">
            <span class="category-badge">${product.category === 'bags' ? 'Bags' : 'Shoes'}</span>
          </div>
        </div>

        <div class="product-description">
          <h3>Description</h3>
          <p>${escapeHtml(product.description)}</p>
        </div>

        <div class="product-options">
          <div class="option-group">
            <label for="colorSelect"><i class="fas fa-palette"></i> Choose Color:</label>
            <select id="colorSelect" class="option-select">
              ${colorOptions.map(color => 
                `<option value="${color}">${color}</option>`
              ).join("")}
            </select>
          </div>

          <div class="option-group">
            <label for="sizeSelect"><i class="fas fa-ruler"></i> Choose Size:</label>
            <select id="sizeSelect" class="option-select">
              ${sizeOptions.map(size => 
                `<option value="${size}">${size}</option>`
              ).join("")}
            </select>
          </div>
        </div>

        <div class="product-actions">
          <button class="btn btn-primary btn-large" onclick="addToCart(${product.id})">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
         
        </div>

        <div class="product-features">
          <div class="feature">
            <i class="fas fa-truck"></i>
            <div>
              <strong>Free Shipping</strong>
              <p>Free shipping on orders over ₹1,500</p>
            </div>
          </div>
          <div class="feature">
            <i class="fas fa-undo"></i>
            <div>
              <strong>30-Day Returns</strong>
              <p>Easy returns within 30 days</p>
            </div>
          </div>
          <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <div>
              <strong>Secure Payment</strong>
              <p>100% secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buyNow(productId) {
  if (addToCart(productId)) {
    setTimeout(() => {
      window.location.href = '/checkout.html';
    }, 1500);
  }
}

function showNotification(message, type = 'info') {
  if (window.showNotification) return;
  const notification = document.createElement('div');
  notification.className = `notification notification-popup ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    updateCartCount();
  }, 100);
  
  const pendingAction = sessionStorage.getItem('pendingAction');
  if (pendingAction && isLoggedIn()) {
    try {
      const action = JSON.parse(pendingAction);
      sessionStorage.removeItem('pendingAction');
      
      if (action.type === 'addToCart') {
        setTimeout(() => {
          quickAddToCart(action.productId);
        }, 500);
      }
    } catch (e) {
      console.error('Error processing pending action:', e);
    }
  }
  
  if (window.location.pathname.includes('index.html')) {
    sessionStorage.removeItem('searchTerm');
  }
});

function showMoreProducts() {
  const mainContainer = document.getElementById('featuredProducts');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  
  if (!mainContainer) return;
  
  const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '';
  if (isHomePage && !window.globalSearchResults) {
    if (viewMoreBtn) viewMoreBtn.style.display = 'none';
    return;
  }
  
  const productsToShow = window.globalSearchResults || products;
  const isSearchResults = !!window.globalSearchResults;
  
  const nextBatch = productsToShow.slice(loadedProductsCount, loadedProductsCount + 3);
  const remainingAfterBatch = productsToShow.slice(loadedProductsCount + 3);
  
  if (nextBatch.length > 0) {
    const nextProductsHTML = nextBatch.map(product => productCardHtml(product)).join('');
    mainContainer.innerHTML += nextProductsHTML;
    
    loadedProductsCount += nextBatch.length;
    

    if (remainingAfterBatch.length > 0) {
      const buttonText = isSearchResults ? 'View More Results' : 'View More Products';
      viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> ${buttonText} (${remainingAfterBatch.length} remaining)`;
    } else {
      viewMoreBtn.style.display = 'none';
    }
  }
}

function showMoreBags() {
  const mainContainer = document.getElementById('bagsGrid');
  const viewMoreBtn = document.getElementById('viewMoreBagsBtn');
  
  if (!mainContainer || !window.filteredBags) return;
  
  const nextBatch = window.filteredBags.slice(loadedBagsCount, loadedBagsCount + 3);
  const remainingAfterBatch = window.filteredBags.slice(loadedBagsCount + 3);
  
  if (nextBatch.length > 0) {
    const nextBagsHTML = nextBatch.map(product => productCardHtml(product)).join('');
    mainContainer.innerHTML += nextBagsHTML;
    
    loadedBagsCount += nextBatch.length;
    

    if (remainingAfterBatch.length > 0) {
      viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> View More Bags (${remainingAfterBatch.length} remaining)`;
    } else {
      viewMoreBtn.style.display = 'none';
    }
  }
}

function showMoreShoes() {
  const mainContainer = document.getElementById('shoesGrid');
  const viewMoreBtn = document.getElementById('viewMoreShoesBtn');
  
  if (!mainContainer || !window.filteredShoes) return;
  
  const nextBatch = window.filteredShoes.slice(loadedShoesCount, loadedShoesCount + 3);
  const remainingAfterBatch = window.filteredShoes.slice(loadedShoesCount + 3);
  
  if (nextBatch.length > 0) {
    const nextShoesHTML = nextBatch.map(product => productCardHtml(product)).join('');
    mainContainer.innerHTML += nextShoesHTML;
    
    loadedShoesCount += nextBatch.length;
    

    if (remainingAfterBatch.length > 0) {
      viewMoreBtn.innerHTML = `<i class="fas fa-plus"></i> View More Shoes (${remainingAfterBatch.length} remaining)`;
    } else {
      viewMoreBtn.style.display = 'none';
    }
  }
}

window.quickAddToCart = quickAddToCart;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadBagsPage = loadBagsPage;
window.loadShoesPage = loadShoesPage;
window.loadProductDetail = loadProductDetail;
window.applySearchFilter = applySearchFilter;
window.displayGlobalSearchResults = displayGlobalSearchResults;
window.clearGlobalSearch = clearGlobalSearch;
window.showMoreProducts = showMoreProducts;
window.showMoreBags = showMoreBags;
window.showMoreShoes = showMoreShoes;
window.products = products;
window.formatCurrency = formatCurrency;
window.escapeHtml = escapeHtml;
window.truncate = truncate;
window.currentUser = currentUser;
window.isLoggedIn = isLoggedIn;
window.productCardHtml = productCardHtml;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    products,
    formatCurrency,
    escapeHtml,
    truncate,
    productCardHtml,
    quickAddToCart,
    addToCart,
    loadFeaturedProducts,
    loadBagsPage,
    loadShoesPage,
    loadProductDetail
  };
}



function pushMCPListView(category) {
  if (!category) {
    console.warn('pushMCPListView: category is required');
    return;
  }
  const itemsArray = products.filter(p => p.category === category);
  window.dataLayer.push({
    event: 'MCP',
    timestamp: new Date().toISOString(),
    mcpVersion: '1.0.0',
    MCP: {
      currency: 'INR',
      itemListId: category + '_Listing',
      itemListName: 'Products',
      url: window.location.href,
      items: itemsArray
    }
  });
}

function pushMCPContactUsView(){
function pushMCPCartView(){
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const mcpItems = cart.map((item, idx) => ({
    index: String(idx),
    item_id: String(item.id),
    item_name: item.name,
    price: String(item.price),
    quantity: String(item.quantity),
    color: item.color || '',
    size: item.size || '',
    imageUrl: item.image || ''
  }));
  
  // This is the structure the sitemap is looking for
  const ecommerceData = {
    event: 'view_cart',
    ecommerce: {
      currency: 'INR',
      cart: {
        products: cart.map(item => ({
          id: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          variant: `${item.color} - ${item.size}`
        }))
      }
    }
  };

  window.dataLayer.push(ecommerceData);
  console.log('✅ Pushed cart data to dataLayer:', ecommerceData);

  // You can keep your original MCP push if it's used elsewhere
  window.dataLayer.push({
    event: 'MCP',
    MCP: {
      currency: 'INR',
      pageType: 'view_cart',
      pageName: 'Basket page',
      items: mcpItems
    }
  }); 
}
function pushMCPProductView() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find(p => p.id === productId);

  if (!product) return;

  window.dataLayer.push({
    event: 'Mcp',
    timestamp: new Date().toISOString(),
    mcpVersion: '1.0.0',
    MCP: {
      pageType: 'Product',
      pageName: `Product - ${product.name}`,
     
      Item: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: 'INR',
        availability: 'in_stock',
        url: window.location.href,
        quantity: product.quantity || 1,
        imageUrl: product.image || '',
        description: product.description || '',
        color:product.colors || [],
        size:product.sizes || []
      }
    }
  });

  console.log('✅ MCP productView pushed:', window.dataLayer.slice(-1)[0]);
}
}

function pushMCPPurchase(order) {
  if (!order || !order.items) {
    console.error('pushMCPPurchase: Invalid order object provided.');
    return;
  }

  const purchaseData = {
    event: 'purchase',
    ecommerce: {
      purchase: {
        actionField: {
          id: order.id,
          affiliation: 'Styler Online Store',
          revenue: order.total,
          tax: order.tax,
          shipping: order.shipping
        },
        products: order.items.map(item => ({
          name: item.name,
          id: item.id,
          price: item.price,
          category: item.category,
          variant: `${item.color} - ${item.size}`,
          quantity: item.quantity
        }))
      }
    }
  };

  window.dataLayer.push(purchaseData);
  console.log('✅ Pushed purchase data to dataLayer:', purchaseData);
}

function pushMCPPurchase(order) {
  if (!order || !order.items) {
    console.error('pushMCPPurchase: Invalid order object provided.');
    return;
  }

  const purchaseData = {
    event: 'purchase',
    ecommerce: {
      purchase: {
        actionField: {
          id: order.id,
          affiliation: 'Styler Online Store',
          revenue: order.total,
          tax: order.tax,
          shipping: order.shipping
        },
        products: order.items.map(item => ({
          name: item.name,
          id: item.id,
          price: item.price,
          category: item.category,
          variant: `${item.color} - ${item.size}`,
          quantity: item.quantity
        }))
      }
    }
  };

  window.dataLayer.push(purchaseData);
  console.log('✅ Pushed purchase data to dataLayer:', purchaseData);
}
