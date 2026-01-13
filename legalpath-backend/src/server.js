// Load environment variables before other imports
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import './config/passport.js'; // Import passport configuration
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(passport.initialize()); // Initialize Passport for authentication

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
