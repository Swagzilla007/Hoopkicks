import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Menu, MenuItem, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToCart = (size) => {
    addToCart(product, size);
    handleClose();
    setSnackbarOpen(true);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${product.price}
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
            {product.sizes.map((size) => (
              <MenuItem key={size} onClick={() => handleAddToCart(size)}>
                Size {size}
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
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={`${product.name} added to cart successfully!`}
      />
    </>
  );
}
