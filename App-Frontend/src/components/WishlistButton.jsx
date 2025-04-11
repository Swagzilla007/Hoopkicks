import { useState, useEffect } from 'react';
import { IconButton, Badge, Dialog, DialogTitle, DialogContent, Grid, Slide, Box } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import ProductCard from './ProductCard';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export default function WishlistButton({ products }) {
  const [open, setOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    };

    loadWishlist();
    // Add event listener for storage changes
    window.addEventListener('storage', loadWishlist);
    window.addEventListener('wishlistUpdated', loadWishlist);

    return () => {
      window.removeEventListener('storage', loadWishlist);
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);
  
  const wishlistedProducts = products.filter(product => wishlist.includes(product._id));

  return (
    <>
      <IconButton 
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: 100,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: 3,
          '&:hover': {
            animation: `${pulse} 1s infinite`
          }
        }}
      >
        <Badge 
          badgeContent={wishlistedProducts.length} 
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#075364', // Changed to theme green
              color: 'white'
            }
          }}
        >
          <Favorite sx={{ color: '#f87b23' }} />
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'left' }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#075364',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Favorite sx={{ color: '#f87b23' }} /> My Wishlist
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {wishlistedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Box sx={{ transform: 'scale(0.95)' }}>
                  <ProductCard product={product} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
