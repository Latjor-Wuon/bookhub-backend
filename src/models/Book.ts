import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  isbn: string;
  description: string;
  coverImage?: string;
  rating?: number;
  price?: number;
  availability: 'available' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    enum: [
      'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
      'Fantasy', 'Thriller', 'Biography', 'History', 'Self-Help',
      'Business', 'Technology', 'Health', 'Travel', 'Cooking',
      'Art', 'Poetry', 'Drama', 'Comedy', 'Horror', 'Psychology'
    ]
  },
  publicationDate: {
    type: Date,
    required: [true, 'Publication date is required']
  },
  isbn: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    match: [/^[0-9]{10,13}$/, 'Please enter a valid ISBN']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  coverImage: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Index for search functionality
BookSchema.index({ title: 'text', author: 'text', description: 'text', genre: 'text' });
BookSchema.index({ genre: 1 });
BookSchema.index({ publicationDate: -1 });
BookSchema.index({ rating: -1 });

export default mongoose.model<IBook>('Book', BookSchema);
