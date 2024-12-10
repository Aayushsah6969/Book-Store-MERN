import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './routes/book.route.js';
import userRoute from './routes/user.route.js';
import orderRoute from './routes/order.route.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Database connection
(async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error: ", error.message);
  }
})(  );

// Enable CORS for cross-origin requests from your frontend
// const allowedOrigins = [
//   'https://mega-bookstore-frontend.onrender.com', 
//   'https://mega-bookstore.onrender.com',
//   'http://localhost:3000'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, Postman, etc.)
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,  // Allows sending cookies and authentication headers
//   methods: "GET, POST, PUT, DELETE",  // Allow specific HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
// }));

app.use(cors());
// Add middleware for JSON
app.use(express.json());

// Define routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
