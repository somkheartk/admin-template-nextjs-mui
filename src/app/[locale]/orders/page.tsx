'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DashboardLayout from '@/components/layout/DashboardLayout';

const OrdersPage = () => {
  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Orders Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage inbound and outbound orders
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Order
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Orders management features coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default OrdersPage;
