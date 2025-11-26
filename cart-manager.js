let currentShippingAddress = null;
let allOrders = [];
let filteredOrders = [];

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCartWithVariant(productId, color = null, size = null, quantity = 1) {
  if (!isLoggedIn()) {
    sessionStorage.setItem('returnUrl', window.location.href);
    showNotification('Please login to add items to cart', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return false;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    showNotification('Product not found', 'error');
    return false;
  }

  if (color === null) {
    const colorSelect = document.getElementById('colorSelect');
    color = colorSelect ? colorSelect.value : getDefaultColor(product.category);
  }
  
  if (size === null) {
    const sizeSelect = document.getElementById('sizeSelect');
    size = sizeSelect ? sizeSelect.value : getDefaultSize(product.category);
  }

  let cart = getCart();

  const existingItemIndex = cart.findIndex(
    item => item.id == productId && item.color === color && item.size === size
  );

  if (existingItemIndex > -1) {
    const oldQuantity = cart[existingItemIndex].quantity;
    cart[existingItemIndex].quantity += quantity;
    const newQuantity = cart[existingItemIndex].quantity;
    showNotification(`${product.name} quantity updated (${oldQuantity} → ${newQuantity})`, 'success');
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color,
      size: size,
      quantity: quantity,
      category: product.category
    });
    showNotification(`${product.name} added to cart`, 'success');
  }

  saveCart(cart);
  
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1500);
  
  return true;
}

function getDefaultColor(category) {
  return category === 'bags' ? 'Black' : 'Black';
}

function getDefaultSize(category) {
  return category === 'shoes' ? '9' : 'Medium';
}

function updateCartQuantity(productId, color, size, delta) {
  let cart = getCart();
  const itemIndex = cart.findIndex(i => 
    i.id == productId && i.color === color && i.size === size
  );
  
  if (itemIndex === -1) return;
  
  cart[itemIndex].quantity += delta;
  
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
    showNotification('Item removed from cart', 'info');
  } else {
    showNotification('Cart updated', 'success');
  }
  
  saveCart(cart);
  
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

function removeCartItem(productId, color, size) {
  if (!confirm('Remove this item from cart?')) return;
  
  let cart = getCart();
  const initialLength = cart.length;
  
  cart = cart.filter(i => !(
    i.id == productId && i.color === color && i.size === size
  ));
  
  if (cart.length < initialLength) {
    saveCart(cart);
    showNotification('Item removed from cart', 'info');
  } else {
    console.warn('Item not found for removal:', {productId, color, size});
    showNotification('Item could not be removed', 'error');
  }
  
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

function cleanupCart() {
  let cart = getCart();
  const originalLength = cart.length;
  
  cart = cart.filter(item => {
    const hasValidId = item.id !== undefined && item.id !== null;
    const hasValidPrice = !isNaN(parseFloat(item.price)) && parseFloat(item.price) > 0;
    const hasValidQuantity = !isNaN(parseInt(item.quantity)) && parseInt(item.quantity) > 0;
    const hasValidName = item.name && item.name.trim() !== '';
    
    return hasValidId && hasValidPrice && hasValidQuantity && hasValidName;
  });
  
  if (cart.length < originalLength) {
    saveCart(cart);
    console.log(`Cleaned up ${originalLength - cart.length} invalid cart items`);
    return true;
  }
  return false;
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('#cartCount');
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

function loadCartPage() {
  const cartContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  if (!cartContainer) return;

  cleanupCart();
  
  const cart = getCart();
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    if (emptyCart) emptyCart.style.display = 'block';
    updateCartSummary(0, 0, 0, 0);
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';

  let subtotal = 0;
  cartContainer.innerHTML = cart.map(item => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity) || 1;
    const lineTotal = itemPrice * itemQuantity;
    
    if (isNaN(lineTotal) || itemPrice <= 0) {
      console.warn('Invalid cart item found:', item);
      return '';
    }
    
    subtotal += lineTotal;
    
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${escapeHtml(item.name)}">
        </div>
        
        <div class="cart-item-info">
          <h4>${escapeHtml(item.name)}</h4>
          <div class="cart-item-details">
            <div class="item-variant">
              <span class="variant-label">Color:</span>
              <span class="variant-value">${item.color}</span>
            </div>
            <div class="item-variant">
              <span class="variant-label">Size:</span>
              <span class="variant-value">${item.size}</span>
            </div>
            <div class="item-price">
              <span class="price">${formatCurrency(itemPrice)} each</span>
            </div>
          </div>
          
          <div class="quantity-controls">
            <button class="quantity-btn minus" 
                    onclick="updateCartQuantity(${item.id}, '${escapeHtml(item.color)}', '${escapeHtml(item.size)}', -1)"
                    ${itemQuantity <= 1 ? 'disabled' : ''}>
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-display">${itemQuantity}</span>
            <button class="quantity-btn plus" 
                    onclick="updateCartQuantity(${item.id}, '${escapeHtml(item.color)}', '${escapeHtml(item.size)}', 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        
       <div class="cart-item-actions">
  <div class="item-total">
    <strong>${formatCurrency(lineTotal)}</strong>
  </div>

  <button class="remove-btn" 
          data-id="${item.id}"
          onclick="removeCartItem(${item.id}, '${escapeHtml(item.color)}', '${escapeHtml(item.size)}')">

    <i class="fas fa-trash" data-id="${item.id}"></i>
    Remove
  </button>

</div>

    `;
  }).join('');

  const shipping = subtotal >= 1500 ? 0 : 59;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  updateCartSummary(subtotal, shipping, tax, total);
}

function updateCartSummary(subtotal, shipping, tax, total) {
  const elements = {
    subtotal: document.getElementById('subtotal'),
    shipping: document.getElementById('shipping'),
    tax: document.getElementById('tax'),
    total: document.getElementById('total')
  };

  if (elements.subtotal) elements.subtotal.textContent = formatCurrency(subtotal);
  if (elements.shipping) elements.shipping.textContent = shipping === 0 ? 'FREE' : formatCurrency(shipping);
  if (elements.tax) elements.tax.textContent = formatCurrency(tax);
  if (elements.total) elements.total.textContent = formatCurrency(total);

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = total === 0;
    checkoutBtn.textContent = total === 0 ? 'Cart is Empty' : `Proceed to Checkout - ${formatCurrency(total)}`;
  }
}

function proceedToCheckout() {
  const cart = getCart();
  
  if (cart.length === 0) {
    showNotification('Your cart is empty', 'warning');
    return;
  }
  
  if (!isLoggedIn()) {
    sessionStorage.setItem('returnUrl', 'checkout.html');
    showNotification('Please login to proceed to checkout', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return;
  }
  
  window.location.href = 'checkout.html';
}

function setupShippingForm() {
  const shippingForm = document.getElementById('shippingForm');
  if (!shippingForm) return;
  
  shippingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const shippingAddress = {
      fullName: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      address2: document.getElementById('address2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pincode: document.getElementById('pincode').value,
      landmark: document.getElementById('landmark').value
    };
    
    if (!shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    localStorage.setItem('userAddress', JSON.stringify(shippingAddress));
    currentShippingAddress = shippingAddress;
    
    showPaymentModal(shippingAddress);
  });
}

function showPaymentModal(shippingAddress) {
  const cart = getCart();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1500 ? 0 : 59;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  
  const paymentModalHtml = `
    <div id="paymentModal" class="modal" style="display: flex;">
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="fas fa-credit-card"></i> Payment Confirmation</h2>
        </div>
        <div class="modal-body">
          <div class="payment-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>${formatCurrency(shipping)}</span>
            </div>
            <div class="summary-row">
              <span>Tax (18%):</span>
              <span>${formatCurrency(tax)}</span>
            </div>
            <div class="summary-row total-row">
              <span><strong>Total Amount:</strong></span>
              <span><strong>${formatCurrency(total)}</strong></span>
            </div>
          </div>
          
          <div class="payment-method">
            <h4>Payment Method</h4>
            <p><i class="fas fa-money-bill-wave"></i> Cash on Delivery</p>
            <p class="payment-note">You will pay ${formatCurrency(total)} when your order is delivered.</p>
          </div>
          
          <div class="shipping-info">
            <h4>Delivery Address</h4>
            <p><strong>${shippingAddress.fullName}</strong></p>
            <p>${shippingAddress.address}</p>
            ${shippingAddress.address2 ? `<p>${shippingAddress.address2}</p>` : ''}
            <p>${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}</p>
            <p><i class="fas fa-phone"></i> ${shippingAddress.phone}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closePaymentModal()">
            <i class="fas fa-arrow-left"></i> Back to Cart
          </button>
          <button type="button" class="btn btn-primary btn-large" onclick="processPayment()">
            <i class="fas fa-credit-card"></i> Pay ${formatCurrency(total)}
          </button>
        </div>
      </div>
    </div>
  `;
  
  const existingModal = document.getElementById('paymentModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', paymentModalHtml);
  
  window.currentPaymentData = { shippingAddress, subtotal, shipping, tax, total };
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.remove();
  }
  window.currentPaymentData = null;
}

function processPayment() {
  if (!window.currentPaymentData) {
    showNotification('Payment data not found', 'error');
    return;
  }
  
  const { shippingAddress, subtotal, shipping, tax, total } = window.currentPaymentData;
  
  const payButton = document.querySelector('#paymentModal .btn-primary');
  if (payButton) {
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    payButton.disabled = true;
  }
  
  setTimeout(() => {
    showThankYouMessage();
    
    setTimeout(() => {
      completeCheckout(shippingAddress, subtotal, shipping, tax, total);
    }, 2500);
  }, 1500);
}

function showThankYouMessage() {
  closePaymentModal();
  
  const thankYouModalHtml = `
    <div id="thankYouModal" class="modal" style="display: flex;">
      <div class="modal-content thank-you-modal">
        <div class="modal-body">
          <div class="thank-you-content">
            <div class="thank-you-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h2>Thank You!</h2>
            <p>Your payment has been processed successfully.</p>
            <p>Your order is being placed...</p>
            <div class="loading-spinner">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', thankYouModalHtml);
}

async function completeCheckout(shippingAddress, subtotal, shipping, tax, total) {
  const cart = getCart();
  const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (!currentUserData.id) {
    showNotification('Please login to place order', 'error');
    window.location.href = 'login.html';
    return;
  }
  
  // Prepare order data for backend
  const orderData = {
    userId: currentUserData.id,
    totalAmount: total,
    status: 'PENDING',
    paymentMethod: 'COD',
    items: cart.map(item => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.image
    })),
    shippingAddress: {
      fullName: shippingAddress.fullName,
      addressLine1: shippingAddress.address,
      addressLine2: shippingAddress.address2 || '',
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      phone: shippingAddress.phone
    }
  };
  
  try {
    showNotification('Placing order...', 'info');
    
    // Save order to backend
    const savedOrder = await ApiService.createOrder(orderData);
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    if (window.pushMCPPurchase) {
      pushMCPPurchase(savedOrder);
    }
    
    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
      thankYouModal.remove();
    }
    
    showNotification('Order placed successfully!', 'success');
    
    setTimeout(() => {
      window.location.href = `orders.html?success=true&orderId=${savedOrder.id}&total=${savedOrder.totalAmount}`;
    }, 1500);
    
  } catch (error) {
    console.error('Order creation failed:', error);
    showNotification('Failed to place order: ' + error.message, 'error');
  }
}

function getEstimatedDelivery() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 4) + 3);
  return deliveryDate.toISOString();
}

async function loadOrdersPage() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('🔍 Loading orders for user:', currentUserData);
    
    // Fetch orders from the backend
    if (currentUserData.id) {
      allOrders = await ApiService.getUserOrders(currentUserData.id);
      console.log('✅ Orders fetched from backend:', allOrders.length);
    } else {
      throw new Error('User not logged in or user ID not found.');
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    showNotification('Could not load orders. Please try again later.', 'error');
    allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  }
  filteredOrders = allOrders;
  
  console.log('✅ Filtered orders for current user:', filteredOrders.length);
  
  renderOrders();
}

function renderOrders() {
  console.log('🎨 Rendering orders, count:', filteredOrders.length);
  const ordersContainer = document.getElementById('ordersList');
  const noOrdersDiv = document.getElementById('noOrders');
  
  if (!ordersContainer) {
    console.error('❌ Orders container not found!');
    return;
  }
  
  if (filteredOrders.length === 0) {
    console.log('📭 No orders to display');
    ordersContainer.innerHTML = '';
    if (noOrdersDiv) noOrdersDiv.style.display = 'block';
    return;
  }
  
  console.log('✅ Displaying', filteredOrders.length, 'orders');
  if (noOrdersDiv) noOrdersDiv.style.display = 'none';
  
  ordersContainer.innerHTML = filteredOrders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .map(order => createOrderHTML(order))
    .join('');
}

function createOrderHTML(order) {
  const orderDate = new Date(order.orderDate).toLocaleDateString();
  const estimatedDelivery = new Date(order.estimatedDelivery).toLocaleDateString();
  const shippingAddress = order.shippingAddress || {}; // Safely handle missing address
  const progressPercentage = getOrderProgress(order.status || 'PENDING');
  
  return `
    <div class="order-card">
      <div class="order-header">
        <div class="order-basic-info">
          <h3>Order ${order.id}</h3>
          <div class="order-meta">
            <span class="order-date"><i class="fas fa-calendar"></i> ${new Date(order.createdAt).toLocaleDateString()}</span>
            <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
          </div>
        </div>
        <div class="order-actions">

          <button class="btn btn-secondary btn-small" onclick="downloadInvoice('${order.id}')">
            <i class="fas fa-download"></i> Invoice
          </button>
        </div>
      </div>
      
      <div class="order-details">
        <div class="order-summary">
          <div class="summary-item">
            <span>Total Amount:</span>
            <strong>${formatCurrency(order.totalAmount)}</strong>
          </div>
          <div class="summary-item">

          </div>
          <div class="summary-item">
            <span>Estimated Delivery:</span>
            <strong>${new Date(order.estimatedDelivery).toLocaleDateString()}</strong>
          </div>
        </div>
        
        <div class="order-progress">
          <div class="progress-header">
            <span>Order Status: ${order.status}</span>
            <span>${progressPercentage}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
          </div>
        </div>
        
        <div class="order-items">
          <h4>Items (${Array.isArray(order.items) ? order.items.length : 0})</h4>
          <div class="items-list">
            ${Array.isArray(order.items) ? order.items.map(item => `
              <div class="order-item">
                <img src="${item.image || '/Bags/placeholder.jpg'}" alt="${item.name}" class="item-image">
                <div class="item-info">
                  <h5>${item.name || 'Unknown Item'}</h5>
                  <p>Color: ${item.color || 'N/A'} | Size: ${item.size || 'N/A'}</p>
                  <p>Qty: ${item.quantity || 0} × ${formatCurrency(item.price)} = ${formatCurrency((item.quantity || 0) * (item.price || 0))}</p>
                </div>
              </div>
            `).join('') : `
              <p class="no-items-info">Item details are not available for this order.</p>
            `}
          </div>
        </div>
        
        <div class="shipping-info">
          <h4><i class="fas fa-map-marker-alt"></i> Shipping Address</h4>
          <div class="address-details">
            <p><strong>${shippingAddress.fullName || 'Address not available'}</strong></p>
            <p>${shippingAddress.addressLine1 || ''}</p>
            ${shippingAddress.addressLine2 ? `<p>${shippingAddress.addressLine2}</p>` : ''}
            <p>${shippingAddress.city || ''}${shippingAddress.state ? `, ${shippingAddress.state}` : ''}${shippingAddress.pincode ? ` - ${shippingAddress.pincode}` : ''}</p>
            <p>${shippingAddress.phone ? `<i class="fas fa-phone"></i> ${shippingAddress.phone}` : ''}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getOrderProgress(status) {
  const progressMap = {
    'PENDING': 10,
    'Confirmed': 25,
    'Processing': 50,
    'Shipped': 75,
    'Delivered': 100,
    'Cancelled': 0
  };
  return progressMap[status] || 0;
}

function downloadInvoice(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;
  
  let invoiceContent = `STYLER - INVOICE\n`;
  invoiceContent += `=====================================\n\n`;
  invoiceContent += `Order ID: ${order.id}\n`;
  invoiceContent += `Order Date: ${new Date(order.orderDate).toLocaleDateString()}\n`;
  invoiceContent += `Customer: ${order.userId}\n`;

  
  invoiceContent += `BILLING & SHIPPING ADDRESS:\n`;
  invoiceContent += `${order.shippingAddress.fullName}\n`;
  invoiceContent += `${order.shippingAddress.address}\n`;
  if (order.shippingAddress.address2) {
    invoiceContent += `${order.shippingAddress.address2}\n`;
  }
  invoiceContent += `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n`;
  invoiceContent += `Phone: ${order.shippingAddress.phone}\n\n`;
  
  invoiceContent += `ITEMS ORDERED:\n`;
  invoiceContent += `=====================================\n`;
  order.items.forEach(item => {
    invoiceContent += `${item.name}\n`;
    invoiceContent += `Color: ${item.color} | Size: ${item.size}\n`;
    invoiceContent += `Quantity: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n\n`;
  });
  
  invoiceContent += `=====================================\n`;
  invoiceContent += `Subtotal: ₹${order.subtotal}\n`;
  invoiceContent += `Shipping: ${order.shipping === 0 ? 'FREE' : '₹' + order.shipping}\n`;
  invoiceContent += `Tax (18% GST): ₹${order.tax}\n`;
  invoiceContent += `=====================================\n`;
  invoiceContent += `TOTAL: ₹${order.total}\n\n`;
  
  invoiceContent += `Payment Method: ${order.paymentMethod}\n`;
  invoiceContent += `Order Status: ${order.status}\n\n`;
  
  invoiceContent += `Thank you for shopping with Styler!\n`;
  invoiceContent += `For support: support@styler.com | +91 98765 43210`;
  
  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Styler_Invoice_${orderId}_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showNotification('Invoice downloaded successfully!', 'success');
}

function showOrderSuccess(orderId, total) {
  const thankYouMessage = document.getElementById('thankYouMessage');
  if (!thankYouMessage) return;
  
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;
  
  // Push purchase event to dataLayer for analytics
  pushMCPPurchase(order);

  document.getElementById('orderIdDisplay').textContent = orderId;
  document.getElementById('orderTotalDisplay').textContent = formatCurrency(parseInt(total));
  document.getElementById('deliveryDateDisplay').textContent = new Date(order.estimatedDelivery).toLocaleDateString();
  
  const shippingDisplay = document.getElementById('shippingAddressDisplay');
  if (shippingDisplay && order.shippingAddress) {
    shippingDisplay.innerHTML = `
      <h4><i class="fas fa-map-marker-alt"></i> Delivery Address</h4>
      <div class="address-card">
        <p><strong>${order.shippingAddress.fullName}</strong></p>
        <p>${order.shippingAddress.address}</p>
        ${order.shippingAddress.address2 ? `<p>${order.shippingAddress.address2}</p>` : ''}
        <p>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
        <p><i class="fas fa-phone"></i> ${order.shippingAddress.phone}</p>
      </div>
    `;
  }
  
  thankYouMessage.style.display = 'block';
  
  const url = new URL(window.location.href);
  url.searchParams.delete('success');
  url.searchParams.delete('orderId');
  url.searchParams.delete('total');
  window.history.replaceState({}, document.title, url);
}

function hideThankYouMessage() {
  const thankYouMessage = document.getElementById('thankYouMessage');
  if (thankYouMessage) {
    thankYouMessage.style.display = 'none';
  }
}

function searchOrders() {
  const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase().trim();
  applyOrderFilters();
}

function filterOrders() {
  applyOrderFilters();
}

function applyOrderFilters() {
  const searchTerm = (document.getElementById('orderSearch')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('statusFilter')?.value || '';
  const dateFilter = document.getElementById('dateFilter')?.value || '';
  
  filteredOrders = [...allOrders];
  
  if (searchTerm) {
    filteredOrders = filteredOrders.filter(order => 
      String(order.id).toLowerCase().includes(searchTerm) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm))
    );
  }
  
  if (statusFilter) {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }
  
  if (dateFilter) {
    const daysAgo = parseInt(dateFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    filteredOrders = filteredOrders.filter(order => 
      new Date(order.orderDate) >= cutoffDate
    );
  }
  
  renderOrders();
}

function clearOrderFilters() {
  if (document.getElementById('orderSearch')) document.getElementById('orderSearch').value = '';
  if (document.getElementById('statusFilter')) document.getElementById('statusFilter').value = '';
  if (document.getElementById('dateFilter')) document.getElementById('dateFilter').value = '';
  
  filteredOrders = [...allOrders];
  renderOrders();
}

function isLoggedIn() {
  const currentUser = localStorage.getItem('currentUser');
  const userEmail = localStorage.getItem('userEmail');
  return !!(currentUser && userEmail);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto remove
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

// Event listeners for modal
document.addEventListener('click', function(e) {
  const modal = document.getElementById('shippingModal');
  if (e.target === modal) {
    closeShippingModal();
  }
});

// Make functions globally available
window.addToCartWithVariant = addToCartWithVariant;
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;
window.cleanupCart = cleanupCart;
window.proceedToCheckout = proceedToCheckout;
window.closeShippingModal = closeShippingModal;
window.setupShippingForm = setupShippingForm;
window.loadCartPage = loadCartPage;
window.loadOrdersPage = loadOrdersPage;
window.showOrderSuccess = showOrderSuccess;
window.hideThankYouMessage = hideThankYouMessage;
window.showPaymentModal = showPaymentModal;
window.closePaymentModal = closePaymentModal;
window.processPayment = processPayment;
window.showThankYouMessage = showThankYouMessage;
window.downloadInvoice = downloadInvoice;
window.searchOrders = searchOrders;
window.filterOrders = filterOrders;
window.clearOrderFilters = clearOrderFilters;