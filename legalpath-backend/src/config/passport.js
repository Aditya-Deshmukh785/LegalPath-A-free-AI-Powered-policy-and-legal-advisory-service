import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import crypto from 'crypto';

/**
 * Configure Passport.js with Google OAuth 2.0 Strategy
 * 
 * This strategy handles authentication via Google Sign-In.
 * When a user authenticates with Google:
 * 1. If user exists with that email, update their Google ID and profile info
 * 2. If user doesn't exist, create a new user with Google data
 */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Extract user information from Google profile
                const email = profile.emails?.[0].value;
                const googleId = profile.id;
                const name = profile.displayName || profile._json?.name;
                const picture = profile.photos?.[0]?.value || profile._json?.picture;

                console.log("GOOGLE PROFILE RAW:", JSON.stringify(profile, null, 2));

                // Validate that email exists
                if (!email) {
                    return done(new Error('No email found'), undefined);
                }

                // Check if user already exists in database
                let user = await User.findOne({ email });

                if (user) {
                    console.log("Found existing user:", user.name);

                    // Update googleId if not already set
                    if (!user.googleId) {
                        user.googleId = googleId;
                    }

                    // Force update profile picture and name if available from Google
                    if (picture) user.profilePicture = picture;
                    if (name) {
                        console.log("Updating name to:", name);
                        user.name = name;
                    } else {
                        console.log("No name found in Google Profile to update");
                    }

                    await user.save();

                    return done(null, user);
                }

                // Create new user if doesn't exist
                const customId = `google_${crypto.randomBytes(4).toString('hex')}`;
                user = await User.create({
                    name,
                    email,
                    customId,
                    profilePicture: picture,
                    googleId,
                    password: '', // No password for Google users
                });

                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);
