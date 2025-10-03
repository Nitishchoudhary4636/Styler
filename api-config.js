// Frontend-Backend Configuration
const API_CONFIG = {
    // Automatically detect environment - localhost for development, your backend URL for production
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8080' 
        : '', // Empty string means use localStorage-only mode in production
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
    // Enable offline mode for production deployment
    USE_OFFLINE_MODE: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
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
    const isBackendConnected = await ApiService.testConnection();
    if (!isBackendConnected) {
        console.warn('Backend not connected. Running in offline mode.');
        // You can show a notification to users here
    } else {
        console.log('Backend connected successfully!');
    }
});