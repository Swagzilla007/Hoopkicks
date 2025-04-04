import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { items } = useCart();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          HoopKicks
        </Typography>
        <Button color="inherit" component={Link} to="/men">Men</Button>
        <Button color="inherit" component={Link} to="/women">Women</Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
