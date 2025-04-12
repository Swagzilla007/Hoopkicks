import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Alert,
  Dialog,
  DialogContent
} from '@mui/material';
import { LocalShipping, Payment as PaymentIcon, CheckCircle, ShoppingBag } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';

const paymentMethods = {
  cod: {
    name: 'Cash on Delivery',
    logo: 'https://cdn-icons-png.flaticon.com/512/2331/2331717.png',
    description: 'Pay with cash upon delivery'
  },
  visa: {
    name: 'Visa',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
  },
  mastercard: {
    name: 'Mastercard',
    logo: 'https://brand.mastercard.com/content/dam/mccom/global/logos/logo-mastercard-mobile.svg'
  },
  amex: {
    name: 'American Express',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg'
  },
  koko: {
    name: 'Koko Pay',
    logo: 'https://prod-site-cdn.paykoko.com/bnpl-site-cms-dev/kokoIframeImages/MAINLogo-HD_H_21.01.05.png'
  }
};

export default function Payment() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const orderData = JSON.parse(localStorage.getItem('orderData'));

  if (!orderData) {
    navigate('/cart');
    return null;
  }

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    try {
      setProcessing(true);
      const finalOrderData = {
        ...orderData,
        user: user.id,
        paymentMethod: selectedMethod,
        totalAmount: selectedMethod === 'koko' ? 
          orderData.totalAmount * 0.95 : orderData.totalAmount
      };

      const response = await orderAPI.createOrder(finalOrderData);
      
      if (response.status === 201) {
        setShowSuccessDialog(true);
        setTimeout(() => {
          clearCart();
          localStorage.removeItem('orderData');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        {/* Order Progress */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '24px',
            left: '10%',
            right: '10%',
            height: '2px',
            backgroundColor: 'rgba(7, 83, 100, 0.1)',
            zIndex: 0
          }
        }}>
          {[
            { icon: LocalShipping, label: 'Shipping' },
            { icon: PaymentIcon, label: 'Payment' },
            { icon: CheckCircle, label: 'Confirmation' }
          ].map((step, index) => (
            <Box key={step.label} sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <Box sx={{ 
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: index <= 1 ? '#f87b23' : 'rgba(7, 83, 100, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}>
                <step.icon sx={{ color: index <= 1 ? 'white' : '#075364' }} />
              </Box>
              <Typography sx={{ 
                color: index <= 1 ? '#075364' : 'rgba(7, 83, 100, 0.5)',
                fontWeight: index <= 1 ? 600 : 400
              }}>
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Payment Methods */}
          <Box sx={{ flex: '1 1 60%' }}>
            <Paper elevation={0} sx={{ 
              p: 4,
              borderRadius: '16px',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '12px 12px 0px rgba(7, 83, 100, 0.1)',
              }
            }}>
              <Typography variant="h5" sx={{ 
                color: '#075364',
                mb: 3,
                fontWeight: 'bold',
                position: 'relative',
                pb: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#f87b23',
                  borderRadius: '2px'
                }
              }}>
                Select Payment Method
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

              <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                {Object.entries(paymentMethods).map(([key, method]) => (
                  <Paper key={key} elevation={0} sx={{
                    mb: 2,
                    border: `2px solid ${selectedMethod === key ? '#f87b23' : 'rgba(7, 83, 100, 0.1)'}`,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#f87b23',
                      bgcolor: 'rgba(248, 123, 35, 0.02)'
                    }
                  }}>
                    <FormControlLabel
                      value={key}
                      control={<Radio 
                        sx={{
                          '&.Mui-checked': {
                            color: '#f87b23'
                          }
                        }}
                      />}
                      label={
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 2,
                          py: 1
                        }}>
                          <Box
                            component="img"
                            src={method.logo}
                            alt={method.name}
                            sx={{
                              height: key === 'visa' ? '20px' : '32px',
                              width: 'auto'
                            }}
                          />
                          {key === 'koko' && (
                            <Typography variant="caption" sx={{ 
                              color: '#f87b23',
                              bgcolor: 'rgba(248, 123, 35, 0.1)',
                              px: 1,
                              py: 0.5,
                              borderRadius: '4px',
                              fontWeight: 500
                            }}>
                              5% OFF
                            </Typography>
                          )}
                        </Box>
                      }
                      sx={{
                        mx: 1,
                        '& .MuiFormControlLabel-label': {
                          width: '100%'
                        }
                      }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </Paper>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: '1 1 40%' }}>
            <Paper elevation={0} sx={{ 
              p: 4,
              borderRadius: '16px',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#075364', mb: 3 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#666' }}>Subtotal</Typography>
                  <Typography sx={{ color: '#075364' }}>
                    Rs. {orderData.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#666' }}>Shipping</Typography>
                  <Typography sx={{ color: '#075364' }}>Free</Typography>
                </Box>
                {selectedMethod === 'koko' && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#f87b23' }}>Koko Discount (5%)</Typography>
                    <Typography sx={{ color: '#f87b23' }}>
                      - Rs. {(orderData.totalAmount * 0.05).toLocaleString()}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#075364' }}>Total</Typography>
                <Typography variant="h6" sx={{ color: '#f87b23' }}>
                  Rs. {(selectedMethod === 'koko' 
                    ? orderData.totalAmount * 0.95 
                    : orderData.totalAmount).toLocaleString()}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePaymentSubmit}
                disabled={!selectedMethod || processing}
                sx={{
                  bgcolor: '#075364',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#075364',
                    color: '#f87b23'
                  }
                }}
              >
                {processing ? 'Processing...' : 'Complete Order'}
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        <DialogContent>
          <Box sx={{ 
            bgcolor: '#075364',
            p: 4,
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.5s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            <ShoppingBag sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
            <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Order Placed Successfully!
            </Typography>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Thank you for shopping with HoopKicks
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
