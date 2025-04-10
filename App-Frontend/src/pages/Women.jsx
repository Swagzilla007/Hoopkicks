import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import WishlistButton from '../components/WishlistButton';

export default function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productAPI.getProductsByCategory('women');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => !brand || product.brand.toLowerCase() === brand)
    .filter(product => {
      if (!priceRange) return true;
      const price = product.price;
      switch (priceRange) {
        case 'low': return price <= 100;
        case 'mid': return price > 100 && price <= 200;
        case 'high': return price > 200;
        default: return true;
      }
    });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <WishlistButton products={products} />
      <Typography variant="h4" gutterBottom>
        Women's Basketball Shoes
      </Typography>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Brand</InputLabel>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)} label="Brand">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="nike">Nike</MenuItem>
            <MenuItem value="adidas">Adidas</MenuItem>
            <MenuItem value="jordan">Jordan</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Price</InputLabel>
          <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} label="Price">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">$0-$100</MenuItem>
            <MenuItem value="mid">$100-$200</MenuItem>
            <MenuItem value="high">$200+</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
