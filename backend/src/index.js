require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");

// Environment variables with fallbacks
const PORT = 8082;
// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = "mongodb+srv://darshanke646:2cpQJgvYijq9l6Tx@crioclustertask.4tb23q0.mongodb.net/?retryWrites=true&w=majority";

// Debugging logs
console.log('Environment Variables Loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: PORT,
  MONGO_URI: MONGO_URI ? '*****[hidden for security]*****' : 'UNDEFINED - THIS IS THE PROBLEM'
});

// Validate required variables
if (!MONGO_URI) {
  console.error('\x1b[31m', 'FATAL ERROR: MONGO_URI is not defined');
  console.error('Possible solutions:');
  console.error('1. For local development: Create a .env file with MONGO_URI');
  console.error('2. For production: Set MONGO_URI environment variable in Render dashboard');
  process.exit(1);
}

// MongoDB connection with enhanced options
mongoose.connect(MONGO_URI, {
  // These are now default in Mongoose 6+, no longer needed
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('\x1b[32m', '✅ MongoDB connected successfully');
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('\x1b[31m', 'Server error:', error);
  });
})
.catch((err) => {
  console.error('\x1b[31m', '❌ MongoDB connection failed:', err.message);
  console.error('Full error object:', err);
  process.exit(1);
});

// Graceful shutdown handlers
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Closing connections...`);
  mongoose.connection.close(false, () => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
}