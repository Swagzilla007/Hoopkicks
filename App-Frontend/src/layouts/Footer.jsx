import { Box, Container, Typography, Grid, Link, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(180deg, #075364 0%, #053d4a 100%)',
        color: 'white',
        py: 6,
        mt: 'auto',
        borderTop: '4px solid #f87b23'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              HoopKicks
            </Typography>
            <Typography variant="body1" sx={{ color: '#e0e0e0', mb: 3, fontSize: '1.1rem' }}>
              Your one-stop shop for premium basketball footwear.
            </Typography>
            
            {/* Social Media Icons */}
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: 'white', '&:hover': { color: '#f87b23' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: '#f87b23' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: '#f87b23' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { color: '#f87b23' } }}>
                <YouTube />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link href="/men" sx={{ 
                color: '#e0e0e0', 
                textDecoration: 'none',
                fontSize: '1.1rem',
                '&:hover': { color: '#f87b23' } 
              }}>
                Men's Collection
              </Link>
              <Link href="/women" sx={{ 
                color: '#e0e0e0',
                textDecoration: 'none', 
                fontSize: '1.1rem',
                '&:hover': { color: '#f87b23' } 
              }}>
                Women's Collection
              </Link>
              <Link href="/cart" sx={{ 
                color: '#e0e0e0',
                textDecoration: 'none', 
                fontSize: '1.1rem',
                '&:hover': { color: '#f87b23' } 
              }}>
                Shopping Cart
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1.5} sx={{ color: '#e0e0e0' }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Email: support@hoopkicks.com
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Phone: (123) 456-7890
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Address: 123 Sneaker Street,
                <br />Basketball City, BC 12345
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Payment Methods */}
        <Box sx={{ 
          mt: 4, 
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          pt: 3
        }}>
          <Stack 
            direction="row" 
            spacing={3} 
            justifyContent="center" 
            alignItems="center"
            mb={3}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="Visa"
              sx={{ 
                height: 25,
                transition: 'transform 0.2s',
                backgroundColor: 'white',
                padding: '6px 10px',
                borderRadius: '4px',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
              alt="Mastercard"
              sx={{ 
                height: 25,
                transition: 'transform 0.2s',
                backgroundColor: 'white',
                padding: '6px 10px',
                borderRadius: '4px',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
              alt="American Express"
              sx={{ 
                height: 25,
                transition: 'transform 0.2s',
                backgroundColor: 'white',
                padding: '6px 10px',
                borderRadius: '4px',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            />
          </Stack>
        </Box>

        {/* Copyright */}
        <Box sx={{ 
          mt: 2, 
          pb: 3,
          textAlign: 'center' 
        }}>
          <Typography variant="body1" sx={{ color: '#bdbdbd', fontSize: '1rem' }}>
            © {new Date().getFullYear()} HoopKicks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
