'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  Settings,
  SwapHoriz,
  AdminPanelSettings,
  ManageAccounts,
  Badge,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import apiClient from '@/lib/api/client';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [roleMenuAnchor, setRoleMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [currentRole, setCurrentRole] = React.useState<string>('admin');

  // Mock user data - in production, this would come from auth context
  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: currentRole,
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    apiClient.logout();
    router.push('/login');
  };

  const handleSettings = () => {
    handleClose();
    router.push('/settings');
  };

  const handleRoleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setRoleMenuAnchor(event.currentTarget);
  };

  const handleRoleMenuClose = () => {
    setRoleMenuAnchor(null);
  };

  const handleRoleSwitch = async (newRole: string) => {
    try {
      const response = await apiClient.switchRole(newRole);
      if (response.data) {
        setCurrentRole(newRole);
        // Refresh the page to reflect role changes
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
    handleRoleMenuClose();
    handleClose();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings fontSize="small" />;
      case 'manager':
        return <ManageAccounts fontSize="small" />;
      case 'staff':
        return <Badge fontSize="small" />;
      default:
        return <Badge fontSize="small" />;
    }
  };

  const getRoleColor = (role: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'warning';
      case 'staff':
        return 'info';
      default:
        return 'default';
    }
  };

  const roles = ['admin', 'manager', 'staff'];

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('common.appName')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={t(`roles.${user.role}`).toUpperCase()}
            color={getRoleColor(user.role)}
            size="small"
            icon={getRoleIcon(user.role)}
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 600,
            }}
          />
          <LanguageSwitcher />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 600,
              }}
              alt={user.name}
            >
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { 
                mt: 1.5,
                minWidth: 220,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            <MenuItem disabled sx={{ opacity: 1 }}>
              <Box>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleRoleMenuOpen}>
              <ListItemIcon>
                <SwapHoriz fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {t('common.switchRole')}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {t('common.settings')}
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText>
                {t('common.logout')}
              </ListItemText>
            </MenuItem>
          </Menu>

          {/* Role Switch Menu */}
          <Menu
            anchorEl={roleMenuAnchor}
            open={Boolean(roleMenuAnchor)}
            onClose={handleRoleMenuClose}
            PaperProps={{
              sx: { 
                minWidth: 180,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            {roles.map((role) => (
              <MenuItem
                key={role}
                onClick={() => handleRoleSwitch(role)}
                selected={role === user.role}
              >
                <ListItemIcon>
                  {getRoleIcon(role)}
                </ListItemIcon>
                <ListItemText>
                  {t(`roles.${role}`)}
                </ListItemText>
                {role === user.role && (
                  <Chip
                    label={t('common.current')}
                    size="small"
                    color={getRoleColor(role)}
                    sx={{ ml: 1 }}
                  />
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
