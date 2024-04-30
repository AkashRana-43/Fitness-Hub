const express = require('express');
const router = express.Router();
const { Register } = require("../models");
const { sendEmail } = require('../routes/mail');

// Route to send bulk emails based on category
router.post("/send-bulk", async (req, res) => {
    try {
        const { category, subject, message } = req.body;
        // Retrieve the session user data
        const { session_user } = req;
        // Check if the user is an admin
        const existingUser = await Register.findOne({ where: {email : session_user.email} });

        if (existingUser.user_type !== 'admin') {
            return res.status(403).json({ error: 'You are not authorized to perform this action.' });
        }

        // Find users with the specified category
        const users = await Register.findAll({ where: { user_type: category } });

        // Send email to each user
        for (const user of users) {
            await sendEmail(user.email, subject, message);
        }

        res.status(200).json({ message: 'Bulk emails sent successfully.' });
    } catch (error) {
        console.error('Error sending bulk emails:', error);
        res.status(500).json({ error: 'An error occurred while sending bulk emails.' });
    }
});

// Route to send individual email
router.post("/send-individual", async (req, res) => {
    try {
        const { email, subject, message } = req.body;
                // Retrieve the session user data
        const { session_user } = req;
        // Check if the user is an admin
        const existingUser = await Register.findOne({ where: {email : session_user.email} });

        if (existingUser.user_type !== 'admin') {
            return res.status(403).json({ error: 'You are not authorized to perform this action.' });
        }
        // Send email to the specified email address
        await sendEmail(email, subject, message);

        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending email.' });
    }
});

module.exports = router;