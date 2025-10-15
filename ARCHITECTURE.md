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

---

## Role-Based Access Control & Dynamic Role Switching

### Overview

The system implements a robust RBAC (Role-Based Access Control) system with the unique feature of dynamic role switching, allowing users to switch between different roles without re-authentication.

### Role Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                      Role Hierarchy                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────────────────────────────────────┐     │
│   │             Admin (Full Access)              │     │
│   │  - All system permissions                    │     │
│   │  - User management                           │     │
│   │  - System configuration                      │     │
│   │  - Can switch to any role                    │     │
│   └──────────────────┬───────────────────────────┘     │
│                      │                                  │
│   ┌──────────────────┴───────────────────────────┐     │
│   │           Manager (Management Access)         │     │
│   │  - Inventory management                       │     │
│   │  - Order management                           │     │
│   │  - View users                                 │     │
│   │  - Can switch roles                           │     │
│   └──────────────────┬───────────────────────────┘     │
│                      │                                  │
│   ┌──────────────────┴───────────────────────────┐     │
│   │            Staff (Limited Access)             │     │
│   │  - View/update inventory                      │     │
│   │  - Create orders                              │     │
│   │  - View orders                                │     │
│   │  - Can switch roles (if enabled)              │     │
│   └───────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Role Switching Flow

```
User Request to Switch Role
         │
         ▼
┌────────────────────────┐
│  Frontend Component    │
│  (Header.tsx)          │
│  - User clicks avatar  │
│  - Selects "Switch     │
│    Role" option        │
│  - Chooses new role    │
└────────┬───────────────┘
         │
         ▼ API Call: POST /api/users/switch-role
         │
┌────────┴───────────────┐
│  API Client            │
│  (client.ts)           │
│  - Sends role change   │
│    request with JWT    │
└────────┬───────────────┘
         │
         ▼
┌────────┴───────────────┐
│  Backend Controller    │
│  (users.controller.ts) │
│  - Validates JWT       │
│  - Extracts user ID    │
└────────┬───────────────┘
         │
         ▼
┌────────┴───────────────┐
│  Users Service         │
│  (users.service.ts)    │
│  - Updates user role   │
│    in database         │
└────────┬───────────────┘
         │
         ▼
┌────────┴───────────────┐
│  Auth Service          │
│  (auth.service.ts)     │
│  - Generates new JWT   │
│    with updated role   │
└────────┬───────────────┘
         │
         ▼
┌────────┴───────────────┐
│  Response              │
│  - Updated user data   │
│  - New JWT token       │
└────────┬───────────────┘
         │
         ▼
┌────────┴───────────────┐
│  Frontend Updates      │
│  - Stores new token    │
│  - Refreshes UI        │
│  - Updates permissions │
└────────────────────────┘
```

### Implementation Details

#### Backend Components

**1. DTO (Data Transfer Object)**
```typescript
// backend/src/users/dto/user.dto.ts
export class SwitchRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
```

**2. Controller Endpoint**
```typescript
// backend/src/users/users.controller.ts
@Post('switch-role')
@UseGuards(JwtAuthGuard)
async switchRole(@Request() req, @Body() switchRoleDto: SwitchRoleDto) {
  const userId = req.user.sub;
  const updatedUser = await this.usersService.switchRole(userId, switchRoleDto.role);
  const newToken = await this.authService.refreshToken(userId);
  return {
    user: updatedUser,
    token: newToken,
  };
}
```

**3. Service Method**
```typescript
// backend/src/users/users.service.ts
async switchRole(userId: string, newRole: string): Promise<User> {
  const user = await this.userModel
    .findByIdAndUpdate(userId, { role: newRole }, { new: true })
    .select('-password')
    .exec();
  return user;
}
```

#### Frontend Components

**1. API Client Method**
```typescript
// src/lib/api/client.ts
async switchRole(role: string) {
  const response = await this.request('/users/switch-role', {
    method: 'POST',
    body: JSON.stringify({ role }),
  });
  
  if (response.data?.token) {
    this.setToken(response.data.token);
  }
  
  return response;
}
```

**2. UI Component**
```typescript
// src/components/layout/Header.tsx
const handleRoleSwitch = async (newRole: string) => {
  const response = await apiClient.switchRole(newRole);
  if (response.data) {
    setCurrentRole(newRole);
    window.location.reload(); // Refresh to apply new permissions
  }
};
```

### Security Considerations

1. **JWT Token Update**: Each role switch generates a new JWT token with updated role information
2. **Database Persistence**: Role changes are persisted in MongoDB
3. **Immediate Effect**: New token takes effect immediately upon receipt
4. **Session Continuity**: User stays logged in during role switch
5. **Audit Trail**: Role changes can be logged for security auditing

### Use Cases

1. **Testing Permissions**: Developers can quickly test different role permissions
2. **Multi-Role Users**: Users with multiple responsibilities can switch contexts
3. **Training**: Trainers can demonstrate different user experiences
4. **Support**: Support staff can view issues from different role perspectives

### UI/UX Features

1. **Visual Indicators**:
   - Admin: Red badge with shield icon
   - Manager: Orange badge with management icon
   - Staff: Blue badge with person icon

2. **Menu Integration**:
   - Role switcher in user profile menu
   - Current role highlighted
   - All available roles displayed

3. **Smooth Transitions**:
   - No page reload required for token update
   - Optional page refresh for UI updates
   - Loading states during switch

### Performance Impact

- **Minimal Overhead**: Single API call and token refresh
- **Fast Response**: Typically < 100ms
- **No Re-authentication**: Maintains existing session
- **Efficient**: Only updates necessary data
