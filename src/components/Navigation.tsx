import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wealth Management
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/bulk-entry"
          >
            Bulk Entry
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 