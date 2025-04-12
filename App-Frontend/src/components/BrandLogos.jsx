import { Box, Container, Typography } from '@mui/material';

const brandLogos = {
  nike: 'https://pngimg.com/d/nike_PNG11.png', 
  adidas: 'https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.png',
  jordan: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/640px-Jumpman_logo.svg.png',
  'new balance': 'https://cdn.freebiesupply.com/logos/large/2x/new-balance-2-logo-png-transparent.png',
  asics: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/2560px-Asics_Logo.svg.png',
  vans: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-logo.svg/2560px-Vans-logo.svg.png'
};

export default function BrandLogos() {
  return (
    <Box sx={{ 
      py: 1, 
      backgroundColor: '#075364',
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
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            color: 'white',  
            mb: 2,
            fontWeight: 'bold',
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
          Featured Brands
        </Typography>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          flexWrap: 'wrap'
        }}>
          {Object.entries(brandLogos).map(([name, url]) => (
            <Box
              key={name}
              component="img"
              src={url}
              alt={`${name} logo`}
              sx={{
                height: name === 'nike' ? { xs: '35px', sm: '35px', md: '40px' } :  
                       name === 'adidas' ? { xs: '35px', sm: '40px', md: '45px' } :  
                       name === 'new balance' ? { xs: '50px', sm: '60px', md: '70px' } :  
                       name === 'asics' ? { xs: '35px', sm: '45px', md: '50px' } :  
                       name === 'vans' ? { xs: '35px', sm: '40px', md: '45px' } :  
                       { xs: '40px', sm: '50px', md: '60px' },  
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  opacity: 1,
                  filter: 'invert(56%) sepia(75%) saturate(1887%) hue-rotate(346deg) brightness(101%) contrast(96%)'
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
