# Frontend-Backend Integration Guide

This guide explains how to integrate the Next.js frontend with the NestJS backend.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Next.js Frontend                   │
│                    (Port 3000)                          │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                 │
│  │   UI Pages   │    │ API Client   │                 │
│  └──────┬───────┘    └──────┬───────┘                 │
│         │                    │                          │
└─────────┼────────────────────┼──────────────────────────┘
          │                    │
          │              HTTP Requests
          │              (JWT Token)
          │                    │
          ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                    NestJS Backend                       │
│                    (Port 3001)                          │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                 │
│  │ Controllers  │◄───┤   Guards     │                 │
│  └──────┬───────┘    └──────────────┘                 │
│         │                                               │
│  ┌──────▼───────┐    ┌──────────────┐                 │
│  │   Services   │◄───┤   Schemas    │                 │
│  └──────┬───────┘    └──────────────┘                 │
└─────────┼──────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│                     MongoDB                             │
│              warehouse-admin database                   │
└─────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Backend Setup

1. **Start MongoDB**:
```bash
# Using MongoDB installed locally
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. **Configure Backend Environment**:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

3. **Install Backend Dependencies**:
```bash
cd backend
npm install
```

4. **Start Backend Server**:
```bash
# Development mode with hot reload
npm run start:dev

# Or build and run
npm run build
npm run start:prod
```

Backend will be available at: `http://localhost:3001/api`

### 2. Frontend Setup

1. **Configure Frontend Environment**:
```bash
# In project root
cp .env.example .env.local
```

Edit `.env.local`:
```env
# MongoDB Configuration (for legacy code)
MONGODB_URI=mongodb://localhost:27017/warehouse-admin

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# JWT Secret
JWT_SECRET=your-super-secret-key-change-in-production

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

2. **Install Frontend Dependencies** (if not already done):
```bash
npm install
```

3. **Start Frontend Server**:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Using the API Client

### 1. Import the API Client

```typescript
import apiClient from '@/lib/api/client';
```

### 2. Authentication

#### Register a New User
```typescript
const response = await apiClient.register(
  'user@example.com',
  'John Doe',
  'password123'
);

if (response.data) {
  console.log('User registered:', response.data.user);
  console.log('Token:', response.data.token);
  // Token is automatically stored
} else {
  console.error('Error:', response.error);
}
```

#### Login
```typescript
const response = await apiClient.login(
  'user@example.com',
  'password123'
);

if (response.data) {
  console.log('Logged in:', response.data.user);
  // Token is automatically stored and will be used for subsequent requests
} else {
  console.error('Login failed:', response.error);
}
```

#### Logout
```typescript
apiClient.logout();
// This clears the token from memory and localStorage
```

### 3. Working with Products

#### Get All Products
```typescript
const response = await apiClient.getProducts();

if (response.data) {
  const products = response.data;
  console.log('Products:', products);
} else {
  console.error('Error:', response.error);
}
```

#### Create a Product
```typescript
const response = await apiClient.createProduct({
  name: 'Laptop Dell XPS 15',
  sku: 'LAPTOP-DELL-XPS15',
  description: '15-inch laptop',
  category: 'Electronics',
  quantity: 25,
  minQuantity: 10,
  unit: 'pcs',
  price: 1299.99,
  location: 'Warehouse A',
});

if (response.data) {
  console.log('Product created:', response.data);
} else {
  console.error('Error:', response.error);
}
```

#### Update Product Stock
```typescript
const response = await apiClient.updateProductStock(
  'product-id',
  10 // Add 10 units (use negative number to subtract)
);
```

#### Get Low Stock Products
```typescript
const response = await apiClient.getLowStockProducts();
```

### 4. Role Switching

The system supports dynamic role switching without re-authentication:

#### Switch Role
```typescript
const response = await apiClient.switchRole('manager');

if (response.data) {
  console.log('Role switched successfully');
  console.log('New user data:', response.data.user);
  console.log('New token:', response.data.token);
  // Token is automatically updated in the client
  // Refresh the page or update UI to reflect new permissions
  window.location.reload();
} else {
  console.error('Error switching role:', response.error);
}
```

**Available Roles:**
- `admin` - Full system access
- `manager` - Manage inventory and orders
- `staff` - Limited access

**Note:** The `switchRole` method automatically:
1. Sends the role change request to the backend
2. Updates the stored JWT token with the new role
3. Returns the updated user data and new token

### 5. Working with Orders

#### Get All Orders
```typescript
const response = await apiClient.getOrders();
```

#### Filter Orders
```typescript
// Get inbound orders
const response = await apiClient.getOrders({ type: 'inbound' });

// Get pending orders
const response = await apiClient.getOrders({ status: 'pending' });
```

#### Create an Order
```typescript
const response = await apiClient.createOrder({
  orderNumber: 'ORD-20240101-001',
  type: 'inbound',
  items: [
    {
      productId: 'product-id-here',
      productName: 'Laptop Dell XPS 15',
      sku: 'LAPTOP-DELL-XPS15',
      quantity: 10,
      price: 1299.99,
    }
  ],
  notes: 'Shipment from supplier',
  createdBy: 'user-id-here',
});
```

#### Process an Order
```typescript
// This will update product stock automatically
const response = await apiClient.processOrder(
  'order-id',
  'user-id-who-processed'
);
```

### 5. Working with Users

#### Get All Users (Admin/Manager only)
```typescript
const response = await apiClient.getUsers();
```

#### Create a User (Admin only)
```typescript
const response = await apiClient.createUser({
  email: 'newuser@example.com',
  name: 'New User',
  password: 'password123',
  role: 'staff', // 'admin', 'manager', or 'staff'
});
```

## Example: Complete Login Flow in a React Component

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await apiClient.login(email, password);

    if (response.data) {
      // Redirect to dashboard on success
      router.push('/dashboard');
    } else {
      setError(response.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Example: Fetching Products

```typescript
'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api/client';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiClient.getProducts();
      
      if (response.data) {
        setProducts(response.data);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
      
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      {products.map((product: any) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>SKU: {product.sku}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

The API client returns responses in a consistent format:

### Success Response
```typescript
{
  data: {...}, // The actual data
  statusCode: 200
}
```

### Error Response
```typescript
{
  error: "Error message",
  statusCode: 400 // HTTP status code
}
```

### Always Check for Errors
```typescript
const response = await apiClient.getProducts();

if (response.error) {
  // Handle error
  if (response.statusCode === 401) {
    // Unauthorized - redirect to login
    router.push('/login');
  } else if (response.statusCode === 403) {
    // Forbidden - insufficient permissions
    alert('You do not have permission to perform this action');
  } else {
    // Other errors
    alert(response.error);
  }
} else {
  // Handle success
  const products = response.data;
}
```

## Authentication Flow

1. **User logs in** → Backend validates credentials → Returns JWT token
2. **Token is stored** in localStorage and memory
3. **All subsequent requests** include the token in Authorization header
4. **Backend validates token** on each protected endpoint
5. **Token expires** after 7 days → User needs to login again

## Role-Based Access Control

Different user roles have different permissions:

### Admin
- All endpoints accessible
- Can manage users, products, and orders

### Manager
- Cannot create/delete users
- Can manage products and orders
- Can view users

### Staff
- Cannot manage users
- Can view products and orders
- Can create orders and update stock
- Limited access to certain endpoints

The backend enforces these permissions automatically. If a user tries to access an endpoint they don't have permission for, they'll receive a 403 Forbidden error.

## Testing the Integration

### 1. Test Backend Directly
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get products (replace TOKEN with actual token)
curl http://localhost:3001/api/products \
  -H "Authorization: Bearer TOKEN"
```

### 2. Test from Frontend
Create a test page at `src/app/test-api/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import apiClient from '@/lib/api/client';

export default function TestApiPage() {
  const [result, setResult] = useState('');

  const testLogin = async () => {
    const response = await apiClient.login('test@example.com', 'password123');
    setResult(JSON.stringify(response, null, 2));
  };

  const testProducts = async () => {
    const response = await apiClient.getProducts();
    setResult(JSON.stringify(response, null, 2));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Page</h1>
      <button onClick={testLogin}>Test Login</button>
      <button onClick={testProducts}>Test Get Products</button>
      <pre>{result}</pre>
    </div>
  );
}
```

## Troubleshooting

### CORS Issues
If you see CORS errors:
1. Make sure backend `CORS_ORIGIN` in `.env` matches frontend URL
2. Restart backend after changing `.env`

### Authentication Issues
If you get 401 Unauthorized:
1. Check if token is present: `console.log(apiClient['token'])`
2. Try logging in again
3. Check token expiration (7 days)

### Connection Refused
If backend is not reachable:
1. Ensure backend is running: `curl http://localhost:3001/api`
2. Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
3. Verify port numbers

### Database Connection Issues
If backend can't connect to MongoDB:
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in backend `.env`
3. Test connection: `mongosh mongodb://localhost:27017/warehouse-admin`

## Next Steps

1. **Implement Authentication Context**: Create a React Context to manage user state across the app
2. **Add Protected Routes**: Wrap pages that require authentication
3. **Implement Real Data Fetching**: Replace mock data in existing pages with API calls
4. **Add Loading States**: Show spinners while fetching data
5. **Add Error Boundaries**: Handle errors gracefully
6. **Implement Pagination**: For large datasets
7. **Add Search & Filters**: Enhance user experience
8. **Optimize Performance**: Use React Query or SWR for caching

## Additional Resources

- Backend API Documentation: `backend/API.md`
- Database Schema: `backend/SCHEMA.md`
- Backend README: `backend/README.md`
- NestJS Documentation: https://docs.nestjs.com/
- Next.js Documentation: https://nextjs.org/docs
