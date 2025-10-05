// Frontend-Backend Configuration
const API_CONFIG = {
    // Automatically detect environment and set backend URL
    BASE_URL: (() => {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8080';
        }
        
        // Production - connected to Render backend
        return window.BACKEND_URL || 'https://styler-backend.onrender.com';
    })(),
    ENDPOINTS: {
        USERS: '/users',
        ORDERS: '/orders',
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        FORGOT_PASSWORD: '/users/forgot-password',
        RESET_PASSWORD: '/users/reset-password',
        USER_ORDERS: '/orders/user'
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
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(orderData)
            });
            
            if (!response.ok) {
                throw new Error('Order creation failed');
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