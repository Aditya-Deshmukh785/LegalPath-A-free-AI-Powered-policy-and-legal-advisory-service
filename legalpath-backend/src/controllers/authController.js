import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Generate JWT token with user information
 * @param {string} id - User ID
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} profilePicture - User's profile picture URL
 * @returns {string} JWT token
 */
export const generateToken = (id, name, email, profilePicture) => {
    // Use fallback values to prevent missing keys in payload
    const safeName = name || 'User Fallback';
    const safeEmail = email || 'no-email@example.com';
    const safePic = profilePicture || '';

    console.log("Generating Token FORCE valid:", { safeName, safeEmail, safePic });

    return jwt.sign(
        { id, name: safeName, email: safeEmail, profilePicture: safePic },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '30d' }
    );
};

/**
 * Validate email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, customId } = req.body;

        // Validate required fields
        if (!name || !email || !password || !customId) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }

        // Validate password length
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters' });
            return;
        }

        // Check if user already exists with email or customId
        const userExists = await User.findOne({ $or: [{ email }, { customId }] });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Get profile picture path if uploaded
        const profilePicture = req.file ? req.file.path : '';

        // Create user (Password stored as plain text per original implementation)
        const user = await User.create({
            name,
            email,
            password, // Stored as plain string
            customId,
            profilePicture,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                customId: user.customId,
                profilePicture: user.profilePicture,
                token: generateToken(user.id, user.name, user.email, user.profilePicture || ''),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Authenticate a user (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide email and password' });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Direct string comparison for password (plain text storage)
        if (user && user.password === password) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                customId: user.customId,
                profilePicture: user.profilePicture,
                token: generateToken(user.id, user.name, user.email, user.profilePicture || ''),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Google Login (Client-side token verification)
 * @route   POST /api/auth/google
 * @access  Public
 */
export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            res.status(400).json({ message: 'No token provided' });
            return;
        }

        // Verify Access Token by fetching user info from Google
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            res.status(400).json({ message: 'Invalid Google Token' });
            return;
        }

        const payload = await response.json();

        const { email, name, sub: googleId, picture } = payload;

        // Validate email exists
        if (!email) {
            res.status(400).json({ message: 'Google account has no email' });
            return;
        }

        // Check if user exists in database
        let user = await User.findOne({ email });

        if (user) {
            // If user exists but doesn't have googleId linked, link it
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // Create new user
            const customId = `google_${crypto.randomBytes(4).toString('hex')}`;
            user = await User.create({
                name: name || 'Google User',
                email,
                customId,
                profilePicture: picture,
                googleId,
                password: '', // No password for Google users
            });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            customId: user.customId,
            profilePicture: user.profilePicture,
            token: generateToken(user.id, user.name, user.email, user.profilePicture || ''),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
