import React, {FC} from 'react';
import { Box, Drawer, Toolbar, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { menuItems } from '../../costants/dashBoardMenuItems';
import './styles.css';

const drawerWidth = 240;


export const DashboardLayout: FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map(({ label, path }) => (
              <ListItemButton key={path} onClick={() => navigate(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
