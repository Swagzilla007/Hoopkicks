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
  Snackbar,
  Dialog,
  DialogContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Celebration } from '@mui/icons-material';
import logoWide from '../assets/Logo wide.png';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      setSnackbar({
        open: true,
        message: `Welcome to HoopKicks, ${formData.name}!`,
        severity: 'success'
      });
      setTimeout(() => {
        navigate('/');
      }, 3000); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{
        width: '100%',
        height: '600px',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
        border: '1px solid rgba(7, 83, 100, 0.1)'
      }}>
        
        <Box sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box
            component="img"
            src={logoWide}
            alt="HoopKicks Logo"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>

        
        <Box sx={{
          width: '50%',
          bgcolor: 'white',
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography 
            variant="h4" 
            align="left"
            sx={{ 
              color: '#075364',
              fontWeight: 'bold',
              mb: 4,
              position: 'relative',
              pb: 2,
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
            Create Account
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                py: 1.5,
                '&:hover': {
                  bgcolor: '#075364',
                  color: '#f87b23'
                }
              }}
            >
              Register
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              component={RouterLink}
              to="/login"
              sx={{ 
                color: '#075364',
                textDecoration: 'none',
                '&:hover': { color: '#f87b23' }
              }}
            >
              Already have an account? Login here
            </Button>
          </Box>
        </Box>
      </Box>

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
          <Celebration sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
            Welcome to HoopKicks!
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
            {`Great to have you with us, ${formData.name}!`}
          </Typography>
        </Box>
      </Snackbar>
      <Dialog 
        open={snackbar.open}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          },
          '& .MuiBackdrop-root': {  
            backgroundColor: 'transparent'
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
            animation: 'popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            '@keyframes popIn': {
              '0%': { 
                opacity: 0,
                transform: 'scale(0.8)',
              },
              '100%': { 
                opacity: 1,
                transform: 'scale(1)',
              }
            }
          }}>
            <Celebration sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
            <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Welcome to HoopKicks!
            </Typography>
            <Typography variant="h6" sx={{ color: 'white' }}>
              {`Great to have you with us, ${formData.name}!`}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
