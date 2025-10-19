"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bookController_1 = require("../controllers/bookController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Validation rules
const bookValidation = [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),
    (0, express_validator_1.body)('author')
        .notEmpty()
        .withMessage('Author is required')
        .isLength({ max: 100 })
        .withMessage('Author name cannot exceed 100 characters'),
    (0, express_validator_1.body)('genre')
        .notEmpty()
        .withMessage('Genre is required')
        .isIn([
        'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
        'Fantasy', 'Thriller', 'Biography', 'History', 'Self-Help',
        'Business', 'Technology', 'Health', 'Travel', 'Cooking',
        'Art', 'Poetry', 'Drama', 'Comedy', 'Horror'
    ])
        .withMessage('Invalid genre'),
    (0, express_validator_1.body)('publicationDate')
        .isISO8601()
        .withMessage('Please provide a valid publication date'),
    (0, express_validator_1.body)('isbn')
        .matches(/^[0-9]{10,13}$/)
        .withMessage('Please provide a valid ISBN (10-13 digits)'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),
    (0, express_validator_1.body)('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),
    (0, express_validator_1.body)('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price cannot be negative'),
    (0, express_validator_1.body)('availability')
        .optional()
        .isIn(['available', 'unavailable'])
        .withMessage('Availability must be either available or unavailable')
];
const idValidation = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid book ID')
];
// Public routes
router.get('/', bookController_1.getAllBooks);
router.get('/genres', bookController_1.getGenres);
router.get('/:id', idValidation, bookController_1.getBookById);
// Protected routes (require authentication - all logged-in users can perform CRUD)
router.post('/', auth_1.authenticateToken, bookValidation, bookController_1.createBook);
router.put('/:id', auth_1.authenticateToken, idValidation, bookValidation, bookController_1.updateBook);
router.delete('/:id', auth_1.authenticateToken, idValidation, bookController_1.deleteBook);
exports.default = router;
//# sourceMappingURL=books.js.map