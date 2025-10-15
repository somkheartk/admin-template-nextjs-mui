export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string;
  name: string;
  sku: string;
  description?: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  price: number;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
}

export interface IOrder {
  _id?: string;
  orderNumber: string;
  type: 'inbound' | 'outbound';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: IOrderItem[];
  totalAmount?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  processedBy?: string;
}

export interface IOrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface IDashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  recentActivity: IActivity[];
}

export interface IActivity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  user?: string;
}
