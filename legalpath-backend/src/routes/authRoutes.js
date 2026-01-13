import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, generateToken } from '../controllers/authController.js';
import path from 'path';
import User from '../models/User.js';
import passport from 'passport';

const router = express.Router();

/**
 * Multer configuration for image upload
 * Handles profile picture uploads during registration
 */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in uploads/ directory
    },
    filename(req, file, cb) {
        // Generate unique filename with timestamp
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        // Only allow jpeg, jpg, and png images
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    },
});

/**
 * Authentication Routes
 */

// Register new user with optional profile picture upload
router.post('/register', upload.single('profilePicture'), registerUser);

// Login existing user
router.post('/login', loginUser);

/**
 * Passport Google OAuth Routes
 * These routes handle server-side Google authentication flow
 */

// Initiate Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000?error=GoogleAuthFailed',
        session: false // We use JWT tokens, not sessions
    }),
    async (req, res) => {
        try {
            // Successful authentication
            console.log('=== Google Auth Callback Hit ===');
            const passportUser = req.user;

            console.log('Passport User ID:', passportUser?._id);

            // Fetch fresh user data from database to ensure all fields are populated
            const user = await User.findById(passportUser._id);

            if (!user) {
                console.error('User not found in database!');
                return res.redirect('http://localhost:3000?error=UserNotFound');
            }

            console.log('Fresh User Data:', {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            });

            // Prepare JWT payload with explicit values
            const payload = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture || ''
            };

            console.log('JWT Payload BEFORE signing:', JSON.stringify(payload, null, 2));
            console.log('Payload field types:', {
                id: typeof payload.id,
                name: typeof payload.name,
                email: typeof payload.email,
                profilePicture: typeof payload.profilePicture
            });

            // Generate JWT token with all user fields
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '30d' }
            );

            console.log('Token generated successfully');
            console.log('Token preview:', token.substring(0, 50) + '...');

            // Redirect to frontend with token
            res.redirect(`http://localhost:3000?token=${token}`);
        } catch (error) {
            console.error('Error in Google callback:', error);
            res.redirect('http://localhost:3000?error=ServerError');
        }
    }
);

/**
 * Test endpoint to verify backend is working
 */
router.get('/test', (req, res) => {
    console.log('TEST ENDPOINT HIT!');
    res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

export default router;
