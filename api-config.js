// Render Backend Configuration - Clean and Simple
window.FORCE_RENDER_BACKEND = true;

// Frontend-Backend Configuration for Render Deployment
const API_CONFIG = {
    // Automatically detect environment and set backend URL
    BASE_URL: (() => {
        // OVERRIDE: Always use Render in production
        if (window.FORCE_RENDER_BACKEND && window.location.hostname !== 'localhost') {
            return 'https://styler-backend-4upl.onrender.com';
        }
        
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8080';
        }
        
        // Production - Render backend with PostgreSQL
        return window.BACKEND_URL || 'https://styler-backend-4upl.onrender.com';
    })(),
    ENDPOINTS: {
        USERS: '/api/users',
        ORDERS: '/api/orders',
        LOGIN: '/api/users/login',
        REGISTER: '/api/users/register',
        FORGOT_PASSWORD: '/api/users/forgot-password',
        RESET_PASSWORD: '/api/users/reset-password',
        USER_ORDERS: '/api/orders/user'
    },
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    // Production mode detection
    IS_PRODUCTION: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
    // Fallback to localStorage if backend is unavailable
    USE_OFFLINE_FALLBACK: true
};

// API Helper Functions
class ApiService {
    // User Authentication
    static async loginUser(email, password) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            
            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.message || 'Login failed');
            }
            
            return data; // Return the full response which includes user data
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // User Registration
    static async registerUser(userData) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            
            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.message || 'Registration failed');
            }
            
            return data; // Return the full response which includes user data
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Create Order
    static async createOrder(orderData) {
        try {
                console.groupCollapsed('🧾 createOrder payload');
                console.log(orderData);
                console.groupEnd();
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(orderData)
            });
            
            if (!response.ok) {
                    let errorBody = 'Unknown response';
                    try {
                        errorBody = await response.json();
                    } catch (parseError) {
                        errorBody = await response.text();
                    }
                    console.error('🛑 Order creation response:', response.status, errorBody);
                    const message = errorBody?.message || errorBody || 'Order creation failed';
                    throw new Error(message);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Order creation error:', error);
            throw error;
        }
    }

    // Get User Orders
    static async getUserOrders(userId) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_ORDERS}/${userId}`, {
                method: 'GET',
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Fetch orders error:', error);
            throw error;
        }
    }

    // Forgot Password - Request Reset Token
    static async forgotPassword(email) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORGOT_PASSWORD}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send password reset request');
            }
            
            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.message || 'Failed to send password reset request');
            }
            
            return data; // Returns success message and reset token (for demo)
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }

    // Reset Password - Use Reset Token
    static async resetPassword(email, resetToken, newPassword) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESET_PASSWORD}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ email, resetToken, newPassword })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to reset password');
            }
            
            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.message || 'Failed to reset password');
            }
            
            return data; // Returns success message
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    }

    // Test Backend Connection
    static async testConnection() {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/health`);
            return response.ok;
        } catch (error) {
            console.error('Backend connection test failed:', error);
            return false;
        }
    }
}

// Initialize API connection check
document.addEventListener('DOMContentLoaded', async () => {
    // Debug logging
    console.log('🔧 API Configuration Debug:');
    console.log('Current hostname:', window.location.hostname);
    console.log('Backend URL:', API_CONFIG.BASE_URL);
    console.log('Registration endpoint:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);
    
    const isBackendConnected = await ApiService.testConnection();
    if (!isBackendConnected) {
        console.warn('❌ Backend not connected. Running in offline mode.');
        // You can show a notification to users here
    } else {
        console.log('✅ Backend connected successfully!');
    }
});