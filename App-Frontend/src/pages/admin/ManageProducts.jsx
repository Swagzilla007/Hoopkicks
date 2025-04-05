import { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel, Grid,
  IconButton, Alert, Box
} from '@mui/material';
import { Delete, Edit, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AdminLayout from '../../layouts/AdminLayout';
import { adminAPI, productAPI } from '../../utils/api';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    sizes: [],
    image: '',
    stock: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['', '', '']);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAllProducts();
      setProducts(data);
    } catch (error) {
      setError('Error fetching products');
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        brand: product.brand,
        category: product.category,
        sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
        image: product.image,
        stock: product.stock.toString(),
        additionalImages: product.additionalImages || []
      });
      setImagePreview(product.image);
      setAdditionalImages(product.additionalImages || ['', '', '']);
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        sizes: [],
        image: '',
        stock: ''
      });
      setImagePreview('');
      setAdditionalImages(['', '', '']);
    }
    setOpen(true);
    setError('');
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handlePreviewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await adminAPI.uploadImage(formData);
      setFormData(prev => ({ ...prev, image: data.imagePath }));
      handlePreviewImage(event);
    } catch (error) {
      setError('Error uploading image');
    }
  };

  const handleAdditionalImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await adminAPI.uploadImage(formData);
      const newAdditionalImages = [...additionalImages];
      newAdditionalImages[index] = data.imagePath;
      setAdditionalImages(newAdditionalImages);
    } catch (error) {
      setError('Error uploading additional image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        brand: formData.brand,
        category: formData.category,
        sizes: typeof formData.sizes === 'string' 
          ? formData.sizes.split(',').map(size => Number(size.trim()))
          : formData.sizes,
        image: formData.image,
        stock: Number(formData.stock),
        additionalImages: additionalImages.filter(img => img !== '')
      };

      if (selectedProduct) {
        await adminAPI.updateProduct(selectedProduct._id, productData);
      } else {
        await adminAPI.createProduct(productData);
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError('Error deleting product');
      }
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Manage Products</Typography>
          <Button 
            variant="contained" 
            onClick={() => handleOpen()}
          >
            Add New Product
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price (LKR)</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>Rs. {product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(product)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price (LKR)"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    helperText="Enter price in Sri Lankan Rupees"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      label="Category"
                    >
                      <MenuItem value="men">Men</MenuItem>
                      <MenuItem value="women">Women</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sizes (comma-separated)"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    helperText="Example: 7, 8, 9, 10"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {(imagePreview || formData.image) && (
                      <Box
                        component="img"
                        src={imagePreview || formData.image}
                        alt="Product preview"
                        sx={{ 
                          width: 200, 
                          height: 200, 
                          objectFit: 'contain',
                          border: '1px solid #ddd',
                          borderRadius: 1 
                        }}
                      />
                    )}
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                    >
                      Upload Image
                      <VisuallyHiddenInput 
                        type="file" 
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/png,image/webp"
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Additional Images</Typography>
                  <Grid container spacing={2}>
                    {[0, 1, 2].map((index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          {additionalImages[index] && (
                            <Box
                              component="img"
                              src={additionalImages[index].startsWith('http') 
                                ? additionalImages[index] 
                                : `http://localhost:5000${additionalImages[index]}`}
                              alt={`Additional ${index + 1}`}
                              sx={{ width: 100, height: 100, objectFit: 'contain' }}
                            />
                          )}
                          <Button
                            component="label"
                            variant="outlined"
                            size="small"
                          >
                            Upload Image {index + 1}
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => handleAdditionalImageUpload(e, index)}
                            />
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
}
