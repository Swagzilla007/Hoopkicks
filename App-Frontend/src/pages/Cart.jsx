import { Container, Typography, Button, Box, Card, CardContent, IconButton, Divider, Alert, Stack, Snackbar } from '@mui/material';
import { Add, Remove, DeleteOutline, ShoppingBagOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleQuantityChange = (id, size, newQuantity, maxStock) => {
    if (newQuantity < 1) {
      setSnackbar({ 
        open: true, 
        message: 'Quantity cannot be less than 1',
        severity: 'error'
      });
      return;
    }

    if (maxStock && newQuantity > maxStock) {
      setSnackbar({ 
        open: true, 
        message: `Only ${maxStock} items available in stock`,
        severity: 'error'
      });
      return;
    }

    updateQuantity(id, size, newQuantity);
    setSnackbar({ 
      open: true, 
      message: 'Cart updated',
      severity: 'success'
    });
  };

  const handleRemove = (id, size) => {
    removeFromCart(id, size);
    setSnackbar({ open: true, message: 'Item removed from cart', severity: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          color: '#075364',
          position: 'relative',
          pb: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '60px',
            height: '4px',
            backgroundColor: '#f87b23',
            borderRadius: '2px'
          }
        }}
      >
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: '#075364'
        }}>
          <ShoppingBagOutlined sx={{ fontSize: 60, color: '#f87b23', mb: 2 }} />
          <Typography variant="h6" gutterBottom>Your cart is empty</Typography>
          <Button 
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              mt: 2,
              bgcolor: '#075364',
              color: 'white',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Cart Items */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            {items.map(item => (
              <Card 
                key={`${item.id}-${item.size}`}
                elevation={0}
                sx={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(7, 83, 100, 0.1)',
                  boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translate(-4px, -4px)',
                    boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', gap: 3, p: 3 }}>
                  {/* Product Image */}
                  <Box
                    component="img"
                    src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      borderRadius: '8px',
                      bgcolor: '#f5f5f5'
                    }}
                  />
                  
                  {/* Product Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#075364', mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                      Size: US {item.size}
                    </Typography>
                    <Typography sx={{ color: '#f87b23', fontWeight: 600 }}>
                      Rs. {item.price.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Quantity Controls */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid rgba(7, 83, 100, 0.2)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1, item.stock)}
                        sx={{ color: '#075364' }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ 
                        px: 2,
                        py: 0.5,
                        minWidth: '40px',
                        textAlign: 'center',
                        color: '#075364'
                      }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1, item.stock)}
                        sx={{ color: '#075364' }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <IconButton 
                      onClick={() => handleRemove(item.id, item.size)}
                      sx={{ 
                        color: '#ff3d00',
                        '&:hover': { color: '#d32f2f' }
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Order Summary */}
          <Box sx={{ width: { xs: '100%', md: '300px' } }}>
            <Card 
              elevation={0}
              sx={{ 
                position: 'sticky',
                top: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(7, 83, 100, 0.1)',
                boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#075364', mb: 3 }}>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#666' }}>Subtotal</Typography>
                    <Typography sx={{ color: '#075364' }}>
                      Rs. {getCartTotal().toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#666' }}>Shipping</Typography>
                    <Typography sx={{ color: '#075364' }}>Free</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#075364' }}>Total</Typography>
                  <Typography variant="h6" sx={{ color: '#f87b23' }}>
                    Rs. {getCartTotal().toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/checkout')}
                  sx={{
                    bgcolor: '#075364',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#075364',
                      color: '#f87b23'
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity || 'success'} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
