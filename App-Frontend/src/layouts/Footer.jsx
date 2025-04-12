import { Box, Container, Typography, Grid, Link, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, LocationOn, Phone, Email } from '@mui/icons-material';

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
              Your one-stop shop for premium sneakers.
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
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: '#f87b23' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  No.1, Mugunuwatawana, Chilaw
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: '#f87b23' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  +94 776390513
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: '#f87b23' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  wkgayathra@gmail.com
                </Typography>
              </Box>
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
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
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
              src="https://brand.mastercard.com/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
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
            <Box
              component="img"
              src="https://prod-site-cdn.paykoko.com/bnpl-site-cms-dev/kokoIframeImages/MAINLogo-HD_H_21.01.05.png"
              alt="Koko"
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
