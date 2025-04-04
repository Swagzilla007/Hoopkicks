import { Container, Typography, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = [
    { id: 1, name: 'Nike Air Jordan', price: 199.99, image: 'placeholder.jpg' },
    { id: 2, name: 'Adidas Pro', price: 159.99, image: 'placeholder.jpg' },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to HoopKicks
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {featuredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
