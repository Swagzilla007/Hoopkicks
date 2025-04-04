import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name} 
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
        <Button 
          size="small" 
          color="primary"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
