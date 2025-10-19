import dotenv from 'dotenv';
import { seedDatabase } from './utils/seedData';

// Load environment variables
dotenv.config();

// Run the seeder
seedDatabase();