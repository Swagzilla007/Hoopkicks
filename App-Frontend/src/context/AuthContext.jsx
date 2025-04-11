import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { Box, Typography, Dialog } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      setUser(data.user);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (email, password, name) => {
    try {
      const { data } = await authAPI.register({ email, password, name });
      setUser(data.user);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setShowLogoutMessage(true); // Show logout message
      setTimeout(() => {
        setUser(null);
        setShowLogoutMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
      <Dialog
        open={showLogoutMessage}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        <Box sx={{ 
          bgcolor: '#075364',
          p: 4,
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <LogoutOutlined sx={{ fontSize: 80, color: '#f87b23', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Logged Out Successfully
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Thank you for visiting HoopKicks
          </Typography>
        </Box>
      </Dialog>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
