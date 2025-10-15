# Database Schema Design Documentation

## Overview

This document describes the MongoDB database schema for the Warehouse Management System. The system uses Mongoose ODM for data modeling and validation.

## Database: warehouse-admin

## Collections

### 1. users

Stores user accounts and authentication information.

#### Schema Definition

```typescript
{
  email: String (required, unique, lowercase, trimmed),
  name: String (required, trimmed),
  password: String (required, hashed, min length: 6),
  role: String (enum: ['admin', 'manager', 'staff'], default: 'staff'),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### Field Descriptions

| Field | Type | Required | Unique | Description |
|-------|------|----------|---------|-------------|
| _id | ObjectId | Yes | Yes | MongoDB auto-generated ID |
| email | String | Yes | Yes | User's email address (lowercase) |
| name | String | Yes | No | User's full name |
| password | String | Yes | No | Hashed password (bcrypt) |
| role | String | Yes | No | User role: admin, manager, or staff |
| createdAt | Date | Yes | No | Account creation timestamp |
| updatedAt | Date | Yes | No | Last update timestamp |

#### Indexes
- `email`: Unique index for fast email lookups
- `role`: Index for role-based queries

#### Validation Rules
- Email must be valid email format
- Password must be at least 6 characters
- Password is hashed before storage (never stored in plain text)
- Role must be one of: admin, manager, staff

#### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "admin@example.com",
  "name": "Admin User",
  "password": "$2a$10$XYZ...hashed...ABC",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Business Rules
- Only admins can create new users
- Only admins can change user roles
- Users cannot delete themselves
- Password must be changed through secure endpoint

---

### 2. products

Stores product/inventory information.

#### Schema Definition

```typescript
{
  name: String (required, trimmed),
  sku: String (required, unique, uppercase, trimmed),
  description: String (optional, trimmed),
  category: String (required, trimmed),
  quantity: Number (required, min: 0, default: 0),
  minQuantity: Number (required, min: 0, default: 10),
  unit: String (required, default: 'pcs'),
  price: Number (required, min: 0),
  location: String (optional, trimmed),
  createdBy: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### Field Descriptions

| Field | Type | Required | Unique | Description |
|-------|------|----------|---------|-------------|
| _id | ObjectId | Yes | Yes | MongoDB auto-generated ID |
| name | String | Yes | No | Product name |
| sku | String | Yes | Yes | Stock Keeping Unit (uppercase) |
| description | String | No | No | Product description |
| category | String | Yes | No | Product category |
| quantity | Number | Yes | No | Current stock quantity |
| minQuantity | Number | Yes | No | Minimum stock threshold |
| unit | String | Yes | No | Unit of measurement (pcs, kg, etc.) |
| price | Number | Yes | No | Product price |
| location | String | No | No | Storage location in warehouse |
| createdBy | String | No | No | User ID who created the product |
| createdAt | Date | Yes | No | Creation timestamp |
| updatedAt | Date | Yes | No | Last update timestamp |

#### Indexes
- `sku`: Unique index for fast SKU lookups
- `category`: Index for category-based queries
- `quantity, minQuantity`: Compound index for low stock alerts

#### Validation Rules
- SKU must be unique across all products
- Quantity and minQuantity cannot be negative
- Price cannot be negative
- SKU is automatically converted to uppercase

#### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Laptop Dell XPS 15",
  "sku": "LAPTOP-DELL-XPS15",
  "description": "15-inch laptop with Intel i7 processor",
  "category": "Electronics",
  "quantity": 25,
  "minQuantity": 10,
  "unit": "pcs",
  "price": 1299.99,
  "location": "Warehouse A - Shelf B3",
  "createdBy": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Business Rules
- Low stock alert when quantity <= minQuantity
- Stock cannot go negative when processing outbound orders
- SKU must be unique and cannot be changed after creation
- Only admin and manager can delete products
- Staff can view and update stock levels

---

### 3. orders

Stores inbound and outbound order transactions.

#### Schema Definition

```typescript
{
  orderNumber: String (required, unique),
  type: String (enum: ['inbound', 'outbound'], required),
  status: String (enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending'),
  items: Array<OrderItem> (required, min length: 1),
  totalAmount: Number (optional, min: 0),
  notes: String (optional, trimmed),
  createdBy: String (optional),
  processedBy: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### OrderItem Sub-Schema

```typescript
{
  productId: String (required),
  productName: String (required),
  sku: String (required),
  quantity: Number (required, min: 1),
  price: Number (required, min: 0)
}
```

#### Field Descriptions

| Field | Type | Required | Unique | Description |
|-------|------|----------|---------|-------------|
| _id | ObjectId | Yes | Yes | MongoDB auto-generated ID |
| orderNumber | String | Yes | Yes | Unique order identifier |
| type | String | Yes | No | Order type: inbound or outbound |
| status | String | Yes | No | Order status |
| items | Array | Yes | No | Array of order items |
| totalAmount | Number | No | No | Total order value |
| notes | String | No | No | Additional notes |
| createdBy | String | No | No | User ID who created the order |
| processedBy | String | No | No | User ID who processed the order |
| createdAt | Date | Yes | No | Creation timestamp |
| updatedAt | Date | Yes | No | Last update timestamp |

#### OrderItem Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| productId | String | Yes | Reference to product _id |
| productName | String | Yes | Product name (denormalized) |
| sku | String | Yes | Product SKU (denormalized) |
| quantity | Number | Yes | Order quantity |
| price | Number | Yes | Price at time of order |

#### Indexes
- `orderNumber`: Unique index for fast order lookups
- `type`: Index for filtering by order type
- `status`: Index for filtering by status
- `createdAt`: Index for date-based queries

#### Validation Rules
- orderNumber must be unique
- Order must have at least one item
- Item quantity must be at least 1
- Status transitions: pending → processing → completed/cancelled
- totalAmount is calculated automatically if not provided

#### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "orderNumber": "ORD-20240101-001",
  "type": "inbound",
  "status": "completed",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "productName": "Laptop Dell XPS 15",
      "sku": "LAPTOP-DELL-XPS15",
      "quantity": 10,
      "price": 1299.99
    }
  ],
  "totalAmount": 12999.90,
  "notes": "Shipment from supplier ABC",
  "createdBy": "507f1f77bcf86cd799439011",
  "processedBy": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T10:30:00.000Z"
}
```

#### Business Rules
- Inbound orders increase product stock
- Outbound orders decrease product stock
- Order processing updates product quantities automatically
- Cancelled orders do not affect stock
- Only completed orders affect inventory
- Order items store product information at time of order (denormalization)

---

## Relationships

### User → Product
- **Type**: One-to-Many
- **Relationship**: A user can create many products
- **Implementation**: `products.createdBy` references `users._id`

### User → Order
- **Type**: One-to-Many
- **Relationship**: A user can create and process many orders
- **Implementation**: 
  - `orders.createdBy` references `users._id`
  - `orders.processedBy` references `users._id`

### Product → OrderItem
- **Type**: One-to-Many
- **Relationship**: A product can appear in many order items
- **Implementation**: `orders.items.productId` references `products._id`
- **Note**: Product information is denormalized in order items for historical accuracy

---

## Entity-Relationship Diagram

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ _id (PK)        │
│ email           │
│ name            │
│ password        │
│ role            │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ creates
         │
    ┌────┴────┬──────────────┐
    │         │              │
    ▼         ▼              ▼
┌─────────────────┐  ┌─────────────────┐
│   products      │  │     orders      │
├─────────────────┤  ├─────────────────┤
│ _id (PK)        │  │ _id (PK)        │
│ name            │  │ orderNumber     │
│ sku (UK)        │  │ type            │
│ description     │  │ status          │
│ category        │  │ items[]         │
│ quantity        │  │  - productId    │◄─┐
│ minQuantity     │  │  - productName  │  │
│ unit            │  │  - sku          │  │
│ price           │  │  - quantity     │  │
│ location        │  │  - price        │  │
│ createdBy (FK)  │  │ totalAmount     │  │
│ createdAt       │  │ notes           │  │
│ updatedAt       │  │ createdBy (FK)  │  │
└─────────────────┘  │ processedBy(FK) │  │
         │           │ createdAt       │  │
         └───────────┤ updatedAt       │  │
         references  └─────────────────┘  │
                              │            │
                              └────────────┘
                              references
```

---

## Data Flow

### 1. User Registration/Login Flow
```
Frontend → POST /api/auth/register
         → Backend validates input
         → Hash password with bcrypt
         → Save user to users collection
         → Generate JWT token
         → Return user + token to frontend
```

### 2. Product Management Flow
```
Frontend → POST /api/products
         → Backend validates JWT & role
         → Validate product data
         → Check SKU uniqueness
         → Save to products collection
         → Return created product
```

### 3. Order Processing Flow
```
Frontend → POST /api/orders/:id/process
         → Backend validates JWT & role
         → Find order by ID
         → For each item in order:
            → If type='inbound': Add quantity to product
            → If type='outbound': Subtract quantity from product
            → Validate stock availability
         → Update order status to 'completed'
         → Set processedBy field
         → Return updated order
```

---

## Indexing Strategy

### Performance Indexes
1. **users.email**: Unique, for authentication lookups
2. **products.sku**: Unique, for product lookups
3. **products.category**: For filtering by category
4. **orders.orderNumber**: Unique, for order lookups
5. **orders.status**: For filtering by status
6. **orders.createdAt**: For date-based sorting

### Compound Indexes
1. **products (quantity, minQuantity)**: For low stock queries
   ```javascript
   db.products.createIndex({ quantity: 1, minQuantity: 1 })
   ```

---

## Data Integrity Rules

### Validation at Schema Level
- Required fields enforcement
- Data type validation
- Enum validation for status fields
- Minimum/maximum value constraints
- String trimming and case conversion

### Application Level Rules
1. **User Management**
   - Email uniqueness check before creation
   - Password complexity validation
   - Role-based access control

2. **Product Management**
   - SKU uniqueness enforcement
   - Non-negative stock quantities
   - Price validation

3. **Order Management**
   - Order number uniqueness
   - Stock availability check before order processing
   - Automatic stock updates on order completion
   - Historical data preservation in order items

---

## Backup and Recovery

### Recommended Backup Strategy
1. **Daily Full Backups**: Complete database dump
2. **Hourly Incremental Backups**: Change stream capture
3. **Retention**: 30 days for daily, 7 days for hourly

### MongoDB Backup Commands
```bash
# Full backup
mongodump --uri="mongodb://localhost:27017/warehouse-admin" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/warehouse-admin" /backup/20240101
```

---

## Scalability Considerations

### Horizontal Scaling
- MongoDB supports sharding for horizontal scaling
- Recommended shard key for orders: `orderNumber`
- Recommended shard key for products: `sku`

### Vertical Scaling
- Index optimization for frequent queries
- Connection pooling configuration
- Query optimization with aggregation pipeline

### Caching Strategy
- Cache frequently accessed products
- Cache user sessions with Redis
- TTL: 5 minutes for product data, 24 hours for user sessions

---

## Security Measures

1. **Authentication**: JWT tokens with 7-day expiration
2. **Authorization**: Role-based access control (RBAC)
3. **Password Security**: bcrypt hashing with 10 salt rounds
4. **Input Validation**: class-validator for all DTOs
5. **SQL Injection Prevention**: Mongoose ORM parameterized queries
6. **Data Sanitization**: Input trimming and type coercion

---

## Monitoring and Maintenance

### Key Metrics to Monitor
- Database connection pool usage
- Query performance (slow query log)
- Index usage statistics
- Collection size growth
- Document count per collection

### Maintenance Tasks
- Monthly index optimization
- Quarterly data archival for old orders
- Regular backup verification
- Performance profiling

---

## Migration Strategy

For future schema changes:
1. Create migration scripts in `migrations/` folder
2. Use versioning: `YYYYMMDD-HHmmss-description.js`
3. Test on staging environment first
4. Keep migration history in database
5. Support rollback procedures

Example migration script:
```javascript
// 20240101-120000-add-product-supplier.js
module.exports = {
  async up(db) {
    await db.collection('products').updateMany(
      {},
      { $set: { supplier: null } }
    );
  },
  
  async down(db) {
    await db.collection('products').updateMany(
      {},
      { $unset: { supplier: "" } }
    );
  }
};
```
