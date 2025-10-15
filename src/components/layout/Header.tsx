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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        color: 'text.primary',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      <Toolbar sx={{ py: 0.5 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ 
            mr: 2, 
            display: { md: 'none' },
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
            }
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
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
              fontWeight: 700,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
              },
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
            sx={{
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
              }
            }}
          >
            <Avatar
              sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)',
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
                minWidth: 240,
                borderRadius: 3,
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <MenuItem disabled sx={{ opacity: 1, py: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {user.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem 
              onClick={handleRoleMenuOpen}
              sx={{
                borderRadius: 2,
                mx: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              <ListItemIcon>
                <SwapHoriz fontSize="small" sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText>
                {t('common.switchRole')}
              </ListItemText>
            </MenuItem>
            <MenuItem 
              onClick={handleSettings}
              sx={{
                borderRadius: 2,
                mx: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText>
                {t('common.settings')}
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                color: 'error.main',
                borderRadius: 2,
                mx: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
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
                minWidth: 200,
                borderRadius: 3,
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
              }
            }}
          >
            {roles.map((role) => (
              <MenuItem
                key={role}
                onClick={() => handleRoleSwitch(role)}
                selected={role === user.role}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  },
                }}
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
                    sx={{
                      ml: 1,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      fontWeight: 700,
                    }}
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
