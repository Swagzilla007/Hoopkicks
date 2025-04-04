import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import { adminAPI } from '../../utils/api';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <AdminLayout>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
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
      </Container>
    </AdminLayout>
  );
}
