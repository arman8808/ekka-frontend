const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import controller
const hypnotherapyController = require('../controllers/hypnotherapyController');

// Import middleware
const auth = require('../middleware/auth');
const validateProgram = require('../middleware/validateProgram');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'hypnotherapy-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

// Routes
// GET /api/hypnotherapy - Get all programs with pagination and search
router.get('/', hypnotherapyController.getPrograms);

// GET /api/hypnotherapy/:id - Get single program by ID
router.get('/:id', hypnotherapyController.getProgramById);

// POST /api/hypnotherapy - Create new program (with file upload)
router.post('/', 
  auth, // Require authentication
  upload.single('thumbnail'), // Handle single file upload
  validateProgram, // Validate request data
  hypnotherapyController.createProgram
);

// PUT /api/hypnotherapy/:id - Update program (with optional file upload)
router.put('/:id', 
  auth, // Require authentication
  upload.single('thumbnail'), // Handle single file upload
  validateProgram, // Validate request data
  hypnotherapyController.updateProgram
);

// DELETE /api/hypnotherapy/:id - Delete program
router.delete('/:id', 
  auth, // Require authentication
  hypnotherapyController.deleteProgram
);

module.exports = router;
