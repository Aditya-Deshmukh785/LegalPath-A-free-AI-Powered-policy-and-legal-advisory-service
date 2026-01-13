import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

/**
 * Script to create a test user in the database
 * This is useful for testing and verifying MongoDB connection
 * Run with: node src/scripts/createTestUser.js
 */
const createTestUser = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Test user data
        const testUser = {
            name: 'Test Compass User',
            email: 'compass_test@example.com',
            password: 'plainpassword123',
            customId: 'compass_001',
            profilePicture: '',
        };

        // Check if test user already exists to avoid duplicate error on re-runs
        const existing = await User.findOne({ email: testUser.email });
        if (existing) {
            console.log('Test user already exists. Database should be visible in Compass.');
        } else {
            await User.create(testUser);
            console.log('✅ Test user created successfully!');
            console.log('🚀 Go to MongoDB Compass and refresh. You should see "legalpath" database and "users" collection.');
        }

        process.exit(0); // Exit successfully
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1); // Exit with error
    }
};

createTestUser();
