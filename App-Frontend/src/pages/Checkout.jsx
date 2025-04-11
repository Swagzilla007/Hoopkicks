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
      const orderData = {
        items: items.map(item => ({
          product: item._id || item.id,
          size: item.size,
          quantity: item.quantity,
          price: item.price // Price is already in LKR
        })),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone
        },
        totalAmount: getCartTotal() // Total is already in LKR
      };

      // Store order data in localStorage
      localStorage.setItem('orderData', JSON.stringify(orderData));
      
      // Navigate to payment page
      navigate('/payment');
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
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8, minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          color: '#075364',
          position: 'relative',
          pb: 2,
          mb: 4,
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
        Checkout
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 6, // Increased gap between containers
        height: '100%',
        px: { xs: 2, sm: 4 } // Added horizontal padding
      }}>
        {/* Left Side - Shipping Information */}
        <Box sx={{ flex: '1 1 60%' }}>
          <Paper elevation={0} sx={{ 
            p: { xs: 4, md: 6 }, // Increased padding
            height: '100%',
            borderRadius: '16px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translate(-4px, -4px)',
              boxShadow: '12px 12px 0px rgba(7, 83, 100, 0.1)',
            }
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#075364',
                mb: 4,
                fontWeight: 'bold',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#f87b23',
                  borderRadius: '2px'
                }
              }}
            >
              Shipping Information
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}> {/* Increased grid spacing */}
                {/* First Name & Last Name */}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(7, 83, 100, 0.02)',
                        transition: 'all 0.3s ease',
                        '& fieldset': { 
                          borderWidth: '1px',
                          borderColor: 'rgba(7, 83, 100, 0.1)' 
                        },
                        '&:hover fieldset': { 
                          borderColor: '#075364',
                          borderWidth: '1px'
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          '& fieldset': { 
                            borderColor: '#f87b23',
                            borderWidth: '2px'
                          }
                        },
                        '& input': {
                          padding: '16px',
                          color: '#075364'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { 
                          color: '#f87b23',
                          fontWeight: '500'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        margin: '8px 0 0 4px'
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>

        {/* Right Side - Order Summary */}
        <Box sx={{ flex: '1 1 40%' }}>
          <Paper elevation={0} sx={{ 
            p: { xs: 4, md: 6 }, // Increased padding
            height: '100%',
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
            position: 'sticky',
            top: '2rem'
          }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#075364',
                mb: 3,
                fontWeight: 'bold'
              }}
            >
              Order Summary
            </Typography>

            <List sx={{ 
              mb: 2,
              flex: 1, // Added to allow list to grow
              overflowY: 'auto' // Added scrolling for overflow
            }}>
              {items.map((item) => (
                <Box key={`${item.id}-${item.size}`}>
                  <ListItem sx={{ px: 0 }}>
                    <Box
                      component="img"
                      src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'contain',
                        borderRadius: '8px',
                        mr: 2,
                        bgcolor: '#f5f5f5'
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Size: US {item.size} | Qty: {item.quantity}
                        </Typography>
                      }
                    />
                    <Typography sx={{ color: '#f87b23', fontWeight: 600 }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </ListItem>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </List>

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
              onClick={handleSubmit}
              sx={{
                bgcolor: '#075364',
                color: 'white',
                '&:hover': {
                  bgcolor: '#075364',
                  color: '#f87b23'
                }
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Box>
      </Box>

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
