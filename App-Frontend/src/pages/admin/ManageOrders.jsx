import { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  CircularProgress, Alert, IconButton, Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { adminAPI } from '../../utils/api';
import AdminLayout from '../../layouts/AdminLayout';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await adminAPI.deleteOrder(orderId);
        fetchOrders();
      } catch (err) {
        setError('Failed to delete order');
      }
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
      <Container>
        <Typography variant="h4" gutterBottom>Manage Orders</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography>{order.shippingAddress?.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {order.shippingAddress?.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.items.map((item, idx) => (
                      <Typography key={idx} variant="body2">
                        {item.product?.name} - Size {item.size} (x{item.quantity}) - Rs. {item.price.toLocaleString()}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>Rs. {order.totalAmount?.toLocaleString()}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="error"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </AdminLayout>
  );
}
