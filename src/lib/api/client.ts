// API Client for Warehouse Management System Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode?: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Try to load token from localStorage on client-side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || 'An error occurred',
          statusCode: response.status,
        };
      }

      return { data, statusCode: response.status };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 500,
      };
    }
  }

  // Authentication
  async register(email: string, name: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    });
  }

  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  logout() {
    this.clearToken();
  }

  // Users
  async getUsers() {
    return this.request('/users', { method: 'GET' });
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`, { method: 'GET' });
  }

  async createUser(userData: {
    email: string;
    name: string;
    password: string;
    role?: string;
  }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: Partial<{
    email: string;
    name: string;
    password: string;
    role: string;
  }>) {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, { method: 'DELETE' });
  }

  // Products
  async getProducts() {
    return this.request('/products', { method: 'GET' });
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`, { method: 'GET' });
  }

  async getLowStockProducts() {
    return this.request('/products/low-stock', { method: 'GET' });
  }

  async createProduct(productData: {
    name: string;
    sku: string;
    description?: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
    price: number;
    location?: string;
    createdBy?: string;
  }) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: Partial<{
    name: string;
    sku: string;
    description: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
    price: number;
    location: string;
  }>) {
    return this.request(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, { method: 'DELETE' });
  }

  async updateProductStock(id: string, quantity: number) {
    return this.request(`/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  }

  // Orders
  async getOrders(filters?: { type?: string; status?: string }) {
    const params = new URLSearchParams(filters as Record<string, string>);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/orders${query}`, { method: 'GET' });
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`, { method: 'GET' });
  }

  async createOrder(orderData: {
    orderNumber: string;
    type: 'inbound' | 'outbound';
    status?: string;
    items: Array<{
      productId: string;
      productName: string;
      sku: string;
      quantity: number;
      price: number;
    }>;
    totalAmount?: number;
    notes?: string;
    createdBy?: string;
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(id: string, orderData: Partial<{
    status: string;
    items: Array<{
      productId: string;
      productName: string;
      sku: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
    notes: string;
    processedBy: string;
  }>) {
    return this.request(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id: string) {
    return this.request(`/orders/${id}`, { method: 'DELETE' });
  }

  async processOrder(id: string, processedBy: string) {
    return this.request(`/orders/${id}/process`, {
      method: 'POST',
      body: JSON.stringify({ processedBy }),
    });
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;
