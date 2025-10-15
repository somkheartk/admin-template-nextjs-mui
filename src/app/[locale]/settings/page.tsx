'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SettingsPage = () => {
  const t = useTranslations('settings');
  
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('subtitle')}
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {t('comingSoon')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default SettingsPage;
