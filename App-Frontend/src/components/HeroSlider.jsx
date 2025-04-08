import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import nikeAnim from '../assets/images/nike animation.webp';
import newBalance from '../assets/images/newbalance 1.jpg';
import adidas from '../assets/images/adidas1.avif';
import store from '../assets/images/store1.jpg';
import samba from '../assets/images/samba2.webp';

const slides = [
  {
    url: nikeAnim,
    title: 'Nike Basketball Collection'
  },
  {
    url: newBalance,
    title: 'New Balance Basketball'
  },
  {
    url: adidas,
    title: 'Adidas Basketball'
  },
  {
    url: store,
    title: 'Visit Our Store'
  },
  {
    url: samba,
    title: 'Adidas Samba Collection'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%',
      height: { xs: '300px', sm: '400px', md: '600px' },
      overflow: 'hidden',
      bgcolor: '#000'
    }}>
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'all 1s ease-in-out',
            transform: `translateX(${index === currentIndex ? '0' : index > currentIndex ? '100%' : '-100%'})`,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(0.95)',
            }
          }}
        >
          <img 
            src={slide.url} 
            alt={slide.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{
              transition: 'transform 0.5s ease-in-out'
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
