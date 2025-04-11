import { Box, Container, Paper, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/orders', label: 'Orders' }
  ];

  return (
    <Box>
      <Box sx={{ 
        bgcolor: '#075364',
        mb: 4,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Stack 
            direction="row" 
            spacing={0}
            sx={{ 
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  py: 3,
                  px: 4,
                  textDecoration: 'none',
                  position: 'relative',
                  fontWeight: location.pathname === item.path ? '600' : '400',
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    bgcolor: '#f87b23',
                    transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.2s ease'
                  },
                  '&:hover': {
                    color: location.pathname === item.path ? 'white' : '#f87b23',
                    '&::after': {
                      transform: 'scaleX(1)'
                    }
                  }
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {children}
    </Box>
  );
}
