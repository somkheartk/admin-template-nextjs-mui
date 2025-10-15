# Admin Template Next.js MUI - Warehouse Management System

A modern, feature-rich full-stack admin template with Next.js frontend and NestJS backend, Material-UI (MUI), MongoDB, and TypeScript. Designed specifically for warehouse management backoffice systems with multi-role support and complete REST API.

## 🚀 Features

- **Modern Full-Stack Architecture**: 
  - Frontend: Next.js 15, React 19, TypeScript, and Material-UI
  - Backend: NestJS with MongoDB/Mongoose
- **Complete REST API**: Full CRUD operations for all entities
- **Multi-Role Support**: Admin, Manager, and Staff roles with role-based access control (RBAC)
- **Dynamic Role Switching**: Users can switch between roles in real-time without re-authentication
- **Warehouse Management**: 
  - Dashboard with real-time statistics and analytics
  - Inventory management with stock tracking
  - Order management (inbound/outbound)
  - User management with role permissions
  - Reports and analytics with charts
- **Beautiful UI**: Clean, modern design using Material-UI components with commercial-grade styling
  - Gradient effects and smooth animations
  - Hover effects and transitions
  - Professional color schemes
  - Responsive cards with shadow effects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **MongoDB Integration**: Full database integration with Mongoose models
- **JWT Authentication**: Secure token-based authentication with automatic refresh on role change
- **Professional CI/CD Pipeline**: Automated testing, building, and deployment for dev, UAT, and production environments
- **Comprehensive Testing**: Unit tests (Jest), E2E tests (Robot Framework with Selenium), and automated security scanning
- **Docker Support**: Full containerization with docker-compose for easy deployment
- **Health Monitoring**: Built-in health check endpoints for application monitoring
- **Comprehensive Documentation**: API docs, schema design, and integration guides
- **Multi-language Support**: English and Thai language support with i18n

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB 4.x or higher

## 🛠️ Installation

### Quick Start (Both Frontend & Backend)

1. Clone the repository:
```bash
git clone https://github.com/somkheartk/admin-template-nextjs-mui.git
cd admin-template-nextjs-mui
```

2. **Start MongoDB**:
```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use your local MongoDB installation
mongod
```

3. **Setup and Start Backend**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run start:dev
```
Backend will run on `http://localhost:3001/api`

4. **Setup and Start Frontend** (in a new terminal):
```bash
# From project root
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```
Frontend will run on `http://localhost:3000`

### Frontend-Only Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Backend-Only Setup

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

## 🌐 Configuration

### Frontend Environment (`.env.local`)
```env
# MongoDB Configuration (for legacy code)
MONGODB_URI=mongodb://localhost:27017/warehouse-admin

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# JWT Secret
JWT_SECRET=your-jwt-secret-change-this-in-production

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend Environment (`backend/.env`)
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
PORT=3001
NODE_ENV=development
JWT_SECRET=your-jwt-secret-change-this-in-production
CORS_ORIGIN=http://localhost:3000
```

## 📁 Project Structure

```
admin-template-nextjs-mui/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── products/       # Products module
│   │   ├── orders/         # Orders module
│   │   ├── app.module.ts   # Root module
│   │   └── main.ts         # Entry point
│   ├── .env.example
│   ├── API.md              # API Documentation
│   ├── SCHEMA.md           # Database Schema
│   └── README.md           # Backend README
│
├── src/                     # Next.js Frontend
│   ├── app/                # Next.js app directory
│   │   ├── dashboard/      # Dashboard page
│   │   ├── inventory/      # Inventory management
│   │   ├── orders/         # Order management
│   │   ├── users/          # User management
│   │   ├── reports/        # Reports and analytics
│   │   └── settings/       # Settings page
│   ├── components/         # React components
│   │   └── layout/         # Layout components
│   ├── lib/                # Utility functions
│   │   ├── api/            # API client
│   │   ├── mongodb.ts      # MongoDB connection
│   │   ├── auth.ts         # Auth utilities
│   │   └── theme.ts        # MUI theme
│   ├── models/             # Mongoose models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   └── types/              # TypeScript types
│
├── INTEGRATION.md          # Integration Guide
├── README.md               # This file
└── package.json
```

## 👥 User Roles

### Admin
- Full access to all features
- Can manage users, roles, and permissions
- Access to all reports and analytics
- Can switch to any role for testing

### Manager
- Manage inventory and products
- Manage orders (inbound/outbound)
- Can manage staff users
- Access to reports
- Can switch roles

### Staff
- View and update inventory
- Create and process orders
- Limited access to reports
- Can view orders

**Note**: All roles support dynamic role switching through the UI without requiring re-authentication.

## 🎨 Key Features

### Dashboard
- Real-time statistics cards with gradient backgrounds
- Smooth hover animations and transitions
- Recent orders overview with interactive table
- Low stock alerts with visual progress indicators
- Trend indicators with color-coded badges
- Professional commercial-grade design

### Role Management
- **Dynamic Role Switching**: Switch between Admin, Manager, and Staff roles instantly
- **Visual Role Indicators**: Color-coded role badges (Admin: Red, Manager: Orange, Staff: Blue)
- **Role Icons**: Distinct icons for each role for better UX
- **Seamless Experience**: No re-login required when switching roles
- **Persistent Sessions**: Role changes update JWT tokens automatically

### Inventory Management
- Product listing with search and filter
- Add/Edit/Delete products
- Stock level tracking
- Low stock alerts
- Category management

### Order Management
- Inbound and outbound order tracking
- Order status management
- Order history
- Search and filter capabilities

### User Management
- User CRUD operations
- Role assignment
- User status management
- Permission overview

### Reports & Analytics
- Inventory movement charts
- Category distribution
- Top products analysis
- Performance metrics

## 🔒 Security

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Environment variable configuration
- Secure MongoDB connection

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v6
- **Language**: TypeScript
- **Charts**: Recharts
- **Styling**: Emotion (MUI's styling solution)

### Backend
- **Framework**: NestJS 11
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **Password Hashing**: bcryptjs

## 📚 Documentation

- **[Complete Feature List](./FEATURES.md)**: Comprehensive list of all features and capabilities
- **[CI/CD Guide](./CI-CD-GUIDE.md)**: Complete CI/CD pipeline and testing documentation
- **[Quick Start Guide](./QUICKSTART.md)**: 5-minute setup guide
- **[Integration Guide](./INTEGRATION.md)**: Complete guide for frontend-backend integration
- **[Backend API Documentation](./backend/API.md)**: Detailed REST API endpoints
- **[Database Schema](./backend/SCHEMA.md)**: MongoDB schema design and relationships
- **[Backend README](./backend/README.md)**: Backend-specific documentation
- **[Architecture Guide](./ARCHITECTURE.md)**: System architecture and design

## 📱 Responsive Design

The template is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Local Development with Docker Compose
```bash
# Start all services (frontend, backend, MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services will be available at:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001/api
- **MongoDB:** localhost:27017

#### Production Docker Deployment
See [CI-CD-GUIDE.md](./CI-CD-GUIDE.md) for production deployment instructions.

### Frontend Deployment (Vercel)
```bash
npm run build
vercel deploy
```

### Backend Deployment

#### Using Docker
```bash
cd backend
docker build -t warehouse-backend .
docker run -p 3001:3001 --env-file .env warehouse-backend
```

#### Using PM2
```bash
cd backend
npm run build
pm2 start dist/main.js --name warehouse-backend
```

### CI/CD Pipeline

This project includes professional CI/CD workflows for automated testing and deployment to multiple environments:

- **Development (dev)**: Auto-deploy from `develop` branch
- **UAT**: Auto-deploy from `uat` branch
- **Production**: Tag-based deployment (v*.*.*)

**Workflows:**
- Continuous Integration (linting, testing, building)
- Automated security scanning
- Environment-specific deployments
- Docker image building and publishing

See [CI-CD-GUIDE.md](./CI-CD-GUIDE.md) for detailed CI/CD documentation.

## 🧪 Testing

### Unit Tests

#### Frontend Tests
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

#### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:cov         # With coverage report
```

### End-to-End Tests
```bash
# Install Python dependencies first
pip install -r requirements.txt

# Run E2E tests with Robot Framework
npm run test:e2e         # Run E2E tests
npm run test:e2e:report  # Generate consolidated report

# View test results
# Open test-results/report.html in a browser
```

### Test Backend API Manually
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get products (replace TOKEN with actual JWT)
curl http://localhost:3001/api/products \
  -H "Authorization: Bearer TOKEN"
```

### Test Frontend Integration
1. Start both backend and frontend
2. Navigate to `http://localhost:3000`
3. Register/login through the UI
4. Test CRUD operations on products and orders

## 🔑 API Quick Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/switch-role` - Switch user role (returns new JWT token)

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `POST /api/orders/:id/process` - Process order (updates stock)

See [backend/API.md](./backend/API.md) for complete API documentation.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed by [@somkheartk](https://github.com/somkheartk)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Material-UI team for the beautiful components
- All contributors and users of this template
