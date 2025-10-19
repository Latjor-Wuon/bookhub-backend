# BookHub Backend API

A Node.js/Express.js backend API for the BookHub application with MongoDB integration and JWT authentication.

## 🚀 Features

- **RESTful API**: Clean and consistent endpoints
- **Authentication**: JWT-based security with bcryptjs password hashing
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error responses
- **CORS**: Cross-origin resource sharing configuration

## 🛠️ Tech Stack

- **Node.js** with TypeScript
- **Express.js** for API framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **cors** for cross-origin requests

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # API route handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── package.json
├── tsconfig.json
└── railway.json         # Railway deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Latjor-Wuon/bookhub-backend.git
   cd bookhub-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   - API Base URL: `http://localhost:3000/api`
   - Health Check: `http://localhost:3000/health`

## 🌐 Railway Deployment

### Automatic Deployment

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect the configuration

2. **Set Environment Variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.railway.app
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your API will be live at `https://your-project.railway.app`

### Manual Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books (with pagination and filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/genres` - Get all genres

### Health
- `GET /health` - Health check endpoint

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Configuration**: Proper cross-origin setup
- **Input Validation**: Sanitized user inputs
- **Environment Variables**: Secure configuration management

## 📱 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (default: 3000) | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Latjor Wuon**
- GitHub: [@Latjor-Wuon](https://github.com/Latjor-Wuon)
- Email: l.dak@alustudent.com

---

**BookHub Backend API** - Powering the BookHub application! 🚀
