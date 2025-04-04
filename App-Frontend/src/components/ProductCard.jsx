import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToCart = (size) => {
    addToCart(product, size);
    handleClose();
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name} 
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          Add to Cart
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {[7, 8, 9, 10, 11, 12].map((size) => (
            <MenuItem key={size} onClick={() => handleAddToCart(size)}>
              Size {size}
            </MenuItem>
          ))}
        </Menu>
        <Button size="small" color="primary" onClick={() => navigate(`/product/${product.id}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
