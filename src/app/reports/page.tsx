'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View warehouse performance and inventory analytics
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Reports and analytics page coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ReportsPage;
