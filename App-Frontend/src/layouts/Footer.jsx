import { Box, Container, Typography, Grid, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(180deg, #424242 0%,rgb(5, 5, 5) 100%)',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              HoopKicks
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
              Your one-stop shop for premium basketball footwear.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/men" sx={{ color: '#e0e0e0', mb: 1, '&:hover': { color: 'white' } }}>
                Men's Collection
              </Link>
              <Link href="/women" sx={{ color: '#e0e0e0', mb: 1, '&:hover': { color: 'white' } }}>
                Women's Collection
              </Link>
              <Link href="/cart" sx={{ color: '#e0e0e0', mb: 1, '&:hover': { color: 'white' } }}>
                Shopping Cart
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
              Email: support@hoopkicks.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
            © {new Date().getFullYear()} HoopKicks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
