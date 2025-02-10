import * as React from 'react';
;
//import ListItemButton from '@mui/material/ListItemButton';
//import ListItemText from '@mui/material/ListItemText';

//import Button from '@mui/material/Button';
import './navbarstyle.css';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './navbarstyle.css'



export default function DrawerAppBar(props) {

  const drawerWidth = 240;
  const navItems = ['HOME', 'SERVICES', 'LOGIN', 'CONTACT'];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
          <h1 className=''>AgriWasteFair</h1>

      </Typography>
      <Divider />
      <List>

        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <a className='drawerLink' sx={{ textAlign: 'center' }} href={"#"+item}>{item}</a>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" id="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <h1 className=''>AgriWasteFair</h1>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
            {navItems.map((item) => (
              
              <a href={"#"+item} key={item} sx={{ color: '#fff' }}>{item}</a>
                
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }} id="HOME">
        <Toolbar />
        <Typography component={'div'}>
          <>
          <h1 className="content-1">Revenue-from-waste</h1>
          <h1 className="content-2">Leveraging 'Something' From 'Nothing'</h1>
          <a href="#SERVICES" className='bt-1'>At Your Service</a>
          </>
         
        </Typography>
      </Box>
    </Box>
  );
}