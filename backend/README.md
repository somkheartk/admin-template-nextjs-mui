# Warehouse Management System - NestJS Backend

A robust, scalable backend API built with NestJS and MongoDB for the Warehouse Management System.

## 🚀 Features

- **RESTful API**: Clean, well-structured REST endpoints
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Authorization**: Role-based access control (RBAC) - Admin, Manager, Staff
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Automatic request validation using class-validator
- **Type Safety**: Full TypeScript support
- **Scalable Architecture**: Modular design following NestJS best practices
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling and validation

## 📋 Prerequisites

- Node.js 18.x or higher
- MongoDB 4.x or higher
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

3. **Build the application**:
```bash
npm run build
```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```
The API will be available at `http://localhost:3001/api`

### Production Mode
```bash
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── decorators/       # Custom decorators (Roles)
│   │   ├── dto/             # Auth DTOs (Login, Register)
│   │   ├── guards/          # Guards (JWT, Roles)
│   │   ├── strategies/      # Passport strategies (JWT)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── users/               # Users module
│   │   ├── dto/             # User DTOs
│   │   ├── schemas/         # User schema
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── products/            # Products module
│   │   ├── dto/             # Product DTOs
│   │   ├── schemas/         # Product schema
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   │
│   ├── orders/              # Orders module
│   │   ├── dto/             # Order DTOs
│   │   ├── schemas/         # Order schema
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   │
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entry point
│
├── dist/                    # Compiled output
├── node_modules/
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── .gitignore
├── nest-cli.json            # Nest CLI configuration
├── package.json
├── tsconfig.json            # TypeScript configuration
├── API.md                   # API documentation
├── SCHEMA.md                # Database schema documentation
└── README.md                # This file
```

## 📚 Documentation

- **[API Documentation](./API.md)**: Detailed API endpoint documentation
- **[Schema Documentation](./SCHEMA.md)**: Database schema and design documentation

## 🔑 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Admin/Manager only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (Admin only)
- `PATCH /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/low-stock` - Get low stock products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin/Manager)
- `PATCH /api/products/:id` - Update product (Admin/Manager)
- `DELETE /api/products/:id` - Delete product (Admin/Manager)
- `PATCH /api/products/:id/stock` - Update stock

### Orders
- `GET /api/orders` - Get all orders (with filters)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id` - Update order (Admin/Manager)
- `DELETE /api/orders/:id` - Delete order (Admin/Manager)
- `POST /api/orders/:id/process` - Process order (updates stock)

## 🔒 Authentication & Authorization

All endpoints (except `/api/auth/*`) require JWT authentication.

Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### User Roles

1. **Admin**: Full access to all resources
2. **Manager**: Manage products and orders, view users
3. **Staff**: View products, create/view orders, update stock

## 🗄️ Database Schema

### Collections

1. **users**
   - email (unique)
   - name
   - password (hashed)
   - role (admin/manager/staff)

2. **products**
   - name
   - sku (unique, uppercase)
   - description
   - category
   - quantity
   - minQuantity
   - unit
   - price
   - location
   - createdBy

3. **orders**
   - orderNumber (unique)
   - type (inbound/outbound)
   - status (pending/processing/completed/cancelled)
   - items (array of products)
   - totalAmount
   - notes
   - createdBy
   - processedBy

See [SCHEMA.md](./SCHEMA.md) for detailed schema documentation.

## 🧪 Testing the API

### Using cURL

**Register a user**:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get products** (with token):
```bash
curl -X GET http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL: `http://localhost:3001/api`
3. For authenticated requests, add token to Authorization header

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/warehouse-admin |
| PORT | Server port | 3001 |
| NODE_ENV | Environment (development/production) | development |
| JWT_SECRET | Secret key for JWT tokens | (required) |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

## 🚢 Deployment

### Docker

1. Create a `Dockerfile`:
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

2. Build and run:
```bash
docker build -t warehouse-backend .
docker run -p 3001:3001 --env-file .env warehouse-backend
```

### Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Configure production `MONGODB_URI`
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting
- [ ] Configure logging and monitoring
- [ ] Set up database backups
- [ ] Configure health checks
- [ ] Set up CI/CD pipeline

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds = 10
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions
- **Input Validation**: Automatic DTO validation
- **CORS Protection**: Configured allowed origins
- **Environment Variables**: Sensitive data in .env

## 🐛 Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

Error response format:
```json
{
  "statusCode": 400,
  "message": ["error details"],
  "error": "Bad Request"
}
```

## 📈 Performance Optimization

- **Database Indexes**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Validation Pipes**: Early request validation
- **Modular Architecture**: Code splitting and lazy loading

## 🤝 Integration with Frontend

The backend is designed to work with the Next.js frontend in the parent directory.

### Frontend Integration Steps:

1. Start the backend server (port 3001)
2. Update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
3. Use the API endpoints from the frontend

See frontend integration examples in [API.md](./API.md).

## 🔄 API Versioning

Current version: v1 (implicit)

Future versions can be added with prefixes:
- `/api/v1/...`
- `/api/v2/...`

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with watch |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |

## 🤝 Contributing

1. Follow NestJS coding standards
2. Write clean, documented code
3. Test all endpoints before committing
4. Update documentation for API changes

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed by [@somkheartk](https://github.com/somkheartk)

## 🙏 Acknowledgments

- NestJS framework
- MongoDB and Mongoose
- Passport.js for authentication
