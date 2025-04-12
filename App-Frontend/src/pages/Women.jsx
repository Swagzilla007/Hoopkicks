import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import WishlistButton from '../components/WishlistButton';
import womenBanner from '../assets/images/womenpage.webp';
import BrandLogos from '../components/BrandLogos';

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
        case 'low': return price < 15000;
        case 'mid': return price >= 15000 && price <= 30000;
        case 'high': return price > 30000;
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
    <Box>
      <Container sx={{ mt: 4 }}>
        <WishlistButton products={products} />
        {/* Banner Image */}
        <Box
          sx={{
            width: '100%',
            height: { xs: '200px', sm: '300px', md: '400px' }, 
            mb: 4,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0 
          }}
        >
          <Box
            component="img"
            src={womenBanner}
            alt="Women's Collection"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', 
              objectPosition: 'center 60%', 
              transform: 'scale(0.95)', 
              transition: 'transform 0.3s ease'
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
          Women's Sneakers
        </Typography>
        <Box sx={{ 
          mb: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          p: 3,
          borderRadius: '12px',
          backgroundColor: 'white',
          border: '1px solid rgba(7, 83, 100, 0.1)',
          boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)'
        }}>
          <Typography variant="subtitle1" sx={{ 
            color: '#075364',
            fontWeight: 600,
            mr: 2
          }}>
            Filters:
          </Typography>
          
          <FormControl sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              backgroundColor: 'rgba(7, 83, 100, 0.02)',
              '& fieldset': {
                borderColor: 'rgba(7, 83, 100, 0.1)',
                transition: 'all 0.2s ease'
              },
              '&:hover fieldset': {
                borderColor: '#075364'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#f87b23'
              }
            },
            '& .MuiSelect-select': {
              paddingTop: '12px',
              paddingBottom: '12px'
            },
            '& .MuiInputLabel-root': {
              color: '#075364',
              '&.Mui-focused': {
                color: '#f87b23'
              }
            }
          }}>
            <InputLabel>Brand</InputLabel>
            <Select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              label="Brand"
            >
              <MenuItem value="">All Brands</MenuItem>
              {['Nike', 'Adidas', 'Jordan', 'New Balance'].map((b) => (
                <MenuItem key={b} value={b.toLowerCase()} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: brand === b.toLowerCase() ? 'rgba(7, 83, 100, 0.1)' : 'transparent'
                  }}>
                    {brand === b.toLowerCase() && (
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#f87b23' 
                      }} />
                    )}
                  </Box>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              backgroundColor: 'rgba(7, 83, 100, 0.02)',
              '& fieldset': {
                borderColor: 'rgba(7, 83, 100, 0.1)',
                transition: 'all 0.2s ease'
              },
              '&:hover fieldset': {
                borderColor: '#075364'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#f87b23'
              }
            },
            '& .MuiSelect-select': {
              paddingTop: '12px',
              paddingBottom: '12px'
            },
            '& .MuiInputLabel-root': {
              color: '#075364',
              '&.Mui-focused': {
                color: '#f87b23'
              }
            }
          }}>
            <InputLabel>Price Range</InputLabel>
            <Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              label="Price Range"
            >
              <MenuItem value="">All Prices</MenuItem>
              <MenuItem value="low" sx={{ color: '#4caf50' }}>Under Rs. 15,000</MenuItem>
              <MenuItem value="mid" sx={{ color: '#f87b23' }}>Rs. 15,000 - Rs. 30,000</MenuItem>
              <MenuItem value="high" sx={{ color: '#075364' }}>Above Rs. 30,000</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>

      <Container sx={{ mt: 6, mb: 6 }}>
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

    
      <BrandLogos />
    </Box>
  );
}
