// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const { Register } = require("../models");

// router.post("/", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: "Email and password are required." });
//         }

//         // Find the user with the given email
//         const existingUser = await Register.findOne({ where: { email } });

//         if (!existingUser) {
//             return res.status(404).json({ error: "User not found." });
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const passwordMatch = await bcrypt.compare(password, existingUser.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ error: "Incorrect password." });
//         }

//         console.log("User found successfully");
//         const { first_name, last_name, user_type } = existingUser;
//         res.status(200).json({ first_name, last_name, email, user_type });

//     } catch (error) { 
//         console.error("Error:", error);
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// module.exports = router;

const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Register, Login, Profile } = require("../models");


// Initialize session middleware
// router.use(session({
//     secret: 'rohit_create_secret_key', // secret key
//     cookie: { maxAge: 900000 }, // 15 minutes in milliseconds
//     resave: true,
//     saveUninitialized: true,
//   }));

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

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        console.log("User found successfully");
        // Store user information in the session
        const { id, user_type } = existingUser;
        // if (req.session.authenticated) {
        //     console.log("Session already authenticated");
        //     console.log("Session expiration time:", req.session.cookie.expires);
        //     res.json(req.session);
        // } else {
            // req.session.user = { id, email, first_name, last_name, user_type };
            console.log("Session created");
            // console.log("Session expiration time:", req.session.cookie.expires);
            // Get the current date and time
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
            const profile = await Profile.findOne({ where: { email } });
            res.status(200).json( {email: email, session: create_session, first_name: profile.first_name,  profile_image: profile.profile_image});
        // }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred." });
    }
});

module.exports = router;