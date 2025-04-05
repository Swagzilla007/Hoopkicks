import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Radio, RadioGroup,
  FormControlLabel, TextField, Button, Divider, Grid, Alert
} from '@mui/material';
import { orderAPI } from '../utils/api';

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  if (!state?.orderData) {
    navigate('/cart');
    return null;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { data } = await orderAPI.createOrder(state.orderData);
      navigate('/order-success', { 
        state: { 
          message: "Thank you for your purchase! We'll contact you soon with your order details."
        },
        replace: true
      });
    } catch (error) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Select Payment Method
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel 
              value="card" 
              control={<Radio />} 
              label="Credit/Debit Card" 
            />
            <FormControlLabel 
              value="cod" 
              control={<Radio />} 
              label="Cash on Delivery" 
            />
          </RadioGroup>

          {paymentMethod === 'card' && (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Holder Name"
                    value={cardDetails.cardHolder}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date (MM/YY)"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Total Amount: Rs. {state.orderData.totalAmount.toLocaleString()}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : paymentMethod === 'card' ? 'Pay Now' : 'Place Order'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
