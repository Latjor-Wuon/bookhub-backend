import mongoose from 'mongoose';
import Book from '../models/Book';
import User from '../models/User';

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publicationDate: new Date("1925-04-10"),
    isbn: "9780743273565",
    description: "A classic American novel set in the Jazz Age, following the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    rating: 4.2,
    price: 12.99,
    availability: "available"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: new Date("1960-07-11"),
    isbn: "9780061120084",
    description: "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.5,
    price: 14.99,
    availability: "available"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    publicationDate: new Date("1949-06-08"),
    isbn: "9780451524935",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance in a world where independent thinking is a crime.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    rating: 4.3,
    price: 13.99,
    availability: "available"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publicationDate: new Date("1813-01-28"),
    isbn: "9780141439518",
    description: "A romantic novel that follows the character development of Elizabeth Bennet, the dynamic protagonist who learns about the repercussions of hasty judgments.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    rating: 4.4,
    price: 11.99,
    availability: "available"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publicationDate: new Date("1951-07-16"),
    isbn: "9780316769174",
    description: "A coming-of-age story about teenage rebellion and alienation, told through the eyes of Holden Caulfield.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    rating: 3.8,
    price: 10.99,
    availability: "available"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationDate: new Date("1954-07-29"),
    isbn: "9780544003415",
    description: "An epic high-fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    rating: 4.7,
    price: 19.99,
    availability: "available"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publicationDate: new Date("1997-06-26"),
    isbn: "9780747532699",
    description: "The first book in the Harry Potter series, following a young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    rating: 4.6,
    price: 16.99,
    availability: "available"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationDate: new Date("1937-09-21"),
    isbn: "9780547928227",
    description: "A fantasy novel about the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by the dragon Smaug.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    rating: 4.5,
    price: 15.99,
    availability: "available"
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    genre: "Fantasy",
    publicationDate: new Date("1950-10-16"),
    isbn: "9780064471190",
    description: "A series of seven fantasy novels about the magical land of Narnia, where animals talk and magic is real.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    rating: 4.3,
    price: 17.99,
    availability: "available"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    publicationDate: new Date("1988-01-01"),
    isbn: "9780061122415",
    description: "A philosophical novel about a young Andalusian shepherd who travels from Spain to Egypt in search of treasure.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.1,
    price: 12.99,
    availability: "available"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    publicationDate: new Date("2003-03-18"),
    isbn: "9780307474278",
    description: "A mystery thriller novel about symbologist Robert Langdon as he investigates a murder in the Louvre Museum.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    rating: 3.9,
    price: 13.99,
    availability: "available"
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    genre: "Fiction",
    publicationDate: new Date("2003-05-29"),
    isbn: "9781594480003",
    description: "A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.4,
    price: 14.99,
    availability: "available"
  }
];

const sampleUsers = [
  {
    fullName: "Admin User",
    email: "admin@bookhub.com",
    password: "AdminPass123"
  },
  {
    fullName: "John Doe",
    email: "john@example.com",
    password: "UserPass123"
  },
  {
    fullName: "Jane Smith",
    email: "jane@example.com",
    password: "UserPass123"
  }
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});

    // Insert sample books
    const books = await Book.insertMany(sampleBooks);
    console.log(`✅ Inserted ${books.length} books`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${users.length} users`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📚 Sample Books:');
    books.forEach(book => {
      console.log(`- ${book.title} by ${book.author} (${book.genre})`);
    });

    console.log('\n👥 Sample Users:');
    users.forEach(user => {
      console.log(`- ${user.fullName} (${user.email})`);
    });

    console.log('\n🔑 Login Credentials:');
    console.log('User: admin@bookhub.com / AdminPass123');
    console.log('User: john@example.com / UserPass123');
    console.log('User: jane@example.com / UserPass123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export { sampleUsers as users };
export default seedDatabase;
