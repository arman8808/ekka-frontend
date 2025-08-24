const { body, validationResult } = require('express-validator');

const validateProgram = [
  // Title validation
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()]+$/)
    .withMessage('Title contains invalid characters'),

  // Subtitle validation
  body('subtitle')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Subtitle must be between 10 and 500 characters'),

  // Duration validation
  body('duration')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Duration must be between 3 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,()]+$/)
    .withMessage('Duration contains invalid characters'),

  // Video URL validation (optional)
  body('videoUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Video URL must be a valid URL'),

  // Card Points validation
  body('cardPoints')
    .isArray({ min: 1 })
    .withMessage('At least one card point is required')
    .custom((points) => {
      if (!Array.isArray(points)) {
        throw new Error('Card points must be an array');
      }
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (!point || typeof point !== 'string') {
          throw new Error(`Card point ${i + 1} must be a string`);
        }
        
        // Remove HTML tags and check content length
        const textContent = point.replace(/<[^>]*>/g, '').trim();
        if (textContent.length < 5) {
          throw new Error(`Card point ${i + 1} must have at least 5 characters of content`);
        }
      }
      
      return true;
    }),

  // Learning Sections validation
  body('learningSections')
    .isArray({ min: 1 })
    .withMessage('At least one learning section is required')
    .custom((sections) => {
      if (!Array.isArray(sections)) {
        throw new Error('Learning sections must be an array');
      }
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        if (!section || typeof section !== 'object') {
          throw new Error(`Learning section ${i + 1} must be an object`);
        }
        
        if (!section.title || typeof section.title !== 'string') {
          throw new Error(`Learning section ${i + 1} title is required and must be a string`);
        }
        
        if (section.title.trim().length < 3) {
          throw new Error(`Learning section ${i + 1} title must be at least 3 characters`);
        }
        
        if (!section.content || typeof section.content !== 'string') {
          throw new Error(`Learning section ${i + 1} content is required and must be a string`);
        }
        
        // Remove HTML tags and check content length - updated to 10 characters
        const textContent = section.content.replace(/<[^>]*>/g, '').trim();
        if (textContent.length < 10) {
          throw new Error(`Learning section ${i + 1} content must have at least 10 characters`);
        }
      }
      
      return true;
    }),

  // Upcoming Events validation (conditional - only validate if events exist)
  body('upcomingEvents')
    .optional()
    .isArray()
    .withMessage('Upcoming events must be an array')
    .custom((events) => {
      if (!Array.isArray(events)) {
        throw new Error('Upcoming events must be an array');
      }
      
      // If no events, that's fine - no validation needed
      if (events.length === 0) {
        return true;
      }
      
      // If events exist, validate each one completely
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        
        if (!event || typeof event !== 'object') {
          throw new Error(`Event ${i + 1} must be an object`);
        }
        
        // Start date validation - required when event exists
        if (!event.startDate || typeof event.startDate !== 'string') {
          throw new Error(`Event ${i + 1} start date and time is required`);
        }
        
        const startDate = new Date(event.startDate);
        if (isNaN(startDate.getTime())) {
          throw new Error(`Event ${i + 1} start date must be a valid date and time`);
        }
        
        // End date validation - required when event exists
        if (!event.endDate || typeof event.endDate !== 'string') {
          throw new Error(`Event ${i + 1} end date and time is required`);
        }
        
        const endDate = new Date(event.endDate);
        if (isNaN(endDate.getTime())) {
          throw new Error(`Event ${i + 1} end date must be a valid date and time`);
        }
        
        // Check if end date is after start date
        if (endDate <= startDate) {
          throw new Error(`Event ${i + 1} end date must be after start date`);
        }
        
        // Event name validation - required when event exists
        if (!event.eventName || typeof event.eventName !== 'string') {
          throw new Error(`Event ${i + 1} name is required`);
        }
        
        if (event.eventName.trim().length < 5) {
          throw new Error(`Event ${i + 1} name must be at least 5 characters`);
        }
        
        // Location validation - required when event exists
        if (!event.location || typeof event.location !== 'string') {
          throw new Error(`Event ${i + 1} location is required`);
        }
        
        if (event.location.trim().length < 3) {
          throw new Error(`Event ${i + 1} location must be at least 3 characters`);
        }
        
        // Organizer validation - required when event exists
        if (!event.organiser || typeof event.organiser !== 'string') {
          throw new Error(`Event ${i + 1} organizer is required`);
        }
        
        if (event.organiser.trim().length < 3) {
          throw new Error(`Event ${i + 1} organizer must be at least 3 characters`);
        }
        
        // Price validation - required when event exists
        if (!event.price || typeof event.price !== 'string') {
          throw new Error(`Event ${i + 1} price is required`);
        }
        
        const priceRegex = /^\$?\s?\d+(,\d{3})*(\.\d{2})?$/;
        if (!priceRegex.test(event.price)) {
          throw new Error(`Event ${i + 1} price must be in valid currency format`);
        }
        
        // Payment link validation - required when event exists
        if (!event.paymentLink || typeof event.paymentLink !== 'string') {
          throw new Error(`Event ${i + 1} payment link is required`);
        }
        
        try {
          new URL(event.paymentLink);
        } catch {
          throw new Error(`Event ${i + 1} payment link must be a valid URL`);
        }
      }
      
      return true;
    }),

  // Status validation
  body('status')
    .optional()
    .isIn(['Open', 'Closed'])
    .withMessage('Status must be either "Open" or "Closed"'),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = validateProgram;
