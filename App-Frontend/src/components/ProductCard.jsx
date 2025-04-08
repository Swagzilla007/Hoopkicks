import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
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

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={getImageUrl(product.image)}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Rs. {product.price.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          {user?.role !== 'admin' && (
            <Button size="small" color="primary" onClick={handleClick}>
              Add to Cart
            </Button>
          )}
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
          <Button 
            size="small" 
            color="primary" 
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity || 'success'} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
