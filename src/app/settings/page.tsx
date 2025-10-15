'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your application settings and preferences
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Settings page coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default SettingsPage;
