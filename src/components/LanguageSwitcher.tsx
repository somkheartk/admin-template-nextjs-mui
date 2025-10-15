'use client';

import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Language as LanguageIcon, Check as CheckIcon } from '@mui/icons-material';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    handleClose();
    
    // Remove current locale from pathname if it exists
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = newLocale === 'en' 
      ? pathnameWithoutLocale || '/' 
      : `/${newLocale}${pathnameWithoutLocale || '/'}`;
    
    router.push(newPath);
    router.refresh();
  };

  const languages = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'th', label: 'Thai', nativeLabel: 'ไทย' },
  ];

  return (
    <>
      <IconButton
        size="large"
        aria-label="change language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
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
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={locale === lang.code}
          >
            <ListItemIcon>
              {locale === lang.code && <CheckIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText>
              {lang.nativeLabel}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
