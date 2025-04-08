import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { productAPI } from '../utils/api';
import welcomeImage from '../assets/images/store1.jpg'; // Import the store image
import mainLogo from '../assets/Logo main.png'; // Add this import

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productAPI.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { ref: welcomeRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <Box>
      <HeroSlider />
      
      {/* Welcome Section */}
      <Box 
        ref={welcomeRef}
        sx={{ 
          backgroundColor: '#f8f8f8',
          py: 8,
          borderBottom: '1px solid #eaeaea',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #075364 0%, #f87b23 100%)'
          }
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              boxShadow: '8px 8px 0px #075364, 16px 16px 0px rgba(7, 83, 100, 0.2)',
              backgroundColor: 'white',
              overflow: 'hidden',
              transition: 'all 0.4s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              minHeight: '400px',
              position: 'relative',
              '&:hover': {
                transform: 'translate(-8px, -8px)',
                boxShadow: '12px 12px 0px #075364, 24px 24px 0px rgba(7, 83, 100, 0.2)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #f87b23 0%, #075364 100%)'
              }
            }}
          >
            <Box
              sx={{
                flex: '0 0 50%',
                p: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                transform: inView ? 'translateX(0)' : 'translateX(-100%)',
                opacity: inView ? 1 : 0,
                transition: 'all 0.8s ease-out',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '10%',
                  bottom: '10%',
                  width: '1px',
                  background: 'linear-gradient(180deg, transparent, #075364, transparent)'
                }
              }}
            >
              <Box
                component="img"
                src={mainLogo}
                alt="HoopKicks Logo"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                }}
              />
            </Box>

            <Box
              sx={{
                flex: '0 0 50%',
                p: 8,
                transform: inView ? 'translateX(0)' : 'translateX(100%)',
                opacity: inView ? 1 : 0,
                transition: 'all 0.8s ease-out',
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  color: '#075364',
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#f87b23',
                    borderRadius: '2px'
                  }
                }}
              >
                Welcome to HoopKicks
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#666',
                  lineHeight: 1.8,
                  letterSpacing: '0.5px',
                  textAlign: 'justify'
                }}
              >
                Step into greatness with our premium collection of basketball footwear. 
                From the court to the streets, find your perfect pair that combines 
                style, comfort, and performance.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Products Section */}
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Featured Products
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
