import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { productAPI } from '../utils/api';
import welcomeImage from '../assets/images/store1.jpg'; 
import mainLogo from '../assets/Logo main.png'; 
import { LocalShipping, Update, ThumbUp } from '@mui/icons-material';
import upcomingTravisScott from '../assets/images/Upcoming-Travis-Scott-Shoes.webp';
import cactusJack from '../assets/images/cactus jack.webp';
import WishlistButton from '../components/WishlistButton';
import BrandLogos from '../components/BrandLogos';

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
      <WishlistButton products={products} />
      {/* Welcome Section */}
      <Box 
        ref={welcomeRef}
        sx={{ 
          backgroundColor: '#075364', 
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
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              boxShadow: '8px 8px 0px #053d4a, 16px 16px 0px rgba(5, 61, 74, 0.2)',
              backgroundColor: '#075364',
              overflow: 'hidden',
              transition: 'all 0.4s ease-in-out',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: 'center',
              minHeight: { xs: 'auto', md: '400px' },
              position: 'relative',
              '&:hover': {
                transform: 'translate(-8px, -8px)',
                boxShadow: '12px 12px 0px #053d4a, 24px 24px 0px rgba(5, 61, 74, 0.2)',
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
                flex: { xs: '1', md: '0 0 50%' },
                p: { xs: 4, md: 6 },
                width: { xs: '100%', md: 'auto' },
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
                  top: { xs: 'auto', md: '10%' },
                  bottom: { xs: 0, md: '10%' },
                  width: { xs: '100%', md: '1px' },
                  height: { xs: '1px', md: '80%' },
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
                  maxWidth: { xs: '300px', md: '500px' },
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
                }}
              />
            </Box>

            <Box
              sx={{
                flex: { xs: '1', md: '0 0 50%' },
                p: { xs: 4, md: 8 },
                transform: inView ? 'translateX(0)' : 'translateX(100%)',
                opacity: inView ? 1 : 0,
                transition: 'all 0.8s ease-out',
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  fontWeight: 900,
                  color: '#f87b23',
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  textAlign: { xs: 'center', md: 'left' },
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: { xs: '50%', md: 0 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
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
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.8,
                  letterSpacing: '0.5px',
                  textAlign: { xs: 'center', md: 'justify' },
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 500
                }}
              >
                Step into greatness with our premium collection of footwear. 
                From the streets to your feet, find your perfect pair that combines 
                style, comfort, and performance.
              </Typography>

              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: 'center',
                mt: 4,
                gap: { xs: 3, sm: 2 }
              }}>
                <Box sx={{ 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}>
                  <LocalShipping sx={{ 
                    fontSize: 40, 
                    color: '#f87b23',
                    mb: 1
                  }} />
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                    Fast Delivery
                  </Typography>
                  <Typography sx={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                    Island-wide Shipping
                  </Typography>
                </Box>

                <Box sx={{ 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}>
                  <Update sx={{ 
                    fontSize: 40, 
                    color: '#f87b23',
                    mb: 1
                  }} />
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                    90 Days Return
                  </Typography>
                  <Typography sx={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                    Easy Returns
                  </Typography>
                </Box>

                <Box sx={{ 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}>
                  <ThumbUp sx={{ 
                    fontSize: 40, 
                    color: '#f87b23',
                    mb: 1
                  }} />
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                    3K+ Reviews
                  </Typography>
                  <Typography sx={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                    Happy Customers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      
      <Box sx={{ 
        mt: 6, 
        px: 0,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 4, md: 0 }
      }}>
        
        <Box sx={{ 
          width: { xs: '100%', md: '35%' },
          pl: { xs: 2, sm: 4, md: 6, lg: 8 },
          pr: { xs: 2, sm: 4, md: 2 }
        }}>
          <Box
            sx={{
              backgroundColor: '#075364',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '8px 8px 0px #053d4a',
              transition: 'transform 0.3s ease',
              height: '100%',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '12px 12px 0px #053d4a',
              }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                p: 3,
                position: 'relative',
                fontSize: '1.5rem',
                display: 'inline-block', 
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%', 
                  height: '4px',
                  backgroundColor: '#f87b23',
                  borderRadius: '2px'
                }
              }}
            >
              Future Releases
            </Typography>
            
            <Box sx={{ p: 3 }}>
              <Box
                component="img"
                src={upcomingTravisScott}
                alt="Travis Scott Collection"
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  mb: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              />
              
              <Stack spacing={2}>
                {[
                  'Travis Scott x Nike Air Jordan 1 Low OG "Velvet Brown"',
                  'Travis Scott x Nike Zoom Field Jaxx "Light Chocolate"',
                  'Travis Scott x Nike Zoom Field Jaxx "Leche Blue"'
                ].map((shoe, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        backgroundColor: 'rgba(248, 123, 35, 0.1)'
                      }
                    }}
                  >
                    <Typography sx={{ color: 'white' }}>
                      {shoe}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#f87b23',
                        display: 'block',
                        mt: 1
                      }}
                    >
                      Coming Soon
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        
        <Box sx={{ 
          width: { xs: '100%', md: '65%' },
          pr: { xs: 2, sm: 4, md: 6, lg: 8 },
          pl: { xs: 2, sm: 4, md: 2 }
        }}>
          <Box
            sx={{
              backgroundColor: '#075364',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '8px 8px 0px #053d4a',
              transition: 'transform 0.3s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '12px 12px 0px #053d4a',
              }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                p: 2,
                position: 'relative',
                fontSize: '1.5rem',
                width: 'fit-content', 
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#f87b23',
                  borderRadius: '2px'
                }
              }}
            >
              Special Offers
            </Typography>
            
            <Box sx={{ 
              p: 2,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}> 
              <Box
                component="img"
                src={cactusJack}
                alt="Cactus Jack Poster"
                sx={{
                  width: '100%',
                  flex: 1,
                  minHeight: '600px', 
                  objectFit: 'contain',
                  borderRadius: '8px',
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              />
              
              <Box
                sx={{ textAlign: 'center' }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#f87b23',
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: '1.3rem'
                  }}
                >
                  FREE CACTUS JACK POSTER
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: 'white',
                    fontSize: '1.1rem'
                  }}
                >
                  With orders over Rs. 100,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Products Section */}
      <Container sx={{ mt: 6, mb: 6 }}> 
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
          Featured Products
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products.map(product => (
              <Grid key={product._id} 
                    item 
                    xs={12} 
                    sm={6} 
                    lg={3}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      
      <BrandLogos />
    </Box>
  );
}
