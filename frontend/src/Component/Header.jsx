import * as React from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Main from './Main';
import LogOutConfirmation from './LogOutConfirmation';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const pages = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Add Todo',
    link: '/todo',
  },
];
const settings = [{ profile: 'Profile' }, { logout: 'Logout' }];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  return (
    <>
      {email && (
        <AppBar position="static" sx={{ background: '#0b2c51', width: '100%' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <BookmarkAddedIcon
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                MY TODO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appba"
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
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.home}</Typography>
                      {email !==
                      <Typography textAlign="center">{page.login}</Typography>}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <BookmarkAddedIcon
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TODO
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'end',
                }}
              >
                {pages.map((page) => (
                  <Box
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ margin: '10px', color: 'red' }}
                  >
                    <Link to={page.link}>
                      <Typography textAlign="center" sx={{ color: 'white' }}>
                        {page.name}
                      </Typography>
                    </Link>
                  </Box>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {email && (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="avatar" src="/avatar" />
                    </IconButton>
                  </Tooltip>
                )}
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
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          navigate('/home');
                        }}
                      >
                        {setting.profile}
                      </Typography>

                      <LogOutConfirmation {...setting} />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {email !==
              (
                <AccountCircleIcon
                  sx={{
                    fontSize: '35px',
                    textAlign: 'center',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate('/login');
                  }}
                />
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};
export default ResponsiveAppBar;
