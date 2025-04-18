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
      
      localStorage.clear();
      
      
      await logout();
      
      
      handleMobileMenuClose();
      
      
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
        backgroundColor: '#075364', 
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
            flex: '0 0 auto'  
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
              filter: 'brightness(0) invert(1)' 
            }}
          />
        </Box>

        {/* Search Bar - Center Positioned */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' }, 
            position: 'absolute',
            left: user?.role === 'admin' ? '35%' : '50%', 
            transform: user?.role === 'admin' ? 
              'translateX(-35%)' : 
              'translateX(-50%)', 
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: 'white',
            boxShadow: '4px 4px 0px #075364',
            
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

        {/* Filter Button - Hide on mobile */}
        <IconButton 
          sx={{ 
            color: '#f87b23', 
            position: user?.role === 'admin' ? 'relative' : 'static', 
            left: user?.role === 'admin' ? '-120px' : 'auto', 
            display: { xs: 'none', lg: 'flex' }, 
            '&:hover': { 
              color: '#e66a0f'  
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
          display: { xs: 'none', lg: 'flex' }, 
          alignItems: 'center', 
          gap: 2,
          flex: '0 0 auto'  
        }}>
          <Button component={Link} to="/men" sx={navButtonStyle}>Men</Button>
          <Button component={Link} to="/women" sx={navButtonStyle}>Women</Button>
          <Button component={Link} to="/about" sx={navButtonStyle}>About Us</Button>
          
          {user?.role === 'admin' ? (
            <Button 
              component={Link} 
              to="/admin" 
              variant="contained"
              sx={{ 
                backgroundColor: '#f87b23',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#e66a0f',
                  color: 'white'
                }
              }}
            >
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
                onClick={handleLogout} 
                variant="contained"
                sx={{ 
                  backgroundColor: '#f87b23',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#e66a0f',
                    color: 'white'
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
                    color: 'white' 
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
                    color: 'white' 
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
            display: { xs: 'flex', lg: 'none' }, 
            ml: 'auto',
            color: 'white'
          }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu - Updated Styling */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: '100%',
              maxWidth: '300px',
              borderRadius: '12px',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
              overflow: 'hidden'
            }
          }}
        >
          {/* Search Bar in Mobile Menu */}
          <MenuItem sx={{ p: 2, borderBottom: '1px solid rgba(7, 83, 100, 0.1)' }}>
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <InputBase
                placeholder="Search products…"
                fullWidth
                sx={{
                  border: '1px solid rgba(7, 83, 100, 0.1)',
                  borderRadius: '8px',
                  p: 1,
                  '&:hover': {
                    borderColor: '#075364'
                  }
                }}
              />
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClick(e);
                }}
                sx={{ 
                  color: '#f87b23',
                  '&:hover': { color: '#e66a0f' }
                }}
              >
                <FilterList />
              </IconButton>
            </Box>
          </MenuItem>

          {/* Navigation Links - Updated Styling */}
          {['Men', 'Women', 'About'].map((item) => (
            <MenuItem 
              key={item}
              component={Link} 
              to={`/${item.toLowerCase()}`}  // Changed from 'about-us' to 'about'
              onClick={handleMobileMenuClose}
              sx={{ 
                p: 2,
                color: '#075364',
                transition: 'all 0.2s ease',
                borderBottom: '1px solid rgba(7, 83, 100, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(7, 83, 100, 0.05)',
                  color: '#f87b23'
                }
              }}
            >
              {item === 'About' ? 'About Us' : item} {/* Display "About Us" but use "about" for route */}
            </MenuItem>
          ))}

          {/* Cart or Admin Dashboard */}
          {user?.role === 'admin' ? (
            <MenuItem 
              component={Link} 
              to="/admin"
              onClick={handleMobileMenuClose}
              sx={{ 
                p: 2,
                color: 'white',
                bgcolor: '#f87b23',
                '&:hover': {
                  bgcolor: '#e66a0f'
                }
              }}
            >
              Admin Dashboard
            </MenuItem>
          ) : (
            <MenuItem 
              component={Link} 
              to="/cart"
              onClick={handleMobileMenuClose}
              sx={{ 
                p: 2,
                color: '#075364',
                borderBottom: '1px solid rgba(7, 83, 100, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(7, 83, 100, 0.05)',
                  color: '#f87b23'
                }
              }}
            >
              Cart ({cartItemCount})
            </MenuItem>
          )}

          {/* Auth Buttons */}
          {user ? (
            <MenuItem 
              onClick={() => {
                handleLogout();
                handleMobileMenuClose();
              }}
              sx={{ 
                p: 2,
                color: 'white',
                bgcolor: '#f87b23',
                '&:hover': {
                  bgcolor: '#e66a0f'
                }
              }}
            >
              Logout
            </MenuItem>
          ) : (
            <>
              <MenuItem 
                component={Link} 
                to="/login"
                onClick={handleMobileMenuClose}
                sx={{ 
                  p: 2,
                  color: '#075364',
                  borderBottom: '1px solid rgba(7, 83, 100, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(7, 83, 100, 0.05)',
                    color: '#f87b23'
                  }
                }}
              >
                Login
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/register"
                onClick={handleMobileMenuClose}
                sx={{ 
                  p: 2,
                  color: '#075364',
                  '&:hover': {
                    bgcolor: 'rgba(7, 83, 100, 0.05)',
                    color: '#f87b23'
                  }
                }}
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
