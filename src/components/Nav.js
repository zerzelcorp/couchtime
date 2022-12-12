
import React,{useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LoginRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material';


const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const {palette} = useTheme()

  const pages = ['Home','Movies','Series'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <img style={{height:"40px",width:"30px",marginRight:"8px"}}
         src="poplogo.png" alt="logopop"/>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink 
                to="/" 
                style={{color:"white",textDecoration:"none"}}
                >
                  Home
                  </NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink  
                to="/movies" 
                style={{color:"white",textDecoration:"none"}}
                >Movies
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink 
                to="/"
                style={{color:"white",textDecoration:"none"}}
                >
                  Series
                </NavLink>
              </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:2}}>
            <Button 
               sx={{border:1}}
               startIcon={<LoginRounded/>}
            >
             <Typography>Signup</Typography>
            </Button>
            <Button sx={{border:1}}>Login</Button>
            <Button sx={{border:1}}>Login as Guest</Button>
          {/* <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Login"/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu> */}
        </Box> 
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default Nav
