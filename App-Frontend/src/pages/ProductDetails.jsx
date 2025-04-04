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
                image={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                alt={product.name}
                sx={{ objectFit: 'contain' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Brand: {product.brand}</Typography>
              <Typography variant="subtitle1">Color: {product.color}</Typography>
            </Box>
            {user?.role !== 'admin' && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Size</InputLabel>
                  <Select value={size} onChange={handleSizeChange} label="Size">
                    {product.sizes.map((size) => (
                      <MenuItem key={size} value={size}>US {size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  disabled={!size}
                  onClick={handleAddToCart}
                >
                  Add to Cart
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
