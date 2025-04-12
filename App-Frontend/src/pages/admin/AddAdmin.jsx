import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Typography,
  Box
} from '@mui/material';
import { adminAPI } from '../../utils/api';

export default function AddAdmin({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      
      const { confirmPassword, ...adminData } = formData;
      await adminAPI.createAdmin(adminData);
      setSuccess(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          border: '1px solid rgba(7, 83, 100, 0.1)',
          boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
        }
      }}
    >
      <DialogTitle>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#075364',
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
          }}
        >
          Add New Admin
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Admin created successfully!</Alert>}
          
          <TextField
            fullWidth
            label="Name"
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
            error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
            helperText={formData.password !== formData.confirmPassword && formData.confirmPassword !== '' ? 'Passwords do not match' : ''}
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#075364',
            '&:hover': { color: '#f87b23' }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: '#075364',
            color: 'white',
            '&:hover': {
              bgcolor: '#075364',
              color: '#f87b23'
            }
          }}
        >
          Add Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
