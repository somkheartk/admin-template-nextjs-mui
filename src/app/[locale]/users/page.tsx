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
import { useTranslations } from 'next-intl';
import DashboardLayout from '@/components/layout/DashboardLayout';

const UsersPage = () => {
  const t = useTranslations('users');
  const tRoles = useTranslations('roles');
  
  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              {t('title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('subtitle')}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            {t('addUser')}
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {t('rolePermissions')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>{tRoles('admin')}:</strong> {t('adminDescription')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>{tRoles('manager')}:</strong> {t('managerDescription')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>{tRoles('staff')}:</strong> {t('staffDescription')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default UsersPage;
