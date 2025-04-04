import { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { adminAPI } from '../../utils/api';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    sizes: [],
    image: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await productAPI.getAllProducts();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productData._id) {
        await adminAPI.updateProduct(productData._id, productData);
      } else {
        await adminAPI.createProduct(productData);
      }
      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>
      <Button variant="contained" onClick={() => {
        setProductData({
          name: '',
          description: '',
          price: '',
          brand: '',
          category: '',
          sizes: [],
          image: '',
          stock: ''
        });
        setOpen(true);
      }}>
        Add New Product
      </Button>
      
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
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
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    setProductData(product);
                    setOpen(true);
                  }}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{productData._id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* Add form fields for product data */}
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
