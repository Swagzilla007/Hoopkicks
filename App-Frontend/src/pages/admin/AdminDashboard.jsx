import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  Box,
  CircularProgress 
} from '@mui/material';
import { 
  Inventory, 
  ShoppingCart, 
  PendingActions, 
  MonetizationOn,
  PersonAdd 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import AdminLayout from '../../layouts/AdminLayout';
import AddAdmin from './AddAdmin';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openAddAdmin, setOpenAddAdmin] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminAPI.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await adminAPI.createAdmin(formData);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setOpenDialog(false);
      setSnackbarMessage('Admin user created successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating admin user');
    }
  };

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
          Admin Dashboard
        </Typography>

        {/* Quick Actions - Modified for horizontal layout */}
        <Box sx={{ 
          mb: 6,
          display: 'flex',
          flexDirection: 'row', // Changed to row
          gap: 2,
          justifyContent: 'center', // Center the buttons
          flexWrap: 'wrap' // Allow wrapping on smaller screens
        }}>
          <Button
            component={Link}
            to="/admin/products"
            variant="contained"
            sx={{
              p: 2,
              flex: '1 1 200px', // Equal width with minimum of 200px
              maxWidth: '300px', // Maximum width for each button
              bgcolor: '#075364',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23',
                transform: 'translate(-2px, -2px)',
                boxShadow: '6px 6px 0px rgba(7, 83, 100, 0.1)',
              }
            }}
          >
            Manage Products
          </Button>

          <Button
            component={Link}
            to="/admin/orders"
            variant="contained"
            sx={{
              p: 2,
              flex: '1 1 200px', // Equal width with minimum of 200px
              maxWidth: '300px', // Maximum width for each button
              bgcolor: '#075364',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23',
                transform: 'translate(-2px, -2px)',
                boxShadow: '6px 6px 0px rgba(7, 83, 100, 0.1)',
              }
            }}
          >
            Manage Orders
          </Button>

          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setOpenAddAdmin(true)}
            sx={{
              p: 2,
              flex: '1 1 200px', // Equal width with minimum of 200px
              maxWidth: '300px', // Maximum width for each button
              bgcolor: '#075364',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23',
                transform: 'translate(-2px, -2px)',
                boxShadow: '6px 6px 0px rgba(7, 83, 100, 0.1)',
              }
            }}
          >
            Add New Admin
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={4}>
          {[
            { icon: <Inventory sx={{ fontSize: 40 }}/>, title: 'Total Products', value: stats?.totalProducts || 0, color: '#4caf50' },
            { icon: <ShoppingCart sx={{ fontSize: 40 }}/>, title: 'Total Orders', value: stats?.totalOrders || 0, color: '#2196f3' },
            { icon: <PendingActions sx={{ fontSize: 40 }}/>, title: 'Pending Orders', value: stats?.pendingOrders || 0, color: '#ff9800' },
            { icon: <MonetizationOn sx={{ fontSize: 40 }}/>, title: 'Total Revenue', value: `Rs. ${(stats?.revenue || 0).toLocaleString()}`, color: '#f87b23' }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  border: '1px solid rgba(7, 83, 100, 0.1)',
                  boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translate(-4px, -4px)',
                    boxShadow: '12px 12px 0px rgba(7, 83, 100, 0.1)',
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Box sx={{ 
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: `${stat.color}10`,
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ 
                  color: '#075364',
                  fontWeight: 'bold',
                  mb: 1
                }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ 
                  color: '#666',
                  fontSize: '0.875rem'
                }}>
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Loading State */}
        {loading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4 
          }}>
            <CircularProgress sx={{ color: '#075364' }} />
          </Box>
        )}

        <AddAdmin 
          open={openAddAdmin}
          onClose={() => setOpenAddAdmin(false)}
        />
      </Container>
    </AdminLayout>
  );
}
