import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Card,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Dialog,
  IconButton
} from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const brandLogos = {
  nike: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/80px-Logo_NIKE.svg.png',
  adidas: 'https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.png',
  jordan: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/640px-Jumpman_logo.svg.png',
  'new balance': 'https://cdn.freebiesupply.com/logos/large/2x/new-balance-2-logo-png-transparent.png'
};

const paymentLogos = {
  visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  mastercard: 'https://brand.mastercard.com/content/dam/mccom/global/logos/logo-mastercard-mobile.svg',
  amex: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg'
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const allImages = [product?.image, ...(product?.additionalImages || [])];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, size);
    setSnackbarOpen(true);
  };

  const getImageUrl = (path) => {
    return path?.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  const handleImageClick = (index) => {
    setSliderIndex(index);
    setOpenSlider(true);
  };

  const handlePrevImage = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setSliderIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  if (loading) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid 
        container 
        sx={{ 
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}
      >
       
        <Grid 
          item 
          sx={{
            width: { xs: '100%', md: '65%' },
            flexShrink: 0
          }}
        >
          <Card elevation={0} sx={{ 
            backgroundColor: 'transparent',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
          }}>
            <CardMedia
              component="img"
              height="500" 
              image={selectedImage === 0 ? getImageUrl(product.image) : getImageUrl(product.additionalImages[selectedImage - 1])}
              alt={product.name}
              sx={{ 
                objectFit: 'contain',
                backgroundColor: 'white',
                p: 4,
                cursor: 'pointer'
              }}
              onClick={() => handleImageClick(0)}
            />
           
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              p: 2,
              backgroundColor: 'white',
              justifyContent: 'center'
            }}>
              <Box
                component="img"
                src={getImageUrl(product.image)}
                alt="main"
                sx={{ 
                  width: 100,  
                  height: 100, 
                  objectFit: 'contain',
                  cursor: 'pointer',
                  border: selectedImage === 0 ? '2px solid #f87b23' : '2px solid transparent',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => handleImageClick(0)}
              />
              {product.additionalImages?.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={getImageUrl(img)}
                  alt={`additional ${index + 1}`}
                  sx={{ 
                    width: 100,  
                    height: 100, 
                    objectFit: 'contain',
                    cursor: 'pointer',
                    border: selectedImage === index + 1 ? '2px solid #f87b23' : '2px solid transparent',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onClick={() => handleImageClick(index + 1)}
                />
              ))}
            </Box>
          </Card>
        </Grid>

       
        <Grid 
          item 
          sx={{
            width: { xs: '100%', md: '35%' },
            flexShrink: 0,
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }}
        >
          <Box sx={{ 
            p: 3,
            border: '1px solid rgba(7, 83, 100, 0.1)',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#075364' }}>
              {product.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#f87b23', fontWeight: 700 }} gutterBottom>
              Rs. {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              {product.description}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#075364', fontWeight: 600, mb: 1 }}>
              Brand: {' '}
              {brandLogos[product.brand.toLowerCase()] ? (
                <Box
                  component="img"
                  src={brandLogos[product.brand.toLowerCase()]}
                  alt={product.brand}
                  sx={{
                    height: product.brand.toLowerCase() === 'nike' ? '12px' : 
                           product.brand.toLowerCase() === 'adidas' ? '14px' :
                           product.brand.toLowerCase() === 'jordan' ? '18px' :
                           product.brand.toLowerCase() === 'new balance' ? '22px' : '14px',
                    width: 'auto',
                    filter: 'brightness(0.3)',
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    ml: 1
                  }}
                />
              ) : (
                product.brand
              )}
            </Typography>

           
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#075364', fontWeight: 600, mb: 1 }}>
                Payment Methods:
              </Typography>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 1
              }}>
                {Object.entries(paymentLogos).map(([name, url]) => (
                  <Box
                    key={name}
                    component="img"
                    src={url}
                    alt={`${name} logo`}
                    sx={{
                      height: name === 'visa' ? '20px' : '28px',
                      width: 'auto',
                      filter: 'none'
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Size Selection */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#075364', fontWeight: 600, mb: 1 }}>
                Available Sizes:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {product.sizes.map((sizeData) => (
                  <Box
                    key={sizeData.size}
                    sx={{
                      p: 1,
                      borderRadius: '4px',
                      backgroundColor: 'rgba(7, 83, 100, 0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: '#075364' }}>
                      Size {sizeData.size}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ 
                      color: sizeData.stock === 0 ? '#ff3d00' : 
                             sizeData.stock <= 5 ? '#f87b23' : '#075364'
                    }}>
                      {sizeData.stock === 0 ? 'Out of Stock' :
                       `${sizeData.stock} pairs available`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {user?.role !== 'admin' && (
              <Box sx={{ mt: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel sx={{ 
                    color: '#075364',
                    '&.Mui-focused': { color: '#f87b23' }
                  }}>Size</InputLabel>
                  <Select 
                    value={size} 
                    onChange={handleSizeChange}
                    label="Size"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(7, 83, 100, 0.2)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#075364'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f87b23'
                      },
                      '&.Mui-focused': {
                        color: '#f87b23'
                      }
                    }}
                  >
                    {product.sizes.map((sizeData) => (
                      <MenuItem 
                        key={sizeData.size} 
                        value={sizeData.size}
                        disabled={sizeData.stock === 0}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>US {sizeData.size}</span>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: sizeData.stock === 0 ? '#ff3d00' : '#666',
                            ml: 2
                          }}
                        >
                          ({sizeData.stock} pairs)
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth 
                  disabled={!size || !product.sizes.find(s => s.size === size)?.stock}
                  onClick={handleAddToCart}
                  sx={{
                    backgroundColor: '#075364',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#075364',
                      color: '#f87b23'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(7, 83, 100, 0.12)'
                    }
                  }}
                >
                  {!size ? 'Select Size' : 
                   !product.sizes.find(s => s.size === size)?.stock ? 
                   'Out of Stock' : 'Add to Cart'}
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={`${product?.name} added to cart successfully!`}
      />

      {/* Image Slider Modal */}
      <Dialog
        open={openSlider}
        onClose={() => setOpenSlider(false)}
        maxWidth="xl"
        fullWidth
      >
        <Box sx={{ 
          position: 'relative', 
          backgroundColor: 'white', 
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton
            onClick={() => setOpenSlider(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#075364', 
              bgcolor: 'rgba(248, 123, 35, 0.1)', 
              '&:hover': { 
                bgcolor: 'rgba(248, 123, 35, 0.2)' 
              }
            }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 8,
              color: '#075364', 
              bgcolor: 'rgba(248, 123, 35, 0.1)',
              '&:hover': { 
                bgcolor: 'rgba(248, 123, 35, 0.2)' 
              }
            }}
          >
            <ChevronLeft sx={{ fontSize: 40 }} />
          </IconButton>

          <Box
            component="img"
            src={getImageUrl(allImages[sliderIndex])}
            alt={`Slide ${sliderIndex + 1}`}
            sx={{
              maxHeight: '85vh',
              maxWidth: '90%',
              objectFit: 'contain'
            }}
          />

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 8,
              color: '#075364', 
              bgcolor: 'rgba(248, 123, 35, 0.1)',
              '&:hover': { 
                bgcolor: 'rgba(248, 123, 35, 0.2)' 
              }
            }}
          >
            <ChevronRight sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Dialog>
    </Container>
  );
}
