import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, InputBase, alpha, Menu, MenuItem, Checkbox, FormControlLabel, Slider } from '@mui/material';
import { ShoppingCart, Search as SearchIcon, FilterList, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logopng.png';
import { useState } from 'react';

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = items.length;

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchHover, setSearchHover] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      // First clear local storage
      localStorage.clear();
      
      // Then call the logout API
      await logout();
      
      // Close mobile menu if open
      handleMobileMenuClose();
      
      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navButtonStyle = {
    color: 'white',
    '&:hover': {
      color: '#f87b23'
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#075364', // Changed to green
        boxShadow: 1,
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '80px', gap: 2, justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            flex: '0 0 auto'  // Prevent logo from growing
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="HoopKicks Logo"
            sx={{ 
              height: '70px',
              width: 'auto',
              mr: 2,
              filter: 'brightness(0) invert(1)' // This makes the logo white
            }}
          />
        </Box>

        {/* Search Bar - Center Positioned */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' }, // Changed from md to lg
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: 'white',
            boxShadow: '4px 4px 0px #075364',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(-50%) translate(-2px, -2px)',
              boxShadow: '6px 6px 0px #075364',
            },
            ...(searchFocus && {
              transform: 'translateX(-50%) translate(-2px, -2px)',
              boxShadow: '6px 6px 0px #075364',
            })
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center',
            pl: 2,
            pr: 1,
            cursor: 'pointer',
            color: searchHover || searchFocus ? '#f87b23' : '#075364',
            transition: 'color 0.2s ease'
          }}
            onMouseEnter={() => setSearchHover(true)}
            onMouseLeave={() => setSearchHover(false)}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search products…"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                pl: 6,
                pr: 2,
                py: 1,
                color: '#000',
                '&::placeholder': {
                  color: '#666',
                  opacity: 1
                }
              }
            }}
          />
        </Box>

        {/* Filter Button */}
        <IconButton 
          sx={{ 
            color: '#f87b23', // Changed to orange
            '&:hover': { 
              color: '#e66a0f' // Darker orange on hover 
            }
          }}
          onClick={handleFilterClick}
        >
          <FilterList />
        </IconButton>

        {/* Filter Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              p: 2,
              width: 280,
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '4px 4px 0px #075364',
            }
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#075364', fontWeight: 'bold' }}>
            Filters
          </Typography>
          
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: '#075364' }}>
            Brands
          </Typography>
          {['Nike', 'Adidas', 'Jordan', 'New Balance'].map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox 
                  sx={{
                    color: '#075364',
                    '&.Mui-checked': { color: '#f87b23' }
                  }}
                />
              }
              label={brand}
              sx={{ display: 'block', mb: 0.5 }}
            />
          ))}

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: '#075364' }}>
            Price Range
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              step={1000}
              sx={{
                color: '#075364',
                '& .MuiSlider-thumb:hover': {
                  boxShadow: `0 0 0 8px ${alpha('#f87b23', 0.16)}`
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#075364',
              color: 'white',
              '&:hover': {
                backgroundColor: '#075364',
                color: '#f87b23'
              }
            }}
            onClick={handleFilterClose}
          >
            Apply Filters
          </Button>
        </Menu>

        {/* Right Side Navigation */}
        <Box sx={{ 
          display: { xs: 'none', lg: 'flex' }, // Changed from md to lg
          alignItems: 'center', 
          gap: 2,
          flex: '0 0 auto'  // Prevent right side from growing
        }}>
          <Button component={Link} to="/men" sx={navButtonStyle}>Men</Button>
          <Button component={Link} to="/women" sx={navButtonStyle}>Women</Button>
          <Button component={Link} to="/about" sx={navButtonStyle}>About Us</Button>
          
          {user?.role === 'admin' ? (
            <Button component={Link} to="/admin" sx={navButtonStyle}>
              Admin Dashboard
            </Button>
          ) : (
            <IconButton component={Link} to="/cart" sx={navButtonStyle}>
              <Badge 
                badgeContent={cartItemCount} 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#f87b23',
                    color: 'white'
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
          
          {user ? (
            <>
              <Typography variant="body1" sx={{ color: 'white' }}>
                {user.name}
              </Typography>
              <Button 
                onClick={handleLogout} // Changed from logout to handleLogout
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    color: '#f87b23'
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/login" 
                variant="contained"
                sx={{ 
                  backgroundColor: '#f87b23',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#e66a0f',
                    color: 'white' // Keep text white on hover
                  }
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained"
                sx={{ 
                  backgroundColor: '#f87b23',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#e66a0f',
                    color: 'white' // Keep text white on hover
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ 
            display: { xs: 'flex', lg: 'none' }, // Changed from md to lg
            ml: 'auto',
            color: 'white'
          }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: '100%',
              maxWidth: '300px'
            }
          }}
        >
          {/* Search Bar in Mobile Menu */}
          <MenuItem sx={{ p: 2 }}>
            <Box sx={{ width: '100%' }}>
              <InputBase
                placeholder="Search products…"
                fullWidth
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 1
                }}
              />
            </Box>
          </MenuItem>

          {/* Navigation Links */}
          <MenuItem 
            component={Link} 
            to="/men"
            onClick={handleMobileMenuClose}
            sx={{ color: '#075364' }}
          >
            Men
          </MenuItem>
          <MenuItem 
            component={Link} 
            to="/women"
            onClick={handleMobileMenuClose}
            sx={{ color: '#075364' }}
          >
            Women
          </MenuItem>
          <MenuItem 
            component={Link} 
            to="/about"
            onClick={handleMobileMenuClose}
            sx={{ color: '#075364' }}
          >
            About Us
          </MenuItem>

          {/* Cart or Admin Dashboard */}
          {user?.role === 'admin' ? (
            <MenuItem 
              component={Link} 
              to="/admin"
              onClick={handleMobileMenuClose}
              sx={{ color: '#075364' }}
            >
              Admin Dashboard
            </MenuItem>
          ) : (
            <MenuItem 
              component={Link} 
              to="/cart"
              onClick={handleMobileMenuClose}
              sx={{ color: '#075364' }}
            >
              Cart ({cartItemCount})
            </MenuItem>
          )}

          {/* Auth Buttons */}
          {user ? (
            <>
              <MenuItem sx={{ color: '#075364' }}>
                {user.name}
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleLogout();
                  handleMobileMenuClose();
                }}
                sx={{ color: '#f87b23' }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem 
                component={Link} 
                to="/login"
                onClick={handleMobileMenuClose}
                sx={{ color: '#f87b23' }}
              >
                Login
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/register"
                onClick={handleMobileMenuClose}
                sx={{ color: '#f87b23' }}
              >
                Register
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
