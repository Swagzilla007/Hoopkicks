import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Menu, MenuItem, Snackbar, Alert, IconButton, Box } from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`;
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(product._id));
  }, [product._id]);

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToCart = (size) => {
    const sizeData = product.sizes.find(s => s.size === size);
    if (!sizeData || sizeData.stock === 0) {
      setSnackbar({
        open: true,
        message: 'Product is out of stock',
        severity: 'error'
      });
      return;
    }

    const productWithId = {
      ...product,
      id: product._id // Ensure we're using MongoDB _id
    };
    addToCart(productWithId, size);
    handleClose();
    setSnackbar({
      open: true,
      message: `${product.name} added to cart successfully!`,
      severity: 'success'
    });
  };

  const handleWishlist = (event) => {
    event.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter(id => id !== product._id);
    } else {
      newWishlist = [...wishlist, product._id];
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    
    // Dispatch custom event to notify WishlistButton
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <Card sx={{ 
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }
    }}>
      {/* Static Image Section */}
      <Box sx={{ position: 'relative', height: 200 }}>
        <CardMedia
          component="img"
          height="200"
          image={getImageUrl(product.image)}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
        {/* Heart Icon */}
        <IconButton
          onClick={handleWishlist}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 3,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          {isWishlisted ? (
            <Favorite sx={{ color: '#f87b23' }} />
          ) : (
            <FavoriteBorder sx={{ color: '#075364' }} />
          )}
        </IconButton>
      </Box>

      {/* Sliding Content Section */}
      <Box 
        sx={{ 
          position: 'relative',
          backgroundColor: 'white',
          zIndex: 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-60px)', // Slides up over image
            '& .hidden-content': {
              maxHeight: '200px',
              opacity: 1,
              visibility: 'visible'
            }
          }
        }}
      >
        <CardContent sx={{ p: 2, pb: '8px !important' }}>
          <Typography gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: '#f87b23', fontWeight: 700, fontSize: '1.2rem' }}>
            Rs. {product.price.toLocaleString()}
          </Typography>
          
          {/* Hidden Content */}
          <Box 
            className="hidden-content"
            sx={{ 
              maxHeight: 0,
              opacity: 0,
              visibility: 'hidden',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              px: 2,
              pb: 1
            }}
          >
            <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
              {product.description}
            </Typography>
            <Typography variant="caption" sx={{ color: '#075364', display: 'block', mt: 0.5 }}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}'s Shoe
            </Typography>
          </Box>
        </CardContent>
      </Box>

      {/* Static Button Section */}
      <Box sx={{ mt: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
        <CardActions sx={{ p: 1, gap: 1 }}>
          {user?.role !== 'admin' && (
            <Button 
              size="small" 
              onClick={handleClick}
              startIcon={<ShoppingCart sx={{ fontSize: '1.2rem' }} />}
              sx={{
                bgcolor: '#075364',
                color: 'white',
                flex: 1,
                fontSize: '0.875rem',
                minWidth: '120px',
                '&:hover': {
                  bgcolor: '#075364',
                  color: '#f87b23'
                }
              }}
            >
              Cart
            </Button>
          )}
          <Button 
            size="small" 
            onClick={() => navigate(`/product/${product._id}`)}
            startIcon={<Visibility sx={{ fontSize: '1.2rem' }} />}
            sx={{
              bgcolor: '#075364',
              color: 'white',
              flex: 1,
              fontSize: '0.875rem',
              minWidth: '120px',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23'
              }
            }}
          >
            Details
          </Button>
        </CardActions>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Array.isArray(product.sizes) && product.sizes.map((sizeData) => (
          <MenuItem 
            key={sizeData.size} 
            onClick={() => handleAddToCart(sizeData.size)}
            disabled={sizeData.stock === 0}
          >
            Size {sizeData.size} - {sizeData.stock} available
          </MenuItem>
        ))}
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity || 'success'} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
