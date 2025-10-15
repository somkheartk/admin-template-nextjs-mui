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

const UsersPage = () => {
  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Users Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage user accounts and role-based access control
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add User
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Role Permissions
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Admin:</strong> Full access to all features
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Manager:</strong> Manage inventory, orders, and staff users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Staff:</strong> View and update inventory, create orders
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default UsersPage;
