# Backend API Documentation

## Overview

This is the NestJS backend API for the Warehouse Management System. It provides RESTful endpoints for managing users, products, and orders with JWT authentication and role-based access control.

## Technology Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator & class-transformer
- **Password Hashing**: bcryptjs

## Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- MongoDB 4.x or higher

### Installation Steps

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

5. Build the application:
```bash
npm run build
```

6. Start the server:
```bash
# Development mode with watch
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3001/api`

## API Endpoints

All endpoints (except authentication) require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Authentication Endpoints

#### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```
- **Success Response**: 
  - **Code**: 201
  - **Content**:
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "staff",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Success Response**: Same as Register

### User Endpoints

#### Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of user objects

#### Get User by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager
- **Success Response**: User object

#### Create User
- **URL**: `/api/users`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: Admin
- **Body**:
```json
{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "password": "password123",
  "role": "staff"
}
```

#### Update User
- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Roles**: Admin
- **Body**: Any user fields to update

#### Delete User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: Admin

### Product Endpoints

#### Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Success Response**: Array of product objects

#### Get Low Stock Products
- **URL**: `/api/products/low-stock`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Success Response**: Array of products with quantity <= minQuantity

#### Get Product by ID
- **URL**: `/api/products/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Success Response**: Product object

#### Create Product
- **URL**: `/api/products`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: Admin, Manager
- **Body**:
```json
{
  "name": "Product Name",
  "sku": "PROD-001",
  "description": "Product description",
  "category": "Electronics",
  "quantity": 100,
  "minQuantity": 10,
  "unit": "pcs",
  "price": 99.99,
  "location": "Warehouse A",
  "createdBy": "user-id"
}
```

#### Update Product
- **URL**: `/api/products/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Roles**: Admin, Manager
- **Body**: Any product fields to update

#### Delete Product
- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: Admin, Manager

#### Update Product Stock
- **URL**: `/api/products/:id/stock`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Body**:
```json
{
  "quantity": 10
}
```
- **Note**: This adds/subtracts from current stock

### Order Endpoints

#### Get All Orders
- **URL**: `/api/orders`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Query Parameters**:
  - `type`: Filter by order type (inbound/outbound)
  - `status`: Filter by status (pending/processing/completed/cancelled)
- **Success Response**: Array of order objects

#### Get Order by ID
- **URL**: `/api/orders/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Success Response**: Order object

#### Create Order
- **URL**: `/api/orders`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Body**:
```json
{
  "orderNumber": "ORD-20240101-001",
  "type": "inbound",
  "status": "pending",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "productName": "Product Name",
      "sku": "PROD-001",
      "quantity": 10,
      "price": 99.99
    }
  ],
  "notes": "Order notes",
  "createdBy": "user-id"
}
```

#### Update Order
- **URL**: `/api/orders/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Roles**: Admin, Manager
- **Body**: Any order fields to update

#### Delete Order
- **URL**: `/api/orders/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: Admin, Manager

#### Process Order
- **URL**: `/api/orders/:id/process`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: Admin, Manager, Staff
- **Body**:
```json
{
  "processedBy": "user-id"
}
```
- **Note**: This updates product stock based on order type and marks order as completed

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Validation error messages"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Resource already exists",
  "error": "Conflict"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## User Roles & Permissions

### Admin
- Full access to all endpoints
- Can manage users, products, and orders
- Can delete resources

### Manager
- Can view all users
- Can manage products (CRUD)
- Can manage orders (CRUD)
- Cannot create/delete users

### Staff
- Can view products
- Can create and view orders
- Can update product stock
- Can process orders
- Limited permissions

## Development

### Project Structure
```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── decorators/    # Custom decorators
│   │   ├── dto/           # Data transfer objects
│   │   ├── guards/        # Auth guards
│   │   └── strategies/    # Passport strategies
│   ├── users/             # Users module
│   │   ├── dto/
│   │   └── schemas/       # Mongoose schemas
│   ├── products/          # Products module
│   │   ├── dto/
│   │   └── schemas/
│   ├── orders/            # Orders module
│   │   ├── dto/
│   │   └── schemas/
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── dist/                  # Compiled output
├── node_modules/
├── .env                   # Environment variables
├── .env.example           # Environment template
├── nest-cli.json          # Nest CLI configuration
├── package.json
└── tsconfig.json          # TypeScript configuration
```

### Testing

To test the API, you can use tools like:
- **Postman**: Import the endpoints and test
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension

Example cURL request:
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all products (with token)
curl -X GET http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` file to version control
2. **JWT Secret**: Use a strong, random secret in production
3. **Password Hashing**: Passwords are hashed using bcryptjs with salt rounds = 10
4. **CORS**: Configure CORS_ORIGIN to match your frontend URL
5. **Validation**: All inputs are validated using class-validator
6. **Role-Based Access**: Endpoints are protected by JWT and role guards

## Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure production MongoDB URI
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure proper CORS settings
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up database backups

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

Build and run:
```bash
docker build -t warehouse-backend .
docker run -p 3001:3001 warehouse-backend
```
