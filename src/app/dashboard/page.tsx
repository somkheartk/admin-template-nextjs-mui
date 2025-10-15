'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Inventory,
  ShoppingCart,
  Warning,
} from '@mui/icons-material';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight={700}>
            {value}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
              <Typography variant="caption" color="success.main">
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      icon: <Inventory sx={{ fontSize: 32, color: 'primary.main' }} />,
      trend: '+12% from last month',
      color: '#1976d2',
    },
    {
      title: 'Pending Orders',
      value: '45',
      icon: <ShoppingCart sx={{ fontSize: 32, color: 'warning.main' }} />,
      trend: '+8% from last week',
      color: '#ed6c02',
    },
    {
      title: 'Low Stock Items',
      value: '23',
      icon: <Warning sx={{ fontSize: 32, color: 'error.main' }} />,
      color: '#d32f2f',
    },
    {
      title: 'Total Value',
      value: '$125,430',
      icon: <TrendingUp sx={{ fontSize: 32, color: 'success.main' }} />,
      trend: '+15% from last month',
      color: '#2e7d32',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', type: 'Inbound', status: 'Completed', items: 15, date: '2024-10-15' },
    { id: 'ORD-002', type: 'Outbound', status: 'Processing', items: 8, date: '2024-10-15' },
    { id: 'ORD-003', type: 'Inbound', status: 'Pending', items: 22, date: '2024-10-14' },
    { id: 'ORD-004', type: 'Outbound', status: 'Completed', items: 12, date: '2024-10-14' },
    { id: 'ORD-005', type: 'Inbound', status: 'Processing', items: 18, date: '2024-10-13' },
  ];

  const lowStockProducts = [
    { name: 'Product A', sku: 'SKU-001', current: 5, min: 20, status: 45 },
    { name: 'Product B', sku: 'SKU-002', current: 8, min: 15, status: 53 },
    { name: 'Product C', sku: 'SKU-003', current: 12, min: 30, status: 40 },
    { name: 'Product D', sku: 'SKU-004', current: 3, min: 10, status: 30 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome back! Here&apos;s what&apos;s happening with your warehouse today.
        </Typography>

        {/* Statistics Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </Box>

        {/* Recent Orders and Low Stock */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
          {/* Recent Orders */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Items</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">{order.items}</TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Low Stock Alert
              </Typography>
              <Box sx={{ mt: 2 }}>
                {lowStockProducts.map((product, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.sku} • Current: {product.current} / Min: {product.min}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color={product.status < 50 ? 'error' : 'warning.main'}
                        fontWeight={600}
                      >
                        {product.status}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={product.status}
                      color={product.status < 50 ? 'error' : 'warning'}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
