import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function Women() {
  const womenProducts = [
    { id: 1, name: 'Nike Sabrina 1', price: 130.99, image: 'placeholder.jpg' },
    { id: 2, name: 'Jordan XXXVII Low', price: 175.99, image: 'placeholder.jpg' },
    { id: 3, name: 'Dame 8', price: 140.99, image: 'placeholder.jpg' },
    { id: 4, name: 'Trae Young 2', price: 125.99, image: 'placeholder.jpg' }
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Women's Basketball Shoes
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
        {womenProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
