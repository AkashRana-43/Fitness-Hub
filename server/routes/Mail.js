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
const sendEmail = async (to, subject, html, attachments = []) => {
    try {
        const mailOptions = {
            from: 'fitnesshub987@gmail.com',
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const sendToken =  async (email) => {
    try{
        // Generate a verification token (hash) for the email
        const verificationToken = await bcrypt.hash(email, 10);
        const verificationLink = `http://localhost:3001/verify?token=${verificationToken}&email=${email}`;
        const html = `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`;
                
        await sendEmail(email, 'Email Verification', html);
        console.log(verificationLink);
        return verificationLink;
    } catch (error) {
        console.error('Error while creating token:', error);
        throw error;
    }
};





module.exports = { sendEmail, sendToken};