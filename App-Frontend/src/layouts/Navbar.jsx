import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, InputBase, alpha, Menu, MenuItem, Checkbox, FormControlLabel, Slider } from '@mui/material';
import { ShoppingCart, Search as SearchIcon, FilterList } from '@mui/icons-material';
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

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const navButtonStyle = {
    color: 'text.primary',
    '&:hover': {
      color: '#f87b23'
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white', 
        boxShadow: 1,
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '80px', gap: 2 }}>
        {/* Logo */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            ml: -2
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="HoopKicks Logo"
            sx={{ 
              height: '70px',
              width: 'auto',
              mr: 2
            }}
          />
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: 'white',
            boxShadow: '4px 4px 0px #075364',
            transition: 'all 0.2s ease',
            mr: 2,
            ml: 'auto',
            width: '300px', // Changed from auto/400px to fixed 300px
            flex: '0 0 auto', // Changed from flex: 1 to prevent expanding
            '&:hover': {
              transform: 'translate(-2px, -2px)',
              boxShadow: '6px 6px 0px #075364',
            },
            ...(searchFocus && {
              transform: 'translate(-2px, -2px)',
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
            color: '#075364',
            '&:hover': { color: '#f87b23' }
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

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/men" sx={navButtonStyle}>Men</Button>
          <Button component={Link} to="/women" sx={navButtonStyle}>Women</Button>
          <Button component={Link} to="/about" sx={navButtonStyle}>About Us</Button>
          
          {user?.role === 'admin' ? (
            <Button component={Link} to="/admin" sx={navButtonStyle}>
              Admin Dashboard
            </Button>
          ) : (
            <IconButton component={Link} to="/cart" sx={navButtonStyle}>
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
          
          {user ? (
            <>
              <Typography variant="body1" sx={navButtonStyle}>
                {user.name}
              </Typography>
              <Button 
                onClick={logout}
                sx={navButtonStyle}
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
                  backgroundColor: '#075364',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#075364',
                    color: '#f87b23',
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
                  backgroundColor: '#075364',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#075364',
                    color: '#f87b23',
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
