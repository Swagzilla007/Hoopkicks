import { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, CircularProgress,
  TextField, Button, Dialog, Alert, Snackbar
} from '@mui/material';
import { adminAPI } from '../../utils/api';
import AdminLayout from '../../layouts/AdminLayout';

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

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <AdminLayout>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Button 
            variant="contained" 
            onClick={() => setOpenDialog(true)}
          >
            Add New Admin
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Products</Typography>
              <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {stats?.totalProducts || 0}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Orders</Typography>
              <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {stats?.totalOrders || 0}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Pending Orders</Typography>
              <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {stats?.pendingOrders || 0}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                ${stats?.revenue?.toFixed(2) || '0.00'}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <Box component="form" onSubmit={handleAddAdmin} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create New Admin User
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              margin="normal"
              required
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                fullWidth
              >
                Create Admin
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setOpenDialog(false)}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </AdminLayout>
  );
}
