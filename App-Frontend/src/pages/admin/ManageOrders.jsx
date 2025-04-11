import { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  CircularProgress, Alert, IconButton, Box, Grid, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Delete, Person, Email, Phone, LocationOn, ExpandMore, ExpandLess, Inventory, CheckCircle, LocalShipping, PendingActions, Cached } from '@mui/icons-material';
import { adminAPI } from '../../utils/api';
import AdminLayout from '../../layouts/AdminLayout';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, orderId: null });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.getAllOrders();
      console.log('Fetched orders:', data); // Debug log
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrder(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, orderId: id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminAPI.deleteOrder(deleteDialog.orderId);
      fetchOrders();
      setDeleteDialog({ open: false, orderId: null });
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: '#4caf50',
          icon: <PendingActions sx={{ color: '#4caf50', mr: 1 }} />,
          label: 'Pending'
        };
      case 'processing':
        return {
          color: '#ff9800',
          icon: <Cached sx={{ color: '#ff9800', mr: 1 }} />,
          label: 'Processing'
        };
      case 'shipped':
        return {
          color: '#2196f3',
          icon: <LocalShipping sx={{ color: '#2196f3', mr: 1 }} />,
          label: 'Shipped'
        };
      case 'delivered':
        return {
          color: '#075364',
          icon: <CheckCircle sx={{ color: '#075364', mr: 1 }} />,
          label: 'Delivered'
        };
      default:
        return {
          color: '#666',
          icon: null,
          label: status
        };
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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
          Manage Orders
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {orders.map((order) => (
          <Paper
            key={order._id}
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: '12px',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
              overflow: 'hidden'
            }}
          >
            {/* Order Header */}
            <Box
              sx={{
                p: 3,
                cursor: 'pointer',
                bgcolor: expandedOrder === order._id ? 'rgba(7, 83, 100, 0.02)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onClick={() => handleExpandOrder(order._id)}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getStatusInfo(order.status).icon}
                  <Typography sx={{ 
                    color: getStatusInfo(order.status).color,
                    fontWeight: 600,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    Order #{order._id}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              {expandedOrder === order._id ? <ExpandLess /> : <ExpandMore />}
            </Box>

            {/* Expanded Content */}
            {expandedOrder === order._id && (
              <Box sx={{ p: 3, borderTop: '1px solid rgba(7, 83, 100, 0.1)' }}>
                <Grid container spacing={4}>
                  {/* Customer Information */}
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ color: '#075364', mb: 2, fontWeight: 600 }}>
                      Customer Details
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Person sx={{ color: '#075364', mr: 1 }} />
                        <Box>
                          <Typography variant="body2" sx={{ color: '#666' }}>Name</Typography>
                          <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                            {order.shippingAddress.name}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ color: '#075364', mr: 1 }} />
                        <Box>
                          <Typography variant="body2" sx={{ color: '#666' }}>Email</Typography>
                          <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                            {order.shippingAddress.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Phone sx={{ color: '#075364', mr: 1 }} />
                        <Box>
                          <Typography variant="body2" sx={{ color: '#666' }}>Phone</Typography>
                          <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                            {order.shippingAddress.phone}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                        <LocationOn sx={{ color: '#075364', mr: 1, mt: 0.5 }} />
                        <Box>
                          <Typography variant="body2" sx={{ color: '#666' }}>Shipping Address</Typography>
                          <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                            {order.shippingAddress.address}
                          </Typography>
                          <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Order Items */}
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ color: '#075364', mb: 2, fontWeight: 600 }}>
                      Order Items
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {order.items.map((item, index) => (
                        <Box key={index}>
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            {/* Replace image with placeholder box */}
                            <Box sx={{
                              width: 80,
                              height: 80,
                              bgcolor: '#f5f5f5',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#075364'
                            }}>
                              <Inventory /> {/* Using Material UI icon */}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Size: US {item.size} | Quantity: {item.quantity}
                              </Typography>
                              <Typography sx={{ color: '#f87b23', fontWeight: 600 }}>
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                          {index < order.items.length - 1 && <Divider sx={{ my: 2 }} />}
                        </Box>
                      ))}
                    </Box>

                    {/* Order Summary */}
                    <Box sx={{ 
                      p: 2,
                      bgcolor: 'rgba(7, 83, 100, 0.02)',
                      borderRadius: '8px'
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography sx={{ color: '#666' }}>Total Amount</Typography>
                        <Typography sx={{ color: '#f87b23', fontWeight: 600 }}>
                          Rs. {order.totalAmount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#666' }}>Payment Method</Typography>
                        <Typography sx={{ color: '#075364', fontWeight: 500 }}>
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Existing action buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        ))}
      </Container>

      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, orderId: null })}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#075364' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, orderId: null })}
            sx={{ color: '#075364' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              bgcolor: '#ff3d00',
              color: 'white',
              '&:hover': {
                bgcolor: '#d32f2f'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
