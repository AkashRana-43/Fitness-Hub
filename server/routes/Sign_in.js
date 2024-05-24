const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Register, Login, Profile } = require("../models");
const { sendToken } = require('./mail');

// Route to handle user verification
router.get('/', async (req, res) => {
    try {
        const token = req.query.token;
        const email = req.query.email;

        // Validate the token and email (assuming sendToken returns a hashed token)
        const tokenValid = await bcrypt.compare(email, token);
        
        if (!tokenValid) {
            return res.status(404).json({ error: 'Something changed in the link.' });
        }

        // Update the is_verified field to true
        const [numUpdatedRows] = await Register.update(
            { is_verified: true },
            { where: { email } }
        );

        // Check if any rows were updated
        if (numUpdatedRows === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }

        res.redirect('http://localhost:3000/login');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during verification.' });
    }
});

// Route to handle user login
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Find the user with the given email
        const existingUser = await Register.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if the user's email is verified
        if (!existingUser.is_verified) {
            // Send verification token
            const verification = sendToken(email);
            return res.status(403).json({ 
                error: "Email not verified. Verification link has been sent to your email."
            });
        }

        // Check if the user is blocked
        if (existingUser.is_blocked) {
            return res.status(403).json({ 
                error: "Your account is blocked. Please contact the administrator to unblock your account."
            });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Generate a session ID
        const sessionId = Math.random().toString(36).substring(2, 15);
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        // Save session information in the database
        await Login.create({
            email,
            session_id: sessionId,
            expiry
        });

        // Get the user's profile
        const profile = await Profile.findOne({ where: { user_id: existingUser.id } });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found." });
        }

        // Return user information and session ID
        res.status(200).json({ 
            id: existingUser.id,
            firstName: profile.first_name,
            user_type: existingUser.user_type,
            email,
            session: sessionId,
            expiry: expiry.getTime(), // Return expiry timestamp
            profile_image: profile.profile_image // Include the profile image
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred." });
    }
});

module.exports = router;
