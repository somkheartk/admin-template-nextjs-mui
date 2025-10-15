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
      background: `linear-gradient(135deg, ${color}08 0%, ${color}15 100%)`,
      border: '2px solid',
      borderColor: 'transparent',
      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 20px 40px ${color}30`,
        borderColor: color,
        '& .stat-icon': {
          transform: 'scale(1.1) rotate(5deg)',
        },
        '&::before': {
          opacity: 0.1,
        },
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 100% 0%, ${color}15 0%, transparent 50%)`,
        opacity: 0,
        transition: 'opacity 0.4s ease',
      },
    }}
  >
    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            color="text.secondary" 
            variant="body2" 
            gutterBottom 
            fontWeight={600}
            sx={{ 
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.75rem',
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h3" 
            component="div" 
            fontWeight={700} 
            sx={{ 
              mb: 1.5,
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value}
          </Typography>
          {trend && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1,
              backgroundColor: 'success.light',
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              width: 'fit-content',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
            }}>
              <TrendingUp sx={{ fontSize: 18, color: 'success.main', mr: 0.5 }} />
              <Typography variant="body2" color="success.main" fontWeight={700} sx={{ fontSize: '0.8rem' }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          className="stat-icon"
          sx={{
            background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
            borderRadius: 3,
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 16px ${color}25`,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
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
      icon: <Inventory sx={{ fontSize: 32, color: '#6366f1' }} />,
      trend: `+12% ${t('fromLastMonth')}`,
      color: '#6366f1',
    },
    {
      title: t('pendingOrders'),
      value: '45',
      icon: <ShoppingCart sx={{ fontSize: 32, color: '#f59e0b' }} />,
      trend: `+8% ${t('fromLastWeek')}`,
      color: '#f59e0b',
    },
    {
      title: t('lowStock'),
      value: '23',
      icon: <Warning sx={{ fontSize: 32, color: '#ef4444' }} />,
      color: '#ef4444',
    },
    {
      title: t('totalValue'),
      value: '$125,430',
      icon: <TrendingUp sx={{ fontSize: 32, color: '#10b981' }} />,
      trend: `+15% ${t('fromLastMonth')}`,
      color: '#10b981',
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
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            fontWeight={700} 
            sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1,
            }}
          >
            {t('title')}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontWeight: 400,
              maxWidth: '600px',
            }}
          >
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
            borderColor: 'rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
          }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                px: 3,
                py: 2.5,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                borderBottom: '2px solid',
                borderColor: 'rgba(226, 232, 240, 0.8)',
              }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary' }}>
                  {t('recentOrders')}
                </Typography>
                <Chip 
                  label={`${recentOrders.length} ${t('items')}`} 
                  size="small" 
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontWeight: 700,
                  }}
                />
              </Box>
              <Box sx={{ px: 3, py: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{t('orderId')}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{t('type')}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{t('status')}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{t('items')}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{t('date')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow 
                          key={order.id} 
                          hover
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.05)',
                              cursor: 'pointer',
                              transform: 'scale(1.01)',
                            },
                            '&:last-child td': {
                              borderBottom: 'none',
                            },
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={700} sx={{
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}>
                              {order.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {order.type}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status)}
                              size="small"
                              sx={{ 
                                fontWeight: 700,
                                borderRadius: 2,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={700} color="primary">
                              {order.items}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {order.date}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card sx={{ 
            border: '1px solid',
            borderColor: 'rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
          }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                px: 3,
                py: 2.5,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
                borderBottom: '2px solid',
                borderColor: 'rgba(226, 232, 240, 0.8)',
              }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary' }}>
                  {t('lowStockAlert')}
                </Typography>
                <Warning sx={{ 
                  color: 'error.main',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  },
                }} />
              </Box>
              <Box sx={{ px: 3, py: 2 }}>
                {lowStockProducts.map((product, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mb: 2.5,
                      p: 2.5,
                      borderRadius: 3,
                      background: product.status < 50 
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%)' 
                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.1) 100%)',
                      border: '1px solid',
                      borderColor: product.status < 50 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        boxShadow: product.status < 50 
                          ? '0 8px 16px rgba(239, 68, 68, 0.2)' 
                          : '0 8px 16px rgba(245, 158, 11, 0.2)',
                      },
                      '&:last-child': {
                        mb: 0,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {product.sku} • {t('current')}: {product.current} / {t('min')}: {product.min}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: 2.5,
                        background: product.status < 50 
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        boxShadow: product.status < 50 
                          ? '0 4px 12px rgba(239, 68, 68, 0.3)'
                          : '0 4px 12px rgba(245, 158, 11, 0.3)',
                      }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ color: 'white' }}
                        >
                          {product.status}%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={product.status}
                      color={product.status < 50 ? 'error' : 'warning'}
                      sx={{ 
                        height: 12, 
                        borderRadius: 2,
                        backgroundColor: product.status < 50 
                          ? 'rgba(239, 68, 68, 0.15)' 
                          : 'rgba(245, 158, 11, 0.15)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 2,
                          background: product.status < 50 
                            ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                            : 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
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
