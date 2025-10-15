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
import { useTranslations } from 'next-intl';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        borderColor: color,
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography color="text.secondary" variant="body2" gutterBottom fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h3" component="div" fontWeight={700} sx={{ mb: 1.5 }}>
            {value}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp sx={{ fontSize: 18, color: 'success.main', mr: 0.5 }} />
              <Typography variant="body2" color="success.main" fontWeight={600}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
            borderRadius: 2.5,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 12px ${color}20`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const t = useTranslations('dashboard');
  const tOrders = useTranslations('orders');
  
  const stats = [
    {
      title: t('totalProducts'),
      value: '1,234',
      icon: <Inventory sx={{ fontSize: 32, color: 'primary.main' }} />,
      trend: `+12% ${t('fromLastMonth')}`,
      color: '#1976d2',
    },
    {
      title: t('pendingOrders'),
      value: '45',
      icon: <ShoppingCart sx={{ fontSize: 32, color: 'warning.main' }} />,
      trend: `+8% ${t('fromLastWeek')}`,
      color: '#ed6c02',
    },
    {
      title: t('lowStock'),
      value: '23',
      icon: <Warning sx={{ fontSize: 32, color: 'error.main' }} />,
      color: '#d32f2f',
    },
    {
      title: t('totalValue'),
      value: '$125,430',
      icon: <TrendingUp sx={{ fontSize: 32, color: 'success.main' }} />,
      trend: `+15% ${t('fromLastMonth')}`,
      color: '#2e7d32',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', type: tOrders('inbound'), status: tOrders('completed'), items: 15, date: '2024-10-15' },
    { id: 'ORD-002', type: tOrders('outbound'), status: tOrders('processing'), items: 8, date: '2024-10-15' },
    { id: 'ORD-003', type: tOrders('inbound'), status: tOrders('pending'), items: 22, date: '2024-10-14' },
    { id: 'ORD-004', type: tOrders('outbound'), status: tOrders('completed'), items: 12, date: '2024-10-14' },
    { id: 'ORD-005', type: tOrders('inbound'), status: tOrders('processing'), items: 18, date: '2024-10-13' },
  ];

  const lowStockProducts = [
    { name: 'Product A', sku: 'SKU-001', current: 5, min: 20, status: 45 },
    { name: 'Product B', sku: 'SKU-002', current: 8, min: 15, status: 53 },
    { name: 'Product C', sku: 'SKU-003', current: 12, min: 30, status: 40 },
    { name: 'Product D', sku: 'SKU-004', current: 3, min: 10, status: 30 },
  ];

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('completed') || statusLower.includes('เสร็จสิ้น')) {
      return 'success';
    } else if (statusLower.includes('processing') || statusLower.includes('กำลังดำเนินการ')) {
      return 'warning';
    } else if (statusLower.includes('pending') || statusLower.includes('รอดำเนินการ')) {
      return 'info';
    }
    return 'default';
  };

  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} sx={{ 
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400 }}>
            {t('welcome')}
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </Box>

        {/* Recent Orders and Low Stock */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
          {/* Recent Orders */}
          <Card sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'divider',
              }}>
                <Typography variant="h6" fontWeight={700}>
                  {t('recentOrders')}
                </Typography>
                <Chip label={`${recentOrders.length} ${t('items')}`} size="small" color="primary" />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{t('orderId')}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{t('type')}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{t('status')}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>{t('items')}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{t('date')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow 
                        key={order.id} 
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer',
                          }
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={700} color="primary">
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {order.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {order.items}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {order.date}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'divider',
              }}>
                <Typography variant="h6" fontWeight={700}>
                  {t('lowStockAlert')}
                </Typography>
                <Warning sx={{ color: 'error.main' }} />
              </Box>
              <Box sx={{ mt: 2 }}>
                {lowStockProducts.map((product, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'action.hover',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          {product.sku} • {t('current')}: {product.current} / {t('min')}: {product.min}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color={product.status < 50 ? 'error' : 'warning.main'}
                        fontWeight={700}
                        sx={{ 
                          fontSize: '1.1rem',
                        }}
                      >
                        {product.status}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={product.status}
                      color={product.status < 50 ? 'error' : 'warning'}
                      sx={{ 
                        height: 10, 
                        borderRadius: 1,
                        backgroundColor: product.status < 50 ? 'error.light' : 'warning.light',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 1,
                        }
                      }}
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
