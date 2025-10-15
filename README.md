# Admin Template Next.js MUI - Warehouse Management System

A modern, feature-rich admin template built with Next.js, Material-UI (MUI), MongoDB, and TypeScript. Designed specifically for warehouse management backoffice systems with multi-role support.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Material-UI
- **Multi-Role Support**: Admin, Manager, and Staff roles with role-based access control (RBAC)
- **Warehouse Management**: 
  - Dashboard with real-time statistics and analytics
  - Inventory management with stock tracking
  - Order management (inbound/outbound)
  - User management with role permissions
  - Reports and analytics with charts
- **Beautiful UI**: Clean, modern design using Material-UI components
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **MongoDB Integration**: Ready for database integration with Mongoose models
- **Authentication Ready**: JWT-based authentication structure in place

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (optional, for full backend functionality)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/somkheartk/admin-template-nextjs-mui.git
cd admin-template-nextjs-mui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/warehouse-admin
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
JWT_SECRET=your-jwt-secret-change-this-in-production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── inventory/         # Inventory management
│   ├── orders/           # Order management
│   ├── users/            # User management
│   ├── reports/          # Reports and analytics
│   └── settings/         # Settings page
├── components/            # React components
│   └── layout/           # Layout components (Header, Sidebar, etc.)
├── lib/                   # Utility functions
│   ├── mongodb.ts        # MongoDB connection
│   ├── auth.ts           # Authentication utilities
│   └── theme.ts          # MUI theme configuration
├── models/               # MongoDB/Mongoose models
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   └── Order.ts          # Order model
├── types/                # TypeScript type definitions
└── middleware/           # Next.js middleware
```

## 👥 User Roles

### Admin
- Full access to all features
- Can manage users, roles, and permissions
- Access to all reports and analytics

### Manager
- Manage inventory and products
- Manage orders (inbound/outbound)
- Can manage staff users
- Access to reports

### Staff
- View and update inventory
- Create and process orders
- Limited access to reports

## 🎨 Key Features

### Dashboard
- Real-time statistics cards
- Recent orders overview
- Low stock alerts
- Trend indicators

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

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v6
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with JWT
- **Charts**: Recharts
- **Styling**: Emotion (MUI's styling solution)

## 📱 Responsive Design

The template is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t warehouse-admin .
docker run -p 3000:3000 warehouse-admin
```

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
