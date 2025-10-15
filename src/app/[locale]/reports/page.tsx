'prisma client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  Inventory2,
  LocalShipping,
  AttachMoney,
  BarChart,
  ShowChart,
} from '@mui/icons-material';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: `linear-gradient(135deg, ${color}08 0%, ${color}15 100%)`,
        border: '1px solid',
        borderColor: 'rgba(226, 232, 240, 0.8)',
        borderRadius: 3,
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${color}30`,
          borderColor: color,
        } 
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
              borderRadius: 3,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 16px ${color}25`,
            }}
          >
            {icon}
          </Box>
          <Chip
            icon={isPositive ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
            label={`${isPositive ? '+' : ''}${change}%`}
            color={isPositive ? 'success' : 'error'}
            size="small"
            sx={{ 
              fontWeight: 700,
              borderRadius: 2,
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ReportsPage = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$284,520',
      change: 15.3,
      icon: <AttachMoney sx={{ fontSize: 32, color: '#10b981' }} />,
      color: '#10b981',
    },
    {
      title: 'Products Sold',
      value: '3,842',
      change: 8.2,
      icon: <Inventory2 sx={{ fontSize: 32, color: '#6366f1' }} />,
      color: '#6366f1',
    },
    {
      title: 'Shipments',
      value: '1,256',
      change: -2.4,
      icon: <LocalShipping sx={{ fontSize: 32, color: '#f59e0b' }} />,
      color: '#f59e0b',
    },
    {
      title: 'Avg Order Value',
      value: '$74.12',
      change: 12.8,
      icon: <Assessment sx={{ fontSize: 32, color: '#ec4899' }} />,
      color: '#ec4899',
    },
  ];

  const topProducts = [
    { name: 'Premium Widget Pro', sku: 'WGT-PRO-001', sales: 1245, revenue: '$62,250', growth: 18.5 },
    { name: 'Standard Widget', sku: 'WGT-STD-002', sales: 982, revenue: '$39,280', growth: 12.3 },
    { name: 'Deluxe Widget Plus', sku: 'WGT-DLX-003', sales: 756, revenue: '$45,360', growth: -5.2 },
    { name: 'Mini Widget', sku: 'WGT-MIN-004', sales: 634, revenue: '$19,020', growth: 8.7 },
    { name: 'Mega Widget Ultra', sku: 'WGT-MGA-005', sales: 225, revenue: '$33,750', growth: 24.1 },
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 125430, target: 120000, completion: 104.5 },
    { category: 'Furniture', revenue: 89250, target: 95000, completion: 94.0 },
    { category: 'Clothing', revenue: 45680, target: 50000, completion: 91.4 },
    { category: 'Books', revenue: 24160, target: 20000, completion: 120.8 },
  ];

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
            Reports & Analytics
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: '700px' }}
          >
            Comprehensive warehouse performance and inventory analytics dashboard
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </Box>

        {/* Charts Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
          <Card sx={{
            border: '1px solid',
            borderColor: 'rgba(226, 232, 240, 0.8)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  px: 3,
                  py: 2.5,
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                  borderBottom: '2px solid',
                  borderColor: 'rgba(226, 232, 240, 0.8)',
                }}>
                  <BarChart sx={{ mr: 1, color: '#6366f1' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Top Performing Products
                  </Typography>
                </Box>
                <Box sx={{ px: 3, py: 2 }}>
                  <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Product Name</TableCell>
                          <TableCell sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>SKU</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Sales</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Revenue</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Growth</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topProducts.map((product, index) => (
                          <TableRow 
                            key={index} 
                            hover
                            sx={{
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                              },
                              '&:last-child td': {
                                borderBottom: 'none',
                              },
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" fontWeight={700}>
                                {product.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                              {product.sku}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={500}>
                              {product.sales.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography 
                              variant="body2" 
                              fontWeight={700}
                              sx={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              {product.revenue}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              icon={
                                product.growth >= 0 ? (
                                  <TrendingUp sx={{ fontSize: 14 }} />
                                ) : (
                                  <TrendingDown sx={{ fontSize: 14 }} />
                                )
                              }
                              label={`${product.growth >= 0 ? '+' : ''}${product.growth}%`}
                              color={product.growth >= 0 ? 'success' : 'error'}
                              size="small"
                              sx={{ 
                                fontWeight: 700,
                                borderRadius: 2,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              </CardContent>
            </Card>

          <Card sx={{ 
            height: '100%',
            border: '1px solid',
            borderColor: 'rgba(226, 232, 240, 0.8)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  px: 3,
                  py: 2.5,
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(219, 39, 119, 0.05) 100%)',
                  borderBottom: '2px solid',
                  borderColor: 'rgba(226, 232, 240, 0.8)',
                }}>
                  <ShowChart sx={{ mr: 1, color: '#ec4899' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Category Performance
                  </Typography>
                </Box>
                <Box sx={{ px: 3, py: 2 }}>
                  {categoryPerformance.map((item, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        mb: 3,
                        p: 2.5,
                        borderRadius: 3,
                        background: item.completion >= 100 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.1) 100%)' 
                          : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.1) 100%)',
                        border: '1px solid',
                        borderColor: item.completion >= 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: item.completion >= 100 
                            ? '0 8px 16px rgba(16, 185, 129, 0.2)' 
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
                            {item.category}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            ${item.revenue.toLocaleString()} / ${item.target.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 56,
                          height: 56,
                          borderRadius: 2.5,
                          background: item.completion >= 100 
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          boxShadow: item.completion >= 100 
                            ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                            : '0 4px 12px rgba(245, 158, 11, 0.3)',
                        }}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ color: 'white' }}
                          >
                            {item.completion.toFixed(0)}%
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(item.completion, 100)}
                        color={item.completion >= 100 ? 'success' : 'warning'}
                        sx={{
                          height: 12,
                          borderRadius: 2,
                          backgroundColor: item.completion >= 100 
                            ? 'rgba(16, 185, 129, 0.15)' 
                            : 'rgba(245, 158, 11, 0.15)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 2,
                            background: item.completion >= 100 
                              ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
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

        {/* Summary Statistics */}
        <Card sx={{
          border: '1px solid',
          borderColor: 'rgba(226, 232, 240, 0.8)',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{
              px: 3,
              py: 2.5,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
              borderBottom: '2px solid',
              borderColor: 'rgba(226, 232, 240, 0.8)',
            }}>
              <Typography variant="h6" fontWeight={700}>
                Period Summary
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3, 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                  borderRadius: 3, 
                  color: 'white',
                  boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
                  }
                }}>
                  <Typography variant="h3" fontWeight={700}>
                    98.5%
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, fontWeight: 600 }}>
                    Order Fulfillment Rate
                  </Typography>
                </Box>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3, 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  borderRadius: 3, 
                  color: 'white',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(16, 185, 129, 0.4)',
                  }
                }}>
                <Typography variant="h4" fontWeight={700}>
                  2.3 days
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Avg Delivery Time
                </Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3, 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                borderRadius: 3, 
                color: 'white',
                boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(245, 158, 11, 0.4)',
                }
              }}>
                <Typography variant="h3" fontWeight={700}>
                  4.8/5.0
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, fontWeight: 600 }}>
                  Customer Satisfaction
                </Typography>
              </Box>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3, 
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
                borderRadius: 3, 
                color: 'white',
                boxShadow: '0 8px 16px rgba(236, 72, 153, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(236, 72, 153, 0.4)',
                }
              }}>
                <Typography variant="h3" fontWeight={700}>
                  1.2%
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, fontWeight: 600 }}>
                  Return Rate
                </Typography>
              </Box>
            </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ReportsPage;
