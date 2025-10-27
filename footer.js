document.addEventListener('DOMContentLoaded', function() {
  loadFooter();
});

function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3><i class="fas fa-gem"></i> Styler</h3>
            <p>Your premium destination for quality bags and shoes. We offer carefully curated products that combine style, comfort, and durability.</p>
            <div class="footer-social">
              <a href="#" class="social-link" title="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link" title="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link" title="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link" title="YouTube">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
              <li><a href="bags.html"><i class="fas fa-shopping-bag"></i> Bags</a></li>
              <li><a href="shoes.html"><i class="fas fa-running"></i> Shoes Collection</a></li>
              <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact Us</a></li>
              <li><a href="orders.html"><i class="fas fa-box"></i> My Orders</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Customer Service</h4>
            <ul class="footer-links">
              <li><a href="#" onclick="showShippingInfo()"><i class="fas fa-truck"></i> Shipping Info</a></li>
              <li><a href="#" onclick="showReturnPolicy()"><i class="fas fa-undo"></i> Return Policy</a></li>
              <li><a href="#" onclick="showSizeGuide()"><i class="fas fa-ruler"></i> Size Guide</a></li>
              <li><a href="#" onclick="showFAQ()"><i class="fas fa-question-circle"></i> FAQ</a></li>
              <li><a href="contact.html"><i class="fas fa-headset"></i> Support</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contact Info</h4>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span> 13 Jagatpura, Jaipur, India</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+91 9567934454</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>support@styler.com</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock"></i>
                <span>Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates on new arrivals and exclusive offers.</p>
            <form class="footer-newsletter" onsubmit="subscribeNewsletter(event)">
              <input type="email" placeholder="Your email address" required>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
            <div class="trust-badges">
              <div class="trust-badge">
                <i class="fas fa-shield-alt"></i>
                <span>Secure Payment</span>
              </div>
              <div class="trust-badge">
                <i class="fas fa-truck"></i>
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>&copy; 2025 Styler. All rights reserved. | Designed with <i class="fas fa-heart"></i> in India</p>
            </div>
            <div class="footer-bottom-links">
              <a href="#" onclick="showPrivacyPolicy()">Privacy Policy</a>
              <a href="#" onclick="showTermsOfService()">Terms of Service</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;

  updateCopyrightYear();
}

function subscribeNewsletter(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  
  const subscribers = JSON.parse(localStorage.getItem('newsletter') || '[]');
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('newsletter', JSON.stringify(subscribers));
    showNotification('Successfully subscribed to newsletter!', 'success');
    form.reset();
  } else {
    showNotification('Email already subscribed!', 'info');
  }
}

function showShippingInfo() {
  const info = `
SHIPPING INFORMATION

• Free shipping on orders over ₹1,500
• Standard delivery: 3-5 business days
• Express delivery: 1-2 business days (additional charges)
• Cash on Delivery available
• Secure payment processing

Delivery Areas:
We deliver across India to most pin codes.
Remote areas may have extended delivery times.
  `;
  
  alert(info);
}

function showReturnPolicy() {
  const policy = `
RETURN POLICY

• 30-day return policy for unused items
• Items must be in original packaging
• Free returns for defective products
• Return shipping costs apply for exchanges
• Refunds processed within 7-10 business days

To initiate a return:
1. Contact our support team
2. Receive return authorization
3. Pack items securely
4. Use provided return label
  `;
  
  alert(policy);
}

function showSizeGuide() {
  const guide = `
SIZE GUIDE

SHOES (Indian Sizes):
• Size 7: Foot length 25.5cm
• Size 8: Foot length 26.5cm  
• Size 9: Foot length 27cm
• Size 10: Foot length 27.5cm
• Size 11: Foot length 28cm
• Size 12: Foot length 28.5cm

BAGS:
• Small: Suitable for essentials
• Medium: Everyday use
• Large: Travel and work

For best fit, measure your foot length and refer to our size chart.
  `;
  
  alert(guide);
}

function showFAQ() {
  window.location.href = 'contact.html#faq';
}

function showPrivacyPolicy() {
  const policy = `
PRIVACY POLICY

Styler respects your privacy and is committed to protecting your personal information.

Information We Collect:
• Contact details for order processing
• Shipping addresses for delivery
• Payment information (securely processed)
• Browsing preferences for better experience

How We Use Information:
• Process and fulfill orders
• Provide customer support
• Send order updates and notifications
• Improve our services

We do not sell or share your personal information with third parties except as required for order processing and delivery.
  `;
  
  alert(policy);
}

function showTermsOfService() {
  const terms = `
TERMS OF SERVICE

By using Styler, you agree to these terms:

1. Product Information:
   - We strive for accuracy in all product descriptions
   - Colors may vary due to screen settings
   - Sizes are as per standard measurements

2. Orders and Payment:
   - All orders subject to acceptance
   - Prices include applicable taxes
   - Payment required at time of order

3. Delivery:
   - Delivery times are estimates
   - Risk of loss transfers upon delivery
   - Inspect items upon receipt

4. Returns:
   - 30-day return policy applies
   - Items must be unused and in original packaging
   - Return shipping costs may apply

For complete terms, contact our support team.
  `;
  
  alert(terms);
}

function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll('.copyright p');
  copyrightElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace('2025', currentYear);
  });
}

window.subscribeNewsletter = subscribeNewsletter;
window.showShippingInfo = showShippingInfo;
window.showReturnPolicy = showReturnPolicy;
window.showSizeGuide = showSizeGuide;
window.showFAQ = showFAQ;
window.showPrivacyPolicy = showPrivacyPolicy;
window.showTermsOfService = showTermsOfService;