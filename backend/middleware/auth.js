const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    // Find admin by id
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({ 
        message: 'Token is not valid.' 
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({ 
        message: 'Account is deactivated.' 
      });
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.status(423).json({ 
        message: 'Account is temporarily locked due to multiple failed login attempts.' 
      });
    }

    // Add admin info to request
    req.admin = admin;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token has expired.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error during authentication.' 
    });
  }
};

// Optional auth middleware for routes that can work with or without auth
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (admin && admin.isActive && !admin.isLocked) {
        req.admin = admin;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

// Role-based authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ 
        message: 'Authentication required.' 
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions.' 
      });
    }

    next();
  };
};

// Super admin only middleware
const requireSuperAdmin = requireRole(['super-admin']);

// Admin or super admin middleware
const requireAdmin = requireRole(['admin', 'super-admin']);

module.exports = {
  auth,
  optionalAuth,
  requireRole,
  requireSuperAdmin,
  requireAdmin
};
