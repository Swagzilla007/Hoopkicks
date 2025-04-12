import { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel, Grid,
  IconButton, Alert, Box
} from '@mui/material';
import { Delete, Edit, CloudUpload, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
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
    image: '',
    additionalImages: []
  });
  const [imagePreview, setImagePreview] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['', '', '']);
  const [sizeStockPairs, setSizeStockPairs] = useState([{ size: '', stock: '' }]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null });

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
      console.log('Editing product:', product); 
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        brand: product.brand,
        category: product.category,
        image: product.image,
        additionalImages: product.additionalImages || []
      });
     
      setSizeStockPairs(
        Array.isArray(product.sizes) 
          ? product.sizes.map(s => ({
              size: s.size.toString(),
              stock: s.stock.toString()
            }))
          : [{ size: '', stock: '' }]
      );
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
        image: '',
      });
      setSizeStockPairs([{ size: '', stock: '' }]);
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
      const validPairs = sizeStockPairs.filter(pair => pair.size && pair.stock);
      if (validPairs.length === 0) {
        setError('At least one size and stock combination is required');
        return;
      }

      const productData = {
        ...formData,
        sizes: sizeStockPairs
          .filter(pair => pair.size && pair.stock)
          .map(pair => ({
            size: Number(pair.size),
            stock: Number(pair.stock)
          })),
        price: Number(formData.price),
        additionalImages: additionalImages.filter(img => img !== '')
      };

      console.log('Submitting product data:', productData); // Debug log

      if (selectedProduct) {
        await adminAPI.updateProduct(selectedProduct._id, productData);
      } else {
        await adminAPI.createProduct(productData);
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error); // Debug log
      setError(error.response?.data?.message || 'Error saving product');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, productId: id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminAPI.deleteProduct(deleteDialog.productId);
      fetchProducts();
      setDeleteDialog({ open: false, productId: null });
    } catch (error) {
      setError('Error deleting product');
    }
  };

  const addSizePair = () => {
    setSizeStockPairs([...sizeStockPairs, { size: '', stock: '' }]);
  };

  const removeSizePair = (index) => {
    setSizeStockPairs(sizeStockPairs.filter((_, i) => i !== index));
  };

  const updateSizePair = (index, field, value) => {
    const newPairs = [...sizeStockPairs];
    newPairs[index][field] = value;
    setSizeStockPairs(newPairs);
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            color: '#075364',
            position: 'relative',
            pb: 2,
            mb: 4,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: '#f87b23',
              borderRadius: '2px'
            }
          }}
        >
          Manage Products
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            sx={{
              bgcolor: '#075364',
              color: 'white',
              '&:hover': {
                bgcolor: '#075364',
                color: '#f87b23'
              }
            }}
          >
            Add New Product
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3,
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)',
            overflow: 'hidden'
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(7, 83, 100, 0.02)' }}>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Brand
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Price (LKR)
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Stock
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: '600', 
                    color: '#075364',
                    borderBottom: '2px solid rgba(7, 83, 100, 0.1)',
                    py: 2.5,
                    fontSize: '0.95rem'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow 
                    key={product._id}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(7, 83, 100, 0.02)',
                        transform: 'translateX(6px)'
                      },
                      // Add subtle alternating background
                      bgcolor: index % 2 === 0 ? 'transparent' : 'rgba(7, 83, 100, 0.01)'
                    }}
                  >
                    <TableCell sx={{ 
                      py: 2,
                      color: '#075364',
                      fontWeight: '500',
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)'
                    }}>
                      {product.name}
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#666',
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)'
                    }}>
                      {product.brand}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)'
                    }}>
                      <Box sx={{ 
                        bgcolor: product.category === 'men' ? 'rgba(7, 83, 100, 0.08)' : 'rgba(248, 123, 35, 0.08)',
                        color: product.category === 'men' ? '#075364' : '#f87b23',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: '4px',
                        display: 'inline-block',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        {product.category === 'men' ? "Men's" : "Women's"}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#f87b23',
                      fontWeight: '600',
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)'
                    }}>
                      Rs. {product.price.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)',
                      maxWidth: '200px'
                    }}>
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                      }}>
                        {product.sizes.map(s => (
                          <Box key={s.size} sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            bgcolor: s.stock === 0 ? 'rgba(255, 61, 0, 0.08)' : 
                                     s.stock <= 5 ? 'rgba(248, 123, 35, 0.08)' : 
                                     'rgba(7, 83, 100, 0.08)',
                            px: 1,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: '0.85rem'
                          }}>
                            <span style={{ color: '#075364', fontWeight: '500' }}>Size {s.size}</span>
                            <span style={{ 
                              color: s.stock === 0 ? '#ff3d00' : 
                                     s.stock <= 5 ? '#f87b23' : 
                                     '#075364',
                              fontWeight: '500'
                            }}>
                              {s.stock} pcs
                            </span>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid rgba(7, 83, 100, 0.1)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          onClick={() => handleOpen(product)}
                          sx={{ 
                            color: '#075364',
                            '&:hover': {
                              color: '#f87b23',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteClick(product._id)}
                          sx={{ 
                            color: '#ff3d00',
                            '&:hover': {
                              color: '#d32f2f',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(7, 83, 100, 0.1)',
            boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
          }
        }}>
          <DialogTitle sx={{ 
            color: '#075364',
            borderBottom: '1px solid rgba(7, 83, 100, 0.1)',
            pb: 2
          }}>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                        '&:hover fieldset': { borderColor: '#075364' },
                        '&.Mui-focused fieldset': { borderColor: '#f87b23' }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { color: '#f87b23' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                        '&:hover fieldset': { borderColor: '#075364' },
                        '&.Mui-focused fieldset': { borderColor: '#f87b23' }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { color: '#f87b23' }
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                        '&:hover fieldset': { borderColor: '#075364' },
                        '&.Mui-focused fieldset': { borderColor: '#f87b23' }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { color: '#f87b23' }
                      }
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(7, 83, 100, 0.2)' },
                        '&:hover fieldset': { borderColor: '#075364' },
                        '&.Mui-focused fieldset': { borderColor: '#f87b23' }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#075364',
                        '&.Mui-focused': { color: '#f87b23' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label" sx={{ 
                      color: '#075364',
                      '&.Mui-focused': { color: '#f87b23' }  
                    }}>
                      Category
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      label="Category"
                      sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(7, 83, 100, 0.2)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#075364'
                        },
                        '&.Mui-focused': {  // Added text color change on focus
                          color: '#f87b23'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#f87b23'
                        }
                      }}
                    >
                      <MenuItem value="men">Men's</MenuItem>
                      <MenuItem value="women">Women's</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Sizes and Stock
                  </Typography>
                  {sizeStockPairs.map((pair, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        label="Size"
                        type="number"
                        value={pair.size}
                        onChange={(e) => updateSizePair(index, 'size', e.target.value)}
                        sx={{ width: '100px' }}
                      />
                      <TextField
                        label="Stock"
                        type="number"
                        value={pair.stock}
                        onChange={(e) => updateSizePair(index, 'stock', e.target.value)}
                        sx={{ width: '100px' }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeSizePair(index)}
                        disabled={sizeStockPairs.length === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {index === sizeStockPairs.length - 1 && (
                        <IconButton 
                          onClick={addSizePair}
                          sx={{ color: '#075364' }} 
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 3,
                    border: '1px dashed rgba(7, 83, 100, 0.2)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(7, 83, 100, 0.02)'
                  }}>
                    {(imagePreview || formData.image) && (
                      <Box
                        component="img"
                        src={imagePreview || formData.image}
                        alt="Product preview"
                        sx={{ 
                          width: 200, 
                          height: 200, 
                          objectFit: 'contain',
                          borderRadius: '8px',
                          boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)'
                        }}
                      />
                    )}
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      sx={{
                        bgcolor: '#075364',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#075364',
                          color: '#f87b23'
                        }
                      }}
                    >
                      Upload Main Image
                      <VisuallyHiddenInput 
                        type="file" 
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/png,image/webp"
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ 
                    color: '#075364',
                    fontWeight: 'bold',
                    mb: 2 
                  }}>
                    Additional Images
                  </Typography>
                  <Grid container spacing={2}>
                    {[0, 1, 2].map((index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          gap: 2,
                          p: 2,
                          border: '1px dashed rgba(7, 83, 100, 0.2)',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(7, 83, 100, 0.02)',
                          height: '100%'
                        }}>
                          {additionalImages[index] && (
                            <Box
                              component="img"
                              src={additionalImages[index].startsWith('http') 
                                ? additionalImages[index] 
                                : `http://localhost:5000${additionalImages[index]}`}
                              alt={`Additional ${index + 1}`}
                              sx={{ 
                                width: 100, 
                                height: 100, 
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '4px 4px 0px rgba(7, 83, 100, 0.1)'
                              }}
                            />
                          )}
                          <Button
                            component="label"
                            variant="outlined"
                            size="small"
                            startIcon={<CloudUpload />}
                            sx={{
                              color: '#075364',
                              borderColor: 'rgba(7, 83, 100, 0.2)',
                              '&:hover': {
                                borderColor: '#075364',
                                backgroundColor: 'rgba(7, 83, 100, 0.05)',
                                color: '#f87b23'
                              }
                            }}
                          >
                            Image {index + 1}
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
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={handleClose}
              sx={{ 
                color: '#075364',
                '&:hover': { color: '#f87b23' }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{
                bgcolor: '#075364',
                color: 'white',
                '&:hover': {
                  bgcolor: '#075364',
                  color: '#f87b23'
                }
              }}
            >
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={deleteDialog.open} 
          onClose={() => setDeleteDialog({ open: false, productId: null })}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              border: '1px solid rgba(7, 83, 100, 0.1)',
              boxShadow: '8px 8px 0px rgba(7, 83, 100, 0.1)'
            }
          }}
        >
          <DialogTitle sx={{ color: '#075364' }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this product?</Typography>
            <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setDeleteDialog({ open: false, productId: null })}
              sx={{ color: '#075364' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{
                bgcolor: '#ff3d00',
                color: 'white',
                '&:hover': {
                  bgcolor: '#d32f2f'
                }
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
}
