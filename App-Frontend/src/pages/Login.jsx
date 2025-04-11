import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert,
  Link,
  Snackbar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { CheckCircle } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setSnackbar({ 
        open: true, 
        message: 'Welcome back to HoopKicks!', 
        severity: 'success' 
      });

      // Wait longer before navigating
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={0} sx={{ 
        p: 4,
        borderRadius: '12px',
        boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
        border: '1px solid rgba(7, 83, 100, 0.1)'
      }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ 
          color: '#075364',
          fontWeight: 'bold',
          position: 'relative',
          pb: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#f87b23',
            borderRadius: '2px'
          }
        }}>
          Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2, mt: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                '&:hover fieldset': { borderColor: '#075364' },
                '&.Mui-focused fieldset': { borderColor: '#f87b23' }
              },
              '& .MuiInputLabel-root': {
                color: '#075364',
                '&.Mui-focused': { color: '#f87b23' }
              }
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                '&:hover fieldset': { borderColor: '#075364' },
                '&.Mui-focused fieldset': { borderColor: '#f87b23' }
              },
              '& .MuiInputLabel-root': {
                color: '#075364',
                '&.Mui-focused': { color: '#f87b23' }
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: '#075364',
              color: 'white',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23'
              }
            }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link 
              component={RouterLink} 
              to="/register"
              sx={{ 
                color: '#075364',
                textDecoration: 'none',
                '&:hover': { color: '#f87b23' }
              }}
            >
              Don't have an account? Register here
            </Link>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Box sx={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '500px',
          bgcolor: '#075364',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translate(-50%, -30%)' },
            to: { opacity: 1, transform: 'translate(-50%, -50%)' }
          }
        }}>
          <CheckCircle sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
            Welcome Back!
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
            Great to see you again at HoopKicks
          </Typography>
        </Box>
      </Snackbar>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          display: snackbar.open ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            bgcolor: '#075364',
            p: 4,
            borderRadius: '12px',
            textAlign: 'center',
            width: '90%',
            maxWidth: '400px',
            animation: 'fadeIn 0.5s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <CheckCircle sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Welcome Back!
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Great to see you again at HoopKicks
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
