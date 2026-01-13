import mongoose from 'mongoose';

/**
 * User Schema Definition
 * 
 * Fields:
 * - name: User's full name (required)
 * - email: User's email address (required, unique)
 * - password: User's password (optional, not required for Google Auth)
 * - customId: Custom user identifier (required, unique)
 * - profilePicture: URL/path to user's profile picture (optional)
 * - googleId: Google OAuth ID (optional, unique, sparse index)
 */
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }, // Not required for Google Auth
        customId: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true
        }, // Sparse index allows multiple null values
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const User = mongoose.model('User', UserSchema);

export default User;
