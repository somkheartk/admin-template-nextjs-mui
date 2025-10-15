# Quick Start Guide

## Welcome to the Warehouse Management System!

This guide will help you get started with both the frontend and backend.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.x or higher
- MongoDB 4.x or higher
- npm (comes with Node.js)

## Quick Setup (5 minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/somkheartk/admin-template-nextjs-mui.git
cd admin-template-nextjs-mui
```

### Step 2: Start MongoDB
```bash
# Option 1: Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option 2: Using local MongoDB
mongod
```

### Step 3: Setup Backend
Open a terminal and run:
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Wait for the message: `🚀 Backend server is running on http://localhost:3001/api`

### Step 4: Setup Frontend
Open a **new terminal** and run:
```bash
# From project root
npm install
cp .env.example .env.local
npm run dev
```

Wait for the message: `Local: http://localhost:3000`

### Step 5: Access the Application
Open your browser and go to: http://localhost:3000

## What You've Built

You now have a full-stack warehouse management system with:

✅ **Backend API** (NestJS + MongoDB)
- REST API with full CRUD operations
- JWT authentication
- Role-based access control
- Running on: http://localhost:3001/api

✅ **Frontend** (Next.js + Material-UI)
- Beautiful admin dashboard
- Responsive design
- Complete UI for managing products, orders, and users
- Running on: http://localhost:3000

## Testing the System

### Test the Backend API
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "name": "Admin User",
    "password": "password123"
  }'

# Login (you'll get a token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'

# Use the token to create a product (replace YOUR_TOKEN)
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Laptop",
    "sku": "LAP-001",
    "category": "Electronics",
    "quantity": 50,
    "minQuantity": 10,
    "unit": "pcs",
    "price": 999.99
  }'
```

### Test the Frontend
1. Open http://localhost:3000
2. Navigate through the sidebar menu:
   - **Dashboard**: View statistics
   - **Inventory**: Manage products
   - **Orders**: Create and track orders
   - **Users**: Manage users (Admin only)
   - **Reports**: View analytics

## Project Structure

```
warehouse-management-system/
├── backend/               # NestJS Backend
│   ├── src/
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── products/     # Product management
│   │   └── orders/       # Order management
│   ├── API.md            # API documentation
│   └── SCHEMA.md         # Database schema
│
├── src/                  # Next.js Frontend
│   ├── app/              # Pages
│   ├── components/       # React components
│   └── lib/api/          # API client
│
├── INTEGRATION.md        # Integration guide
├── ARCHITECTURE.md       # System architecture
└── README.md             # Main documentation
```

## Available Commands

### Backend Commands
```bash
cd backend
npm run start:dev    # Development mode
npm run build        # Build for production
npm run start:prod   # Production mode
```

### Frontend Commands
```bash
npm run dev          # Development mode
npm run build        # Build for production
npm run start        # Production mode
npm run lint         # Run linter
```

## Configuration Files

### Backend (.env)
Located at `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
PORT=3001
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
Located at project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
JWT_SECRET=your-secret-key
```

## User Roles

The system supports three user roles:

1. **Admin**
   - Full access to all features
   - Can manage users
   - Can manage products and orders

2. **Manager**
   - Can manage products and orders
   - Can view users
   - Cannot create/delete users

3. **Staff**
   - Can view and update products
   - Can create and view orders
   - Limited access

## Common Issues & Solutions

### Port Already in Use
If port 3000 or 3001 is already in use:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Cannot Connect to MongoDB
Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh mongodb://localhost:27017

# If not, start it
mongod
```

### CORS Errors
Make sure `CORS_ORIGIN` in backend `.env` matches your frontend URL:
```env
CORS_ORIGIN=http://localhost:3000
```

### Authentication Errors
1. Make sure both frontend and backend use the same `JWT_SECRET`
2. Clear browser cache and localStorage
3. Try logging in again

## Next Steps

Now that everything is running, you can:

1. **Read the Documentation**
   - [API Documentation](./backend/API.md) - Learn about all API endpoints
   - [Database Schema](./backend/SCHEMA.md) - Understand the data model
   - [Integration Guide](./INTEGRATION.md) - Frontend-backend integration
   - [Architecture](./ARCHITECTURE.md) - System design overview

2. **Customize the System**
   - Add new features
   - Modify the UI
   - Add more API endpoints
   - Integrate with other services

3. **Deploy to Production**
   - See the deployment section in README.md
   - Configure environment variables
   - Set up monitoring and backups

## API Quick Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/low-stock` - Low stock products
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `POST /api/orders/:id/process` - Process order
- `PATCH /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Users (Admin only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Support & Resources

- **Documentation**: See README.md, INTEGRATION.md, ARCHITECTURE.md
- **API Docs**: backend/API.md
- **Schema**: backend/SCHEMA.md
- **GitHub**: https://github.com/somkheartk/admin-template-nextjs-mui

## Troubleshooting

### Build Errors
```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
```bash
# Reset database
mongosh
> use warehouse-admin
> db.dropDatabase()
```

### Token Expired
If you get 401 errors, your token might have expired (7 days):
1. Log out
2. Log in again to get a new token

## Tips for Development

1. **Use Multiple Terminals**
   - Terminal 1: Backend (`cd backend && npm run start:dev`)
   - Terminal 2: Frontend (`npm run dev`)
   - Terminal 3: MongoDB (`mongod`)

2. **Use API Testing Tools**
   - Postman for testing API endpoints
   - MongoDB Compass for viewing database

3. **Check Logs**
   - Backend logs show API requests
   - Browser console shows frontend errors
   - MongoDB logs show database operations

4. **Hot Reload**
   - Both frontend and backend support hot reload
   - Changes are reflected immediately

## Success Checklist

- [ ] MongoDB is running
- [ ] Backend is running on port 3001
- [ ] Frontend is running on port 3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can view dashboard
- [ ] Can create a product
- [ ] Can create an order

Congratulations! You now have a fully functional warehouse management system! 🎉
