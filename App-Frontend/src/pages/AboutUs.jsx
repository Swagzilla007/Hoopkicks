import { Container, Typography, Box, Paper, Avatar, Rating, Grid } from '@mui/material';
import storeImage from '../assets/images/storeimage.jpg';
import { FormatQuote } from '@mui/icons-material';

const reviews = [
  {
    name: 'Sashin Madushan',
    rating: 5,
    review: 'Best sneaker store in Chilaw! The collection is amazing and the staff is very knowledgeable. Got my Jordan 1s from here.',
    avatar: 'S'
  },
  {
    name: 'Vinusha Peiris',
    rating: 5,
    review: 'Amazing experience shopping at HoopKicks. They have all the latest releases and the prices are reasonable.',
    avatar: 'V'
  },
  {
    name: 'Sahan Perera',
    rating: 5,
    review: 'Finally found my favorite New Balance sneakers here. The owner Gayathra really knows his stuff!',
    avatar: 'S'
  },
  {
    name: 'Amantha Dissanayake',
    rating: 5,
    review: 'Great store with excellent customer service. The variety of sneakers is impressive.',
    avatar: 'A'
  }
];

export default function AboutUs() {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Store Image and Intro */}
      <Box sx={{ 
        position: 'relative',
        height: { xs: '300px', md: '400px' },
        borderRadius: '12px',
        overflow: 'hidden',
        mb: 6,
        boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
      }}>
        <Box
          component="img"
          src={storeImage}
          alt="HoopKicks Store"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* About Section */}
      <Box sx={{ mb: 6 }}>
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
          Our Story
        </Typography>
        <Typography paragraph sx={{ color: '#075364', fontSize: '1.1rem' }}>
          Welcome to HoopKicks, Chilaw's premier destination for premium sneakers. Founded by Gayathra Chanith, 
          our store has become the go-to place for sneaker enthusiasts in the region. Located in the heart of 
          Chilaw town, we pride ourselves on offering the latest and most exclusive sneaker collections.
        </Typography>
        <Typography paragraph sx={{ color: '#075364', fontSize: '1.1rem' }}>
          At HoopKicks, we understand that sneakers are more than just footwear – they're a statement of style 
          and personality. Our carefully curated collection features top brands like Nike, Adidas, Jordan, 
          New Balance, Asics, and Vans, ensuring that our customers have access to the best sneakers in the market.
        </Typography>
        
        {/* New What We Do Section */}
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#075364',
            mt: 6,
            mb: 3,
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
          What We Do
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
              },
              transition: 'all 0.2s ease'
            }}>
              <Typography variant="h6" sx={{ color: '#075364', mb: 2 }}>
                Premium Collection
              </Typography>
              <Typography sx={{ color: '#075364' }}>
                We source authentic sneakers directly from official suppliers, ensuring our customers 
                get genuine products at competitive prices. Our collection includes limited editions, 
                latest releases, and classic favorites.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
              },
              transition: 'all 0.2s ease'
            }}>
              <Typography variant="h6" sx={{ color: '#075364', mb: 2 }}>
                Expert Service
              </Typography>
              <Typography sx={{ color: '#075364' }}>
                Our knowledgeable staff provides personalized assistance to help you find the perfect 
                pair. We offer size recommendations, style advice, and detailed product information.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
              },
              transition: 'all 0.2s ease'
            }}>
              <Typography variant="h6" sx={{ color: '#075364', mb: 2 }}>
                Customer Care
              </Typography>
              <Typography sx={{ color: '#075364' }}>
                We prioritize customer satisfaction with our 90-day return policy, island-wide shipping, 
                and responsive support team. Our after-sales service ensures a worry-free shopping experience.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
              },
              transition: 'all 0.2s ease'
            }}>
              <Typography variant="h6" sx={{ color: '#075364', mb: 2 }}>
                Community Engagement
              </Typography>
              <Typography sx={{ color: '#075364' }}>
                As a local business in Chilaw, we actively engage with our community through special events, 
                exclusive releases, and collaborations with local sneaker enthusiasts.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#075364',
            mb: 4,
            position: 'relative',
            pb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              backgroundColor: '#f87b23',
              borderRadius: '2px'
            }
          }}
        >
          What Our Customers Say
        </Typography>

        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translate(-4px, -4px)',
                  boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#075364' }}>{review.avatar}</Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#075364' }}>
                      {review.name}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <FormatQuote sx={{ color: '#f87b23', transform: 'rotate(180deg)', mr: 1 }} />
                  <Typography sx={{ color: '#075364', fontStyle: 'italic' }}>
                    {review.review}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
