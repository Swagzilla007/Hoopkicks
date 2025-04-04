import { Box, Container, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={location.pathname} 
          onChange={handleChange}
        >
          <Tab label="Dashboard" value="/admin" />
          <Tab label="Products" value="/admin/products" />
          <Tab label="Orders" value="/admin/orders" />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
}
