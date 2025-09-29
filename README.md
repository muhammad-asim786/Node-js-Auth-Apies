# Node.js Authentication API

A secure Node.js authentication API built with Express.js and MongoDB.

## Features

- User registration and login
- Password hashing with bcrypt
- Input validation with Joi
- Security middleware (Helmet, CORS, Rate Limiting)
- MongoDB integration with Mongoose
- Environment configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remotely)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/myDatabase
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   BCRYPT_SALT_ROUNDS=10
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

### Health Check
- **GET** `/check` - Check if the server is running

### Authentication
- **POST** `/register` - Register a new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Enables Cross-Origin Resource Sharing
- **Rate Limiting**: Limits requests per IP address
- **Input Validation**: Validates all input data using Joi
- **Password Hashing**: Uses bcrypt for secure password storage
- **Environment Variables**: Sensitive data stored in environment variables

## Project Structure

```
├── config/
│   └── db.js              # Database configuration
├── controller/
│   └── users.controller.js # User controller logic
├── model/
│   └── users.model.js     # User data model
├── routes/
│   └── users.route.js     # User routes
├── services/
│   └── users.services.js  # User business logic
├── app.js                 # Express app configuration
├── index.js              # Application entry point
└── package.json          # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC
