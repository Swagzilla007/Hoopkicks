import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import WishlistButton from '../components/WishlistButton';
import menBanner from '../assets/images/menhome.jpg';
import BrandLogos from '../components/BrandLogos';

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productAPI.getProductsByCategory('men');
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
        case 'low': return price < 15000;
        case 'mid': return price >= 15000 && price <= 30000;
        case 'high': return price > 30000;
        default: return true;
      }
    });

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
        <WishlistButton products={products} />
        {/* Banner Image */}
        <Box
          sx={{
            width: '100%',
            height: { xs: '200px', sm: '300px', md: '400px' }, // Responsive height
            mb: 4,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Box
            component="img"
            src={menBanner}
            alt="Men's Collection"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%' // Adjust vertical position
            }}
          />
        </Box>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            color: '#075364',
            position: 'relative',
            pb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: '#f87b23',
              borderRadius: '2px'
            }
          }}
        >
          Men's Sneakers
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ 
            minWidth: 120, 
            mr: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(7, 83, 100, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#075364',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#f87b23',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#075364',
              '&.Mui-focused': {
                color: '#f87b23',
              },
            },
          }}>
            <InputLabel>Brand</InputLabel>
            <Select value={brand} onChange={(e) => setBrand(e.target.value)} label="Brand">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="nike">Nike</MenuItem>
              <MenuItem value="adidas">Adidas</MenuItem>
              <MenuItem value="jordan">Jordan</MenuItem>
              <MenuItem value="new balance">New Balance</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ 
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(7, 83, 100, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#075364',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#f87b23',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#075364',
              '&.Mui-focused': {
                color: '#f87b23',
              },
            },
          }}>
            <InputLabel>Price</InputLabel>
            <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} label="Price">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Under Rs. 15,000</MenuItem>
              <MenuItem value="mid">Rs. 15,000 - Rs. 30,000</MenuItem>
              <MenuItem value="high">Above Rs. 30,000</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>

      <Container sx={{ mt: 6, mb: 6 }}> {/* Added mb: 6 for spacing */}
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Moved BrandLogos to bottom */}
      <BrandLogos />
    </Box>
  );
}
