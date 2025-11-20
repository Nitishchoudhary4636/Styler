<<<<<<< HEAD

let currentShippingAddress = null;

// This should be defined in sript.js, but adding here as a fallback.
const products = window.products || [];
function formatCurrency(amount) {
  const numAmount = parseFloat(amount) || 0;
  return `₹${Math.round(numAmount).toLocaleString('en-IN')}`;
}
let allOrders = [];
let filteredOrders = [];
=======
// checkout.js
// Handles checkout page logic: product rendering, address, shipping, payment, order summary
>>>>>>> parent of b619a43 (feat: Implement cart management and checkout process)

// Product summary rendering
function renderCheckoutProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  let products = window.products || [];
  if (!products.length && localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
  }
  let product = null;
  if (productId) {
    product = products.find(p => p.id === productId);
  }
  if (product) {
    document.getElementById('checkoutProductDisplay').innerHTML = `
      <div class="checkout-product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="checkout-product-details">
          <div class="checkout-product-title">${product.name}</div>
          <div class="checkout-product-desc">${product.description}</div>
          <div class="checkout-product-price">Price: ${formatCurrency(product.price)}</div>
        </div>
      </div>
    `;
  } else {
    document.getElementById('checkoutProductDisplay').innerHTML = '';
  }
}

// Address logic
function getAddress() {
  return JSON.parse(localStorage.getItem('userAddress') || 'null');
}
function setAddress(addr) {
  localStorage.setItem('userAddress', JSON.stringify(addr));
}
function showAddressForm() {
  document.getElementById('addressForm').style.display = 'block';
  document.getElementById('addressDisplay').style.display = 'none';
}
function hideAddressForm() {
  document.getElementById('addressForm').style.display = 'none';
  document.getElementById('addressDisplay').style.display = 'block';
}
function renderAddress() {
  const addr = getAddress();
  const display = document.getElementById('addressDisplay');
  if (!addr) {
    display.innerHTML = '<em>No address saved. Please enter your address.</em>';
    showAddressForm();
    return;
  }
  display.innerHTML = `<strong>${addr.fullName}</strong><br>${addr.address}<br>${addr.city}, ${addr.state} - ${addr.pincode}<br>Phone: ${addr.phone}`;
  hideAddressForm();
}
<<<<<<< HEAD

function showShippingModal() {
  const modal = document.getElementById('shippingModal');
  if (!modal) return;
  
  const savedAddress = JSON.parse(localStorage.getItem('userAddress') || 'null');
  if (savedAddress) {
    document.getElementById('fullName').value = savedAddress.fullName || '';
    document.getElementById('phone').value = savedAddress.phone || '';
    document.getElementById('address').value = savedAddress.address || '';
    document.getElementById('address2').value = savedAddress.address2 || '';
    document.getElementById('city').value = savedAddress.city || '';
    document.getElementById('state').value = savedAddress.state || '';
    document.getElementById('pincode').value = savedAddress.pincode || '';
    document.getElementById('landmark').value = savedAddress.landmark || '';
  }
  
  // modal.style.display = 'flex';
  window.location.href = 'checkout.html';
}

function closeShippingModal() {
  const modal = document.getElementById('shippingModal');
  if (modal) modal.style.display = 'none';
}

function showAddressForm() {
  document.getElementById('addressForm').style.display = 'block';
  document.getElementById('addressDisplay').style.display = 'none';
}

function setupShippingForm() {
  const shippingForm = document.getElementById('shippingForm');
  if (!shippingForm) return;
  
  shippingForm.addEventListener('submit', function(e) {
=======
document.addEventListener('DOMContentLoaded', function() {
  renderCheckoutProduct();
  renderAddress();
  document.getElementById('addressForm').onsubmit = function(e) {
>>>>>>> parent of b619a43 (feat: Implement cart management and checkout process)
    e.preventDefault();
    const addr = {
      fullName: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pincode: document.getElementById('pincode').value
    };
<<<<<<< HEAD
    
    if (!shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    localStorage.setItem('userAddress', JSON.stringify(shippingAddress));
    currentShippingAddress = shippingAddress;
    
    closeShippingModal();
    showPaymentModal(shippingAddress);

    // If on checkout page, update display and hide form
    if (window.location.pathname.includes('checkout.html')) {
      displayAddress(shippingAddress);
    }
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
    
    // Save order to backend - REPLACED WITH LOCALSTORAGE
    // const savedOrder = await ApiService.createOrder(orderData);
    
    // Also save to localStorage as backup
    const localOrder = {
      id: 'ORD-' + Date.now(), // Removed savedOrder.id
      trackingNumber: 'ST' + Math.floor(Math.random() * 900000 + 100000),
      userId: currentUserData.email,
      items: cart.map(item => ({
        name: item.name,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      shippingAddress: shippingAddress,
      status: 'Confirmed',
      orderDate: new Date().toISOString(),
      estimatedDelivery: getEstimatedDelivery(),
      paymentMethod: 'Cash on Delivery'
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(localOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
      thankYouModal.remove();
    }
    
    showNotification('Order placed successfully!', 'success');
    
    setTimeout(() => {
      window.location.href = `orders.html?success=true&orderId=${localOrder.id}&total=${localOrder.total}`;
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
    
    // Try to fetch orders from backend first
    if (currentUserData.id) {
      // REMOVED: Backend fetch logic. We will now only use localStorage.
      console.log('🔄 Using localStorage for orders.');
      allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    } else {
      console.log('⚠️ No user ID found, using localStorage');
      allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  }
  
  // Filter orders for current user (allOrders should already be set from backend or localStorage)
  const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  console.log('🔍 Filtering orders for user:', currentUserData.email);
  console.log('📊 Total orders before filtering:', allOrders.length);
  
  // Filter by user email or ID
  filteredOrders = allOrders.filter(order => 
    order.userId === currentUserData.email || 
    order.userId === currentUserData.id ||
    order.userEmail === currentUserData.email
  );
  
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

function placeOrder() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  if (!paymentMethod) {
    showNotification('Please select a payment method.', 'warning');
    return;
  }

  if (!currentShippingAddress) {
    showNotification('Please save a shipping address.', 'warning');
    return;
  }

  showPaymentModal(currentShippingAddress);
}

function displayAddress(address) {
  const addressDisplay = document.getElementById('addressDisplay');
  const addressForm = document.getElementById('addressForm');
  if (!addressDisplay || !addressForm) return;

  if (address) {
    addressDisplay.innerHTML = `
      <p><strong>${address.fullName}</strong></p>
      <p>${address.address}</p>
      <p>${address.city}, ${address.state} - ${address.pincode}</p>
      <p>Phone: ${address.phone}</p>
    `;
    addressDisplay.style.display = 'block';
    addressForm.style.display = 'none';
    currentShippingAddress = address;
  } else {
    showAddressForm();
  }
}

function setupCheckoutPage() {
  // 1. Load Address
  const savedAddress = JSON.parse(localStorage.getItem('userAddress') || 'null');
  if (savedAddress) {
    // Populate form fields
    document.getElementById('fullName').value = savedAddress.fullName || '';
    document.getElementById('phone').value = savedAddress.phone || '';
    document.getElementById('address').value = savedAddress.address || '';
    document.getElementById('city').value = savedAddress.city || '';
    document.getElementById('state').value = savedAddress.state || '';
    document.getElementById('pincode').value = savedAddress.pincode || '';
    displayAddress(savedAddress);
  } else {
    showAddressForm();
  }

  // 2. Setup Address Form Submission
  const addressForm = document.getElementById('addressForm');
  if (addressForm) {
    addressForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newAddress = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
      };
      localStorage.setItem('userAddress', JSON.stringify(newAddress));
      displayAddress(newAddress);
      showNotification('Address saved!', 'success');
    });
  }

  // 3. Load Order Summary
  const cart = getCart();
  const orderItemsContainer = document.getElementById('orderItems');
  const orderTotalEl = document.getElementById('orderTotal');
  const freeDeliveryMsg = document.getElementById('freeDeliveryMsg');

  if (orderItemsContainer && orderTotalEl) {
    let subtotal = 0;
    orderItemsContainer.innerHTML = cart.map(item => {
      subtotal += item.price * item.quantity;
      return `<div class="summary-item"><span>${item.name} (x${item.quantity})</span> <span>${formatCurrency(item.price * item.quantity)}</span></div>`;
    }).join('');

    const shipping = subtotal >= 1500 ? 0 : 59;
    const total = subtotal + shipping;
    orderTotalEl.textContent = formatCurrency(total);

    if (freeDeliveryMsg) {
        freeDeliveryMsg.textContent = shipping === 0 ? 'You qualify for FREE delivery!' : '';
    }
  }
}


function createOrderHTML(order) {
  const orderDate = new Date(order.orderDate).toLocaleDateString();
  const estimatedDelivery = new Date(order.estimatedDelivery).toLocaleDateString();
  const progressPercentage = getOrderProgress(order.status);
  
  return `
    <div class="order-card">
      <div class="order-header">
        <div class="order-basic-info">
          <h3>Order ${order.id}</h3>
          <div class="order-meta">
            <span class="order-date"><i class="fas fa-calendar"></i> ${orderDate}</span>
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
            <strong>${formatCurrency(order.total)}</strong>
          </div>
          <div class="summary-item">

          </div>
          <div class="summary-item">
            <span>Estimated Delivery:</span>
            <strong>${estimatedDelivery}</strong>
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
          <h4>Items (${order.items.length})</h4>
          <div class="items-list">
            ${order.items.map(item => `
              <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                  <h5>${item.name}</h5>
                  <p>Color: ${item.color} | Size: ${item.size}</p>
                  <p>Qty: ${item.quantity} × ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="shipping-info">
          <h4><i class="fas fa-map-marker-alt"></i> Shipping Address</h4>
          <div class="address-details">
            <p><strong>${order.shippingAddress.fullName}</strong></p>
            <p>${order.shippingAddress.address}</p>
            ${order.shippingAddress.address2 ? `<p>${order.shippingAddress.address2}</p>` : ''}
            <p>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
            <p>Phone: ${order.shippingAddress.phone}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getOrderProgress(status) {
  const progressMap = {
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
      order.id.toLowerCase().includes(searchTerm) ||
      order.trackingNumber.toLowerCase().includes(searchTerm) ||
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

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('checkout.html')) {
    setupCheckoutPage();
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
window.showAddressForm = showAddressForm;
window.placeOrder = placeOrder;
=======
    setAddress(addr);
    renderAddress();
  };
});

// Shipping logic
function getDeliveryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('standardDeliveryDate').textContent = getDeliveryDate(3);
  document.getElementById('expressDeliveryDate').textContent = getDeliveryDate(1);
});

// Order summary logic
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function formatCurrency(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}
function renderOrderSummary() {
  const cart = getCart();
  const itemsDiv = document.getElementById('orderItems');
  let subtotal = 0;
  itemsDiv.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;
    return `<div class="order-item"><img src="${item.image}" alt="${item.name}"><div><div>${item.name}</div><div>Qty: ${item.quantity}</div><div>${formatCurrency(item.price * item.quantity)}</div></div></div>`;
  }).join('');
  let shipping = document.querySelector('input[name="shipping"]:checked').value === 'express' ? 129 : 59;
  if (subtotal >= 1500) shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  document.getElementById('orderTotal').textContent = formatCurrency(total);
  document.getElementById('freeDeliveryMsg').textContent = subtotal >= 1500 ? 'You have FREE DELIVERY!' : `You're ${formatCurrency(1500 - subtotal)} away from FREE DELIVERY`;
}
document.addEventListener('DOMContentLoaded', function() {
  renderOrderSummary();
  document.querySelectorAll('input[name="shipping"]').forEach(el => {
    el.addEventListener('change', renderOrderSummary);
  });
});

// Place order logic
async function placeOrder() {
  const addr = getAddress();
  if (!addr) {
    alert('Please enter your delivery address.');
    showAddressForm();
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    alert('Your cart is empty.');
    window.location.href = 'cart.html';
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let shipping = document.querySelector('input[name="shipping"]:checked').value === 'express' ? 129 : 59;
  if (subtotal >= 1500) shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  // Use the centralized completeCheckout function from cart-manager.js
  await completeCheckout(addr, subtotal, shipping, tax, total);
}

window.placeOrder = placeOrder;
window.showAddressForm = showAddressForm;
>>>>>>> parent of b619a43 (feat: Implement cart management and checkout process)
