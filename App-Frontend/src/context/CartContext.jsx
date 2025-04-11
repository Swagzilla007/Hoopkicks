import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Add event listener for user logout
  useEffect(() => {
    const handleLogout = () => {
      clearCart();
      localStorage.removeItem('wishlist'); // Clear wishlist on logout
    };

    window.addEventListener('userLogout', handleLogout);
    return () => window.removeEventListener('userLogout', handleLogout);
  }, []);

  const addToCart = (product, size) => {
    if (user?.role === 'admin') {
      console.error('Admins cannot add items to cart');
      return;
    }

    const sizeData = product.sizes.find(s => s.size === size);
    if (!sizeData || sizeData.stock === 0) {
      return false;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        // Just return current items without modification when item exists
        // to avoid triggering unnecessary updates
        return currentItems;
      }

      // Add new item with quantity 1
      return [...currentItems, { 
        ...product, 
        size, 
        quantity: 1,
        stock: sizeData.stock
      }];
    });
    return true;
  };

  const removeFromCart = (productId, size) => {
    setItems(items.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setItems(items.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getCartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
