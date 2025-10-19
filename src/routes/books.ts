import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getGenres
} from '../controllers/bookController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Validation rules
const bookValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 100 })
    .withMessage('Author name cannot exceed 100 characters'),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .isIn([
      'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
      'Fantasy', 'Thriller', 'Biography', 'History', 'Self-Help',
      'Business', 'Technology', 'Health', 'Travel', 'Cooking',
      'Art', 'Poetry', 'Drama', 'Comedy', 'Horror'
    ])
    .withMessage('Invalid genre'),
  body('publicationDate')
    .isISO8601()
    .withMessage('Please provide a valid publication date'),
  body('isbn')
    .matches(/^[0-9]{10,13}$/)
    .withMessage('Please provide a valid ISBN (10-13 digits)'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
  body('availability')
    .optional()
    .isIn(['available', 'unavailable'])
    .withMessage('Availability must be either available or unavailable')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid book ID')
];

// Public routes
router.get('/', getAllBooks);
router.get('/genres', getGenres);
router.get('/:id', idValidation, getBookById);

// Protected routes (require authentication - all logged-in users can perform CRUD)
router.post('/', authenticateToken, bookValidation, createBook);
router.put('/:id', authenticateToken, idValidation, bookValidation, updateBook);
router.delete('/:id', authenticateToken, idValidation, deleteBook);

export default router;
