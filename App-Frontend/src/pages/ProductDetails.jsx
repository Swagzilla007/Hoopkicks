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
  Snackbar
} from '@mui/material';
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

  if (loading) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={0}>
              <CardMedia
                component="img"
                height="400"
                image={selectedImage === 0 ? getImageUrl(product.image) : getImageUrl(product.additionalImages[selectedImage - 1])}
                alt={product.name}
                sx={{ objectFit: 'contain' }}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={getImageUrl(product.image)}
                  alt="main"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    objectFit: 'contain',
                    cursor: 'pointer',
                    border: selectedImage === 0 ? '2px solid primary.main' : 'none'
                  }}
                  onClick={() => setSelectedImage(0)}
                />
                {product.additionalImages?.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={getImageUrl(img)}
                    alt={`additional ${index + 1}`}
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: 'contain',
                      cursor: 'pointer',
                      border: selectedImage === index + 1 ? '2px solid primary.main' : 'none'
                    }}
                    onClick={() => setSelectedImage(index + 1)}
                  />
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              Rs. {product.price.toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Brand: {product.brand}</Typography>
              {product.sizes.map((sizeData) => (
                <Typography key={sizeData.size} variant="subtitle2">
                  Size {sizeData.size}: {sizeData.stock} units available
                  {sizeData.stock <= 5 && sizeData.stock > 0 && (
                    <span style={{ color: 'orange' }}> (Low Stock)</span>
                  )}
                  {sizeData.stock === 0 && (
                    <span style={{ color: 'red' }}> (Out of Stock)</span>
                  )}
                </Typography>
              ))}
            </Box>
            {user?.role !== 'admin' && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Size</InputLabel>
                  <Select 
                    value={size} 
                    onChange={handleSizeChange} 
                    label="Size"
                  >
                    {product.sizes.map((sizeData) => (
                      <MenuItem 
                        key={sizeData.size} 
                        value={sizeData.size}
                        disabled={sizeData.stock === 0}
                      >
                        US {sizeData.size} ({sizeData.stock} available)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  disabled={!size || !product.sizes.find(s => s.size === size)?.stock}
                  onClick={handleAddToCart}
                >
                  {!size ? 'Select Size' : 
                   !product.sizes.find(s => s.size === size)?.stock ? 
                   'Out of Stock' : 'Add to Cart'}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={`${product?.name} added to cart successfully!`}
      />
    </>
  );
}
