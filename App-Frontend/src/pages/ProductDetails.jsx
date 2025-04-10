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
      <Grid container spacing={4}>
        {/* Left Side - Large Image Container */}
        <Grid item xs={12} md={8}>
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
            {/* Thumbnails */}
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
                  width: 100,  // Increased from 80
                  height: 100, // Increased from 80
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
                    width: 100,  // Increased from 80
                    height: 100, // Increased from 80
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

        {/* Right Side - Product Info & Size Selection */}
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            p: 3, 
            border: '1px solid rgba(7, 83, 100, 0.1)',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            position: 'sticky',
            top: 100 // Adjust based on your navbar height
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
              Brand: {product.brand}
            </Typography>

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
                      >
                        US {sizeData.size} ({sizeData.stock} pairs)
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
          backgroundColor: 'white', // Changed from black to white
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
              color: '#075364', // Changed from white to theme color
              bgcolor: 'rgba(248, 123, 35, 0.1)', // Light orange background
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
              color: '#075364', // Changed color
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
              color: '#075364', // Changed color
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
