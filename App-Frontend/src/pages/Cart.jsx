import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export default function Cart() {
  const cartItems = []; // Will be populated from cart context

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cartItems.map(item => (
              <ListItem key={item.id}>
                <ListItemText 
                  primary={item.name}
                  secondary={`$${item.price} x ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary">
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}
