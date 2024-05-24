


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
        // Find the user based on the verification token
        const user = await bcrypt.compare(email, token);
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'Something change in link.' });
        }

        // Update the is_verified field to true
        const [numUpdatedRows] = await Register.update(
            { is_verified: true },
            { where: { email: email } }
        );
        // Check if any rows were updated
        if (numUpdatedRows === 0) {
            res.status(404).json({ error: 'Email not found' });
        }

        res.redirect('http://localhost:3000/login');

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during verification.' });
    }
});

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

        console.log("User found successfully");
        // Store user information in the session
        const { id, user_type } = existingUser;
            const now = new Date();

            // Add 15 minutes to the current date and time
            const after15Minutes = new Date(now.getTime() + 15 * 60000);
            const create_session = Math.random().toString(36).substring(2, 15);
             // Save session expiry time in the database
            const newLogin = await Login.create({
                email,
                session_id: create_session, // Use req.sessionID to get the session ID
                expiry: after15Minutes, // Save session expiry time
            });
            const profile = await Profile.findOne({ where: { user_id: existingUser.id } });
            res.status(200).json( {id: existingUser.id, user_type: existingUser.user_type, email: email, session: create_session, first_name: profile.first_name,  profile_image: profile.profile_image});
        // }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred." });
    }
});

module.exports = router;