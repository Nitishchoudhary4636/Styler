// checkout.js
// Handles checkout page logic: product rendering, address, shipping, payment, order summary

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
document.addEventListener('DOMContentLoaded', function() {
  renderCheckoutProduct();
  renderAddress();
  document.getElementById('addressForm').onsubmit = function(e) {
    e.preventDefault();
    const addr = {
      fullName: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pincode: document.getElementById('pincode').value
    };
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
