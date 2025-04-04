import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const orderData = {
          items: items.map(item => ({
            product: item._id || item.id,
            size: item.size,
            quantity: item.quantity,
            price: Number(item.price)
          })),
          shippingAddress: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            phone: formData.phone
          },
          totalAmount: Number(getCartTotal().toFixed(2))
        };

        const { data } = await orderAPI.createOrder(orderData);
        setOrderMessage("Order placed successfully! We'll contact you soon regarding your order. Thank you for shopping with us!");
        setOpenDialog(true);
        // Clear cart only after user clicks "Continue Shopping"
      } catch (error) {
        setErrors({ 
          general: error.response?.data?.message || 'Error placing order' 
        });
      }
    }
  };

  const handleClose = () => {
    clearCart(); // Clear cart when dialog is closed
    setOpenDialog(false);
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Your cart is empty. Please add items before checkout.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Shipping Information</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="postalCode"
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List>
              {items.map((item) => (
                <ListItem key={`${item.id}-${item.size}`}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Size: ${item.size} | Quantity: ${item.quantity}`}
                  />
                  <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${getCartTotal().toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Dialog 
        open={openDialog} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'success.main' }}>
          Order Confirmation
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" gutterBottom color="success.main">
              Success!
            </Typography>
            <Typography>
              {orderMessage}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            variant="contained" 
            color="primary"
            fullWidth
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
