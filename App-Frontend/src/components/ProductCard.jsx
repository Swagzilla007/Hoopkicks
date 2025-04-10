import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Menu, MenuItem, Snackbar, Alert, IconButton, Box } from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart, Visibility } from '@mui/icons-material'; // Removed LocalAtm icon
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`;
};

// Add payment logo URLs
const paymentLogos = {
  visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  mastercard: 'https://brand.mastercard.com/content/dam/mccom/global/logos/logo-mastercard-mobile.svg',
  amex: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg'
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
    <Card sx={{ width: '300px', height: '400px', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Image Container */}
      <Box sx={{ height: '200px', position: 'relative' }}>
        <CardMedia
          component="img"
          image={getImageUrl(product.image)}
          alt={product.name}
          sx={{ 
            height: '100%',
            width: '100%',
            objectFit: 'contain'
          }}
        />
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

      {/* Content Container */}
      <Box sx={{ position: 'relative', height: '200px', backgroundColor: 'white' }}>
        {/* Sliding Content */}
        <Box 
          sx={{ 
            position: 'absolute',
            width: '100%',
            backgroundColor: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-60px)',
              '& .hidden-content': {
                maxHeight: '100px', // Increased to accommodate both logos and Koko offer
                opacity: 1,
                visibility: 'visible'
              }
            }
          }}
        >
          {/* Regular Content */}
          <CardContent sx={{ p: 2 }}>
            <Typography gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>
              {product.name}
            </Typography>
            <Typography sx={{ color: '#f87b23', fontWeight: 700, fontSize: '1.2rem' }}>
              Rs. {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>

            {/* Hidden Content Container */}
            <Box 
              className="hidden-content"
              sx={{ 
                maxHeight: 0,
                opacity: 0,
                visibility: 'hidden',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Payment Logos */}
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 2,
                mb: 1
              }}>
                {Object.entries(paymentLogos).map(([name, url]) => (
                  <Box
                    key={name}
                    component="img"
                    src={url}
                    alt={`${name} logo`}
                    sx={{
                      height: name === 'visa' ? '24px' : '32px',
                      width: 'auto',
                      filter: 'none'
                    }}
                  />
                ))}
              </Box>

              {/* Modified Koko Offer */}
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
                backgroundColor: 'rgba(248, 123, 35, 0.1)',
                borderRadius: '4px',
                p: 1
              }}>
                <Typography variant="caption" sx={{ color: '#075364', fontWeight: 'bold' }}>
                  5% OFF for
                </Typography>
                <Box
                  component="img"
                  src="https://prod-site-cdn.paykoko.com/bnpl-site-cms-dev/kokoIframeImages/MAINLogo-HD_H_21.01.05.png"
                  alt="Koko"
                  sx={{
                    height: '20px',
                    width: 'auto'
                  }}
                />
                <Typography variant="caption" sx={{ color: '#075364', fontWeight: 'bold' }}>
                  payments
                </Typography>
              </Box>
            </Box>

          </CardContent>
        </Box>

        {/* Fixed Button Section */}
        <Box sx={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          zIndex: 2
        }}>
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
