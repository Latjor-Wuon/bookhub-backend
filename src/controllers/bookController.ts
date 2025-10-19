import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Book, { IBook } from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      genre = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minRating = 0,
      maxPrice = 999999
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter object
    const filter: any = {};
    
    if (search) {
      // Use regex search across multiple fields for better results
      const searchRegex = new RegExp(search as string, 'i');
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
      filter.rating = { $gte: parseFloat(minRating as string) };
    }
    
    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice as string) };
    }

    // Build sort object
    const sort: any = {};
    if (sortBy === 'title' || sortBy === 'author') {
      sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'publicationDate') {
      sort.publicationDate = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'rating') {
      sort.rating = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = sortOrder === 'asc' ? 1 : -1;
    }

    const books = await Book.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Book.countDocuments(filter);
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
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Create book error:', error);
    if (error instanceof Error && error.message.includes('duplicate key')) {
      res.status(400).json({ message: 'Book with this ISBN already exists' });
    } else {
      res.status(500).json({ message: 'Server error while creating book' });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error while updating book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres);
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({ message: 'Server error while fetching genres' });
  }
};
