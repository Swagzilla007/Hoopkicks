import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  LocalShipping,
  AccessTime,
  Inventory,
} from '@mui/icons-material';
import { orderAPI } from '../utils/api';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await orderAPI.getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'processing': return '#2196f3';
      case 'shipped': return '#4caf50';
      case 'delivered': return '#009688';
      default: return '#666';
    }
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
        Order Details
      </Typography>

      <Grid container spacing={4}>
       
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ 
            p: 4, 
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            '&:hover': {
              transform: 'translate(-4px, -4px)',
              boxShadow: '12px 12px 0px rgba(7, 83, 100, 0.1)',
            },
            transition: 'all 0.3s ease'
          }}>
            <Typography variant="h6" sx={{ 
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
              Customer Details
            </Typography>
            
            <List sx={{ mb: 4 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'rgba(7, 83, 100, 0.1)' }}>
                    <Person sx={{ color: '#075364' }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography sx={{ color: '#666', fontSize: '0.875rem', mb: 0.5 }}>
                      Full Name
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#075364', fontWeight: 500, fontSize: '1rem' }}>
                      {order.shippingAddress.name}
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'rgba(7, 83, 100, 0.1)' }}>
                    <Email sx={{ color: '#075364' }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography sx={{ color: '#666', fontSize: '0.875rem', mb: 0.5 }}>
                      Email Address
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#075364', fontWeight: 500, fontSize: '1rem' }}>
                      {order.shippingAddress.email}
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'rgba(7, 83, 100, 0.1)' }}>
                    <Phone sx={{ color: '#075364' }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography sx={{ color: '#666', fontSize: '0.875rem', mb: 0.5 }}>
                      Contact Number
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#075364', fontWeight: 500, fontSize: '1rem' }}>
                      {order.shippingAddress.phone}
                    </Typography>
                  }
                />
              </ListItem>
            </List>

            <Typography variant="h6" sx={{ 
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
              Delivery Address
            </Typography>

            <Box sx={{ p: 2, bgcolor: 'rgba(7, 83, 100, 0.02)', borderRadius: '8px' }}>
              <Typography sx={{ color: '#075364', fontWeight: 500, mb: 1 }}>
                {order.shippingAddress.address}
              </Typography>
              <Typography sx={{ color: '#666' }}>
                {order.shippingAddress.city}
              </Typography>
              <Typography sx={{ color: '#666' }}>
                Postal Code: {order.shippingAddress.postalCode}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ color: '#075364', mb: 3, fontWeight: 'bold' }}>
              Order Status
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShipping sx={{ color: getStatusColor(order.status), mr: 1 }} />
              <Chip 
                label={order.status.toUpperCase()} 
                sx={{ 
                  bgcolor: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                  fontWeight: 600
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ color: '#666', mr: 1 }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

       
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ 
            p: 3,
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
          }}>
            <Typography variant="h6" sx={{ color: '#075364', mb: 3, fontWeight: 'bold' }}>
              Order Items
            </Typography>

            {order.items.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box
                    component="img"
                    src={item.product.image}
                    alt={item.product.name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      borderRadius: '8px',
                      bgcolor: '#f5f5f5'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: '#075364', fontWeight: 500, mb: 1 }}>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Size: US {item.size} | Quantity: {item.quantity}
                    </Typography>
                    <Typography sx={{ color: '#f87b23', fontWeight: 600 }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(7, 83, 100, 0.05)',
                    px: 2,
                    borderRadius: '8px'
                  }}>
                    <Inventory sx={{ color: '#075364', mr: 1 }} />
                    <Typography sx={{ color: '#075364' }}>
                      QTY: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                {index < order.items.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#666' }}>Subtotal</Typography>
              <Typography sx={{ color: '#075364' }}>
                Rs. {order.totalAmount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#666' }}>Shipping</Typography>
              <Typography sx={{ color: '#075364' }}>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ color: '#075364' }}>Total</Typography>
              <Typography variant="h6" sx={{ color: '#f87b23' }}>
                Rs. {order.totalAmount.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
