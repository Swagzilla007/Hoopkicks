import { Box, Container, Typography, Grid, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              HoopKicks
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for premium basketball footwear.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/men" color="inherit" sx={{ mb: 1 }}>Men's Collection</Link>
              <Link href="/women" color="inherit" sx={{ mb: 1 }}>Women's Collection</Link>
              <Link href="/cart" color="inherit" sx={{ mb: 1 }}>Shopping Cart</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: support@hoopkicks.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} HoopKicks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
