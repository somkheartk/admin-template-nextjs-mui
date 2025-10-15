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
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Chip
            icon={isPositive ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
            label={`${isPositive ? '+' : ''}${change}%`}
            color={isPositive ? 'success' : 'error'}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ color }}>
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
      icon: <AttachMoney sx={{ fontSize: 32, color: '#2e7d32' }} />,
      color: '#2e7d32',
    },
    {
      title: 'Products Sold',
      value: '3,842',
      change: 8.2,
      icon: <Inventory2 sx={{ fontSize: 32, color: '#1976d2' }} />,
      color: '#1976d2',
    },
    {
      title: 'Shipments',
      value: '1,256',
      change: -2.4,
      icon: <LocalShipping sx={{ fontSize: 32, color: '#ed6c02' }} />,
      color: '#ed6c02',
    },
    {
      title: 'Avg Order Value',
      value: '$74.12',
      change: 12.8,
      icon: <Assessment sx={{ fontSize: 32, color: '#9c27b0' }} />,
      color: '#9c27b0',
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
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
          <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <BarChart sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight={600}>
                    Top Performing Products
                  </Typography>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell align="right">Sales</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts.map((product, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
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
                            <Typography variant="body2" fontWeight={600} color="success.main">
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
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

          <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ShowChart sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="h6" fontWeight={600}>
                    Category Performance
                  </Typography>
                </Box>
                <Box>
                  {categoryPerformance.map((item, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.category}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${item.revenue.toLocaleString()} / ${item.target.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color={item.completion >= 100 ? 'success.main' : 'warning.main'}
                        >
                          {item.completion.toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(item.completion, 100)}
                        color={item.completion >= 100 ? 'success' : 'primary'}
                        sx={{
                          height: 10,
                          borderRadius: 1,
                          backgroundColor: 'action.hover',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
        </Box>

        {/* Summary Statistics */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Period Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mt: 1 }}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'primary.main', borderRadius: 2, color: 'white' }}>
                <Typography variant="h4" fontWeight={700}>
                  98.5%
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Order Fulfillment Rate
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'success.main', borderRadius: 2, color: 'white' }}>
                <Typography variant="h4" fontWeight={700}>
                  2.3 days
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Avg Delivery Time
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'warning.main', borderRadius: 2, color: 'white' }}>
                <Typography variant="h4" fontWeight={700}>
                  4.8/5.0
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Customer Satisfaction
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'secondary.main', borderRadius: 2, color: 'white' }}>
                <Typography variant="h4" fontWeight={700}>
                  1.2%
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Return Rate
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ReportsPage;
