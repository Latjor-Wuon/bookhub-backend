"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenres = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const express_validator_1 = require("express-validator");
const Book_1 = __importDefault(require("../models/Book"));
const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', genre = '', sortBy = 'createdAt', sortOrder = 'desc', minRating = 0, maxPrice = 999999 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        // Build filter object
        const filter = {};
        if (search) {
            // Use regex search across multiple fields for better results
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { title: searchRegex },
                { author: searchRegex },
                { genre: searchRegex },
                { description: searchRegex }
            ];
        }
        if (genre) {
            filter.genre = genre;
        }
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }
        if (maxPrice) {
            filter.price = { $lte: parseFloat(maxPrice) };
        }
        // Build sort object
        const sort = {};
        if (sortBy === 'title' || sortBy === 'author') {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        else if (sortBy === 'publicationDate') {
            sort.publicationDate = sortOrder === 'asc' ? 1 : -1;
        }
        else if (sortBy === 'rating') {
            sort.rating = sortOrder === 'asc' ? 1 : -1;
        }
        else {
            sort.createdAt = sortOrder === 'asc' ? 1 : -1;
        }
        const books = await Book_1.default.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .lean();
        const total = await Book_1.default.countDocuments(filter);
        const totalPages = Math.ceil(total / limitNum);
        res.json({
            books,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalBooks: total,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1
            }
        });
    }
    catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({ message: 'Server error while fetching books' });
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res) => {
    try {
        const book = await Book_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        console.error('Get book error:', error);
        res.status(500).json({ message: 'Server error while fetching book' });
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const book = new Book_1.default(req.body);
        await book.save();
        res.status(201).json(book);
    }
    catch (error) {
        console.error('Create book error:', error);
        if (error instanceof Error && error.message.includes('duplicate key')) {
            res.status(400).json({ message: 'Book with this ISBN already exists' });
        }
        else {
            res.status(500).json({ message: 'Server error while creating book' });
        }
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const book = await Book_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({ message: 'Server error while updating book' });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const book = await Book_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({ message: 'Server error while deleting book' });
    }
};
exports.deleteBook = deleteBook;
const getGenres = async (req, res) => {
    try {
        const genres = await Book_1.default.distinct('genre');
        res.json(genres);
    }
    catch (error) {
        console.error('Get genres error:', error);
        res.status(500).json({ message: 'Server error while fetching genres' });
    }
};
exports.getGenres = getGenres;
//# sourceMappingURL=bookController.js.map