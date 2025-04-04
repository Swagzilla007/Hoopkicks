import { Container, Typography, List, ListItem, ListItemText, Button, IconButton, Box, Snackbar } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const navigate = useNavigate();

  const handleQuantityChange = (id, size, newQuantity) => {
    updateQuantity(id, size, newQuantity);
    setSnackbar({ open: true, message: 'Cart updated' });
  };

  const handleRemove = (id, size) => {
    removeFromCart(id, size);
    setSnackbar({ open: true, message: 'Item removed from cart' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {items.map(item => (
              <ListItem 
                key={`${item.id}-${item.size}`}
                secondaryAction={
                  <IconButton onClick={() => handleRemove(item.id, item.size)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={`${item.name} (Size: ${item.size})`}
                  secondary={`$${item.price}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                  <IconButton onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}>
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h6" gutterBottom>
              Total: ${getCartTotal().toFixed(2)}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
