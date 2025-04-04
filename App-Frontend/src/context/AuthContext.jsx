import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulate API call
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      return true;
    }
    throw new Error('Invalid credentials');
  };

  const register = async (email, password, name) => {
    // Simulate API call
    if (email && password && name) {
      setUser({ email, name });
      return true;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
