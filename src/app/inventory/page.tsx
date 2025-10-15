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

const InventoryPage = () => {
  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Inventory Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your warehouse products and stock levels
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Product
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Inventory management features coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default InventoryPage;
