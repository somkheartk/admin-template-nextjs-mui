# System Architecture & Design Documentation

## Overview

This document provides a comprehensive overview of the Warehouse Management System architecture, including frontend, backend, database design, and integration patterns.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│  │ Desktop  │   │  Tablet  │   │  Mobile  │   │   API    │   │
│  │ Browser  │   │ Browser  │   │ Browser  │   │  Client  │   │
│  └─────┬────┘   └─────┬────┘   └─────┬────┘   └─────┬────┘   │
│        │              │              │              │          │
└────────┼──────────────┼──────────────┼──────────────┼──────────┘
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                          HTTPS
                            │
┌───────────────────────────┼─────────────────────────────────────┐
│                           ▼                                     │
│                 Next.js Frontend (Port 3000)                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Presentation Layer                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │   Pages  │  │Components│  │  Layouts │             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Business Layer                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │API Client│  │  Hooks   │  │  Utils   │             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                      HTTP REST API
                      (JSON + JWT)
                            │
┌───────────────────────────┼─────────────────────────────────────┐
│                           ▼                                     │
│                NestJS Backend (Port 3001)                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   API Layer                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │Controllers│  │  Guards  │  │Middleware│             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Business Logic Layer                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │ Services │  │    DTOs  │  │Validators│             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Data Access Layer                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │  Schemas │  │Repositories│ │   ODM    │             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                      Mongoose ODM
                            │
┌───────────────────────────┼─────────────────────────────────────┐
│                           ▼                                     │
│                    MongoDB Database                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │    users     │  │   products   │  │    orders    │        │
│  │  collection  │  │  collection  │  │  collection  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture (Next.js)

```
┌────────────────────────────────────────────────────────┐
│                    Next.js App                         │
├────────────────────────────────────────────────────────┤
│                                                        │
│  App Router (src/app/)                                │
│  ┌──────────────────────────────────────────────┐    │
│  │  /dashboard    - Main dashboard              │    │
│  │  /inventory    - Product management          │    │
│  │  /orders       - Order management            │    │
│  │  /users        - User management             │    │
│  │  /reports      - Analytics & reports         │    │
│  │  /settings     - Application settings        │    │
│  └──────────────────────────────────────────────┘    │
│                        │                              │
│  Components (src/components/)                         │
│  ┌──────────────────────────────────────────────┐    │
│  │  Layout/     - Header, Sidebar, Footer       │    │
│  │  UI/         - Reusable UI components        │    │
│  │  Forms/      - Form components               │    │
│  │  Charts/     - Data visualization            │    │
│  └──────────────────────────────────────────────┘    │
│                        │                              │
│  State Management                                     │
│  ┌──────────────────────────────────────────────┐    │
│  │  React Context API                           │    │
│  │  - AuthContext                               │    │
│  │  - ThemeContext                              │    │
│  │  Local State (useState, useReducer)          │    │
│  └──────────────────────────────────────────────┘    │
│                        │                              │
│  API Integration (src/lib/api/)                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  ApiClient                                   │    │
│  │  - Authentication methods                    │    │
│  │  - Resource CRUD operations                  │    │
│  │  - Token management                          │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Backend Architecture (NestJS)

```
┌────────────────────────────────────────────────────────┐
│                   NestJS Application                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Main Module (AppModule)                              │
│  ┌──────────────────────────────────────────────┐    │
│  │  ConfigModule    - Environment config        │    │
│  │  MongooseModule  - Database connection       │    │
│  │  AuthModule      - Authentication            │    │
│  │  UsersModule     - User management           │    │
│  │  ProductsModule  - Product management        │    │
│  │  OrdersModule    - Order management          │    │
│  └──────────────────────────────────────────────┘    │
│                        │                              │
│  Module Pattern (Each module contains)               │
│  ┌──────────────────────────────────────────────┐    │
│  │  Controller                                  │    │
│  │  ├─ Handles HTTP requests                    │    │
│  │  ├─ Route definitions                        │    │
│  │  └─ Request/Response transformation          │    │
│  │                                               │    │
│  │  Service                                     │    │
│  │  ├─ Business logic                           │    │
│  │  ├─ Data validation                          │    │
│  │  └─ Database operations                      │    │
│  │                                               │    │
│  │  DTOs (Data Transfer Objects)                │    │
│  │  ├─ Request validation                       │    │
│  │  ├─ Type safety                              │    │
│  │  └─ Documentation                            │    │
│  │                                               │    │
│  │  Schemas                                     │    │
│  │  ├─ Database models                          │    │
│  │  ├─ Schema definitions                       │    │
│  │  └─ Indexes & relationships                  │    │
│  └──────────────────────────────────────────────┘    │
│                        │                              │
│  Cross-Cutting Concerns                              │
│  ┌──────────────────────────────────────────────┐    │
│  │  Guards                                      │    │
│  │  ├─ JwtAuthGuard   - Authentication          │    │
│  │  └─ RolesGuard     - Authorization           │    │
│  │                                               │    │
│  │  Interceptors                                │    │
│  │  ├─ Logging                                  │    │
│  │  └─ Transformation                           │    │
│  │                                               │    │
│  │  Filters                                     │    │
│  │  └─ Exception handling                       │    │
│  │                                               │    │
│  │  Pipes                                       │    │
│  │  └─ Validation (class-validator)             │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│  Client  │       │ Frontend │       │  Backend │       │   DB     │
└────┬─────┘       └────┬─────┘       └────┬─────┘       └────┬─────┘
     │                  │                   │                   │
     │ 1. Login Form    │                   │                   │
     ├─────────────────>│                   │                   │
     │                  │ 2. POST /auth/login                   │
     │                  ├──────────────────>│                   │
     │                  │                   │ 3. Find user      │
     │                  │                   ├──────────────────>│
     │                  │                   │ 4. User data      │
     │                  │                   │<──────────────────┤
     │                  │                   │ 5. Verify password│
     │                  │                   │ 6. Generate JWT   │
     │                  │ 7. Return token   │                   │
     │                  │<──────────────────┤                   │
     │ 8. Store token   │                   │                   │
     │<─────────────────┤                   │                   │
     │                  │                   │                   │
     │ 9. Subsequent    │                   │                   │
     │    Requests      │ 10. With Bearer   │                   │
     ├─────────────────>│    Token          │                   │
     │                  ├──────────────────>│ 11. Verify JWT    │
     │                  │                   │ 12. Execute       │
     │                  │ 13. Response      │                   │
     │<─────────────────┤<──────────────────┤                   │
     │                  │                   │                   │
```

### CRUD Operation Flow (Example: Create Product)

```
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│  Client  │       │ Frontend │       │  Backend │       │   DB     │
└────┬─────┘       └────┬─────┘       └────┬─────┘       └────┬─────┘
     │                  │                   │                   │
     │ 1. Fill Form     │                   │                   │
     ├─────────────────>│                   │                   │
     │                  │ 2. POST /products │                   │
     │                  │    + JWT Token    │                   │
     │                  ├──────────────────>│                   │
     │                  │                   │ 3. Verify JWT     │
     │                  │                   │ 4. Check Role     │
     │                  │                   │ 5. Validate DTO   │
     │                  │                   │ 6. Check SKU      │
     │                  │                   ├──────────────────>│
     │                  │                   │ 7. SKU exists?    │
     │                  │                   │<──────────────────┤
     │                  │                   │ 8. Create product │
     │                  │                   ├──────────────────>│
     │                  │                   │ 9. Return doc     │
     │                  │                   │<──────────────────┤
     │                  │ 10. Return product│                   │
     │                  │<──────────────────┤                   │
     │ 11. Update UI    │                   │                   │
     │<─────────────────┤                   │                   │
     │                  │                   │                   │
```

### Order Processing Flow

```
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│  Client  │       │ Frontend │       │  Backend │       │   DB     │
└────┬─────┘       └────┬─────┘       └────┬─────┘       └────┬─────┘
     │                  │                   │                   │
     │ 1. Process Order │                   │                   │
     ├─────────────────>│                   │                   │
     │                  │ 2. POST /orders/:id/process           │
     │                  ├──────────────────>│                   │
     │                  │                   │ 3. Find order     │
     │                  │                   ├──────────────────>│
     │                  │                   │<──────────────────┤
     │                  │                   │ 4. For each item: │
     │                  │                   │    - Find product │
     │                  │                   ├──────────────────>│
     │                  │                   │<──────────────────┤
     │                  │                   │    - Update stock │
     │                  │                   │      (±quantity)  │
     │                  │                   ├──────────────────>│
     │                  │                   │<──────────────────┤
     │                  │                   │ 5. Update order   │
     │                  │                   │    status         │
     │                  │                   ├──────────────────>│
     │                  │                   │<──────────────────┤
     │                  │ 6. Return updated │                   │
     │                  │<──────────────────┤                   │
     │ 7. Show success  │                   │                   │
     │<─────────────────┤                   │                   │
     │                  │                   │                   │
```

## Security Architecture

### Authentication & Authorization

```
Request Flow:
┌─────────────────────────────────────────────────────────┐
│ 1. Client Request                                       │
│    - Authorization: Bearer <JWT_TOKEN>                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. JwtAuthGuard                                         │
│    - Extract token from header                          │
│    - Verify token signature                             │
│    - Check expiration                                   │
│    - Decode payload (userId, email, role)              │
└────────────────────┬────────────────────────────────────┘
                     │
              ┌──────┴──────┐
              │   Valid?    │
              └──────┬──────┘
        No ────┘     │     └──── Yes
        │            │            │
        ▼            │            ▼
┌────────────┐       │    ┌─────────────────────────────┐
│ 401        │       │    │ 3. RolesGuard               │
│ Unauthorized│      │    │    - Get required roles     │
└────────────┘       │    │    - Compare with user role │
                     │    └────────────┬────────────────┘
                     │                 │
                     │          ┌──────┴──────┐
                     │          │ Authorized? │
                     │          └──────┬──────┘
                     │     No ────┘    │    └──── Yes
                     │     │           │           │
                     │     ▼           │           ▼
                     │ ┌────────────┐  │  ┌──────────────┐
                     │ │ 403        │  │  │ 4. Execute   │
                     │ │ Forbidden  │  │  │    Controller│
                     │ └────────────┘  │  └──────────────┘
                     │                 │
                     └─────────────────┘
```

### Data Security Layers

1. **Transport Layer**: HTTPS encryption
2. **Application Layer**: JWT tokens, CORS policy
3. **Business Layer**: Role-based access control
4. **Data Layer**: Password hashing, input validation

## Database Design

### Entity Relationship Model

```
┌─────────────────┐
│      users      │
├─────────────────┤
│ _id (PK)        │
│ email (UK)      │
│ name            │
│ password (hash) │
│ role            │
│ timestamps      │
└────────┬────────┘
         │ 1
         │ creates
         │
    ┌────┴────┐
    │         │
    │ *       │ *
    ▼         ▼
┌─────────────────┐  ┌─────────────────┐
│    products     │  │     orders      │
├─────────────────┤  ├─────────────────┤
│ _id (PK)        │  │ _id (PK)        │
│ sku (UK)        │  │ orderNumber(UK) │
│ name            │  │ type            │
│ category        │  │ status          │
│ quantity        │◄─┤ items[]         │
│ minQuantity     │  │  - productId(FK)│
│ price           │  │  - quantity     │
│ location        │  │  - price        │
│ createdBy (FK)  │  │ totalAmount     │
│ timestamps      │  │ createdBy (FK)  │
└─────────────────┘  │ processedBy(FK) │
                     │ timestamps      │
                     └─────────────────┘
```

### Data Normalization & Denormalization

**Normalized Data**:
- Users collection (single source of truth)
- Products collection (current data)

**Denormalized Data**:
- Order items (snapshot of product at order time)
  - Preserves historical pricing
  - Prevents data loss if product is deleted

## Scalability Considerations

### Horizontal Scaling

```
                    ┌─────────────┐
                    │Load Balancer│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Backend     │  │   Backend     │  │   Backend     │
│   Instance 1  │  │   Instance 2  │  │   Instance 3  │
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────┐
                    │   MongoDB   │
                    │   Cluster   │
                    └─────────────┘
```

### Caching Strategy

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     ▼
┌──────────────┐
│   CDN        │ ← Static assets
└────┬─────────┘
     │
     ▼
┌──────────────┐
│  Frontend    │ ← Client-side cache
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Redis      │ ← Session & data cache
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   MongoDB    │ ← Persistent data
└──────────────┘
```

## Performance Optimization

### Frontend Optimization
1. **Code Splitting**: Lazy load routes and components
2. **Image Optimization**: Next.js Image component
3. **Bundle Size**: Tree shaking and minification
4. **Caching**: Service workers for offline support

### Backend Optimization
1. **Database Indexes**: Optimized queries
2. **Connection Pooling**: Efficient DB connections
3. **Query Optimization**: Aggregation pipelines
4. **Caching**: Redis for frequently accessed data

### Database Optimization
1. **Indexes**: On frequently queried fields
2. **Compound Indexes**: For multi-field queries
3. **Projection**: Select only needed fields
4. **Aggregation**: Server-side data processing

## Monitoring & Logging

### Logging Strategy

```
Application Logs
├── Frontend (Browser Console, Sentry)
├── Backend (NestJS Logger)
│   ├── Info: Business operations
│   ├── Warning: Recoverable errors
│   ├── Error: Critical failures
│   └── Debug: Development info
└── Database (MongoDB logs)
```

### Metrics to Monitor

1. **Application Metrics**
   - Request rate
   - Response time
   - Error rate
   - Active users

2. **Infrastructure Metrics**
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network traffic

3. **Business Metrics**
   - Orders processed
   - Stock levels
   - User activity
   - API usage

## Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (localhost:3000)
├── Backend (localhost:3001)
└── MongoDB (localhost:27017)
```

### Production Environment
```
Cloud Infrastructure
├── CDN (Static Assets)
├── Load Balancer
├── Application Servers (Auto-scaled)
│   ├── Frontend Instances
│   └── Backend Instances
├── Database Cluster
│   ├── Primary Node
│   └── Replica Nodes
└── Cache Layer (Redis)
```

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live updates
   - Push notifications

2. **Advanced Analytics**
   - Predictive stock analysis
   - Sales forecasting

3. **Integration**
   - Third-party APIs
   - Payment gateways
   - Shipping providers

4. **Mobile App**
   - React Native app
   - PWA support

5. **Microservices**
   - Split backend into services
   - Event-driven architecture
