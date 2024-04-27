const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Register, Profile,Login } = require("../models");
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'fitnesshub987@gmail.com',
        pass: 'exmg zgwi ouvb kikd'
    }
});
// Function to send emails
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: 'fitnesshub987@gmail.com',
            to: to,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Route to handle user verification
router.get('/verify/:token/:email/', async (req, res) => {
    try {
        const { token, email } = req.params;

        // Find the user based on the verification token
        const user = await bcrypt.compare(token, email);
        if (!user) {
            return res.status(404).json({ error: 'User not found or token expired.' });
        }

        // Update the is_verified field to true
        await user.update({ is_verified: true });

        res.status(200).json({ message: 'User verified successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during verification.' });
    }
});

module.exports = { sendEmail };