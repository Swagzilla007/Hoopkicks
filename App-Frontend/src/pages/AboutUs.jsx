import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function AboutUs() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          About HoopKicks
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Welcome to HoopKicks, your premier destination for basketball footwear. We are passionate about providing athletes and enthusiasts with the highest quality basketball shoes to enhance their game and style both on and off the court.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <StorefrontIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Premium Selection
              </Typography>
              <Typography>
                Carefully curated collection of the best basketball shoes from top brands.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Fast Delivery
              </Typography>
              <Typography>
                Quick and reliable shipping to get your shoes to you as soon as possible.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <SupportAgentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Expert Support
              </Typography>
              <Typography>
                Dedicated customer service team to assist you with any questions.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At HoopKicks, we strive to provide basketball enthusiasts with the perfect combination of performance, comfort, and style. Our mission is to help every player find their perfect pair of basketball shoes, enhancing their game and confidence on the court.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph>
            • Authentic Products: All our shoes are 100% genuine and sourced directly from manufacturers
            <br />
            • Wide Selection: Extensive range of sizes and styles for men and women
            <br />
            • Expert Advice: Our team can help you find the perfect shoe for your playing style
            <br />
            • Competitive Pricing: Best value for premium basketball footwear
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
