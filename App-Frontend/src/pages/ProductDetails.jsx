import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Card,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [size, setSize] = useState('');
  const { addToCart } = useCart();
  
  const product = {
    id,
    name: 'Nike LeBron XX',
    price: 199.99,
    description: 'The Nike LeBron XX basketball shoes feature responsive cushioning and robust support for explosive plays on the court.',
    sizes: [7, 8, 9, 10, 11, 12],
    image: '/placeholder.jpg',
    brand: 'Nike',
    color: 'Black/Gold'
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, size);
  };

  if (!product) return null;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Brand: {product.brand}</Typography>
            <Typography variant="subtitle1">Color: {product.color}</Typography>
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select value={size} onChange={handleSizeChange} label="Size">
              {product.sizes.map((size) => (
                <MenuItem key={size} value={size}>US {size}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            sx={{ mt: 2 }}
            disabled={!size}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
