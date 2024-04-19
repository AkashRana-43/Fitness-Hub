const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Register, Profile } = require("../models");

router.get("/", async (req, res) => {
    // Access session_id from the req object
    try {
        // Retrieve the session user data
        const { session_user } = req;
        
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let output;
        // Check if the session user is an admin
        if (existingUser.user_type == "admin") {
             // User is an admin, get all profile data
             output = await Profile.findAll();
        }else{
            console.log(session_user.email)
            // User is not an admin, get profile data for the logged-in user
            output = await Profile.findOne({ where: {email : session_user.email} });
        }

        res.status(200).json(output);
    } catch (error) {
        console.error("Error for getting user profile data:", error);
        res.status(500).json({ error: "An error occurred while getting user profile data." });
    }
});

router.put("/", async (req, res) => {
    try {
        // Retrieve the session user data
        const { session_user } = req;
        console.log(session_user);
        // Retrieve the updated user data from the request body
        const { email, first_name, last_name, contact, address, profile_image } = req.body;
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let updating_user;
        // Check if the session user is an admin
        if (existingUser.user_type !== "admin") {
             // Find the user in the Register model by their ID
            updating_user = existingUser;
        }
        updating_user = await Profile.findOne({ where: {email : email} });
        // If the user doesn't exist, return an error
        if (!updating_user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Update the user profile data
        updating_user.email = email; 
        updating_user.first_name = first_name;
        updating_user.last_name = last_name;
        updating_user.contact = contact;
        updating_user.address = address;
        updating_user.profile_image = profile_image;
        // Save the updated user data
        await updating_user.save();

        // Respond with the updated user data
        res.json({ message: "User profile data updated successfully", user: updating_user.toJSON() });
    } catch (error) {
        console.error("Error updating user profile data:", error);
        res.status(500).json({ error: "An error occurred while updating user profile data." });
    }
});



module.exports = router;