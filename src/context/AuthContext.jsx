// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists in localStorage
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      // Validate token with backend (optional but recommended)
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      // In a real app, you would send the token to the backend for validation
      // For demo purposes, we'll just set the authentication state
      setIsAuthenticated(true);
      
      // Fetch admin data (optional)
      // const response = await fetch('/api/admin/me', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const adminData = await response.json();
      // setAdmin(adminData);
      
      setLoading(false);
    } catch (error) {
      logout();
      setLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
    validateToken(token);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);