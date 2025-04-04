import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function Men() {
  const menProducts = [
    { id: 1, name: 'Nike LeBron XX', price: 199.99, image: 'placeholder.jpg' },
    { id: 2, name: 'Jordan XXXVII', price: 185.99, image: 'placeholder.jpg' },
    { id: 3, name: 'KD 16', price: 150.99, image: 'placeholder.jpg' },
    { id: 4, name: 'Curry 10', price: 160.99, image: 'placeholder.jpg' }
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Men's Basketball Shoes
      </Typography>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Brand</InputLabel>
          <Select value="" label="Brand">
            <MenuItem value="nike">Nike</MenuItem>
            <MenuItem value="adidas">Adidas</MenuItem>
            <MenuItem value="jordan">Jordan</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Price</InputLabel>
          <Select value="" label="Price">
            <MenuItem value="low">$0-$100</MenuItem>
            <MenuItem value="mid">$100-$200</MenuItem>
            <MenuItem value="high">$200+</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {menProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
