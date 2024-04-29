const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Register, Profile,Login } = require("../models");

router.get("/recieve", async(req, res) => {
    try {
        // Retrieve the session user data
        const { session_user } = req;
        console.log(session_user);
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let output;
        // Check if the session user is an admin
        if (existingUser.user_type == "admin") {
             // User is an admin, get all register data
             output = await Register.findAll();
        }
        else{
            // User is not an admin, get register data for the logged-in user
            output = existingUser;
        }

        res.status(200).json(output);
    } catch (error) {
        console.error("Error for getting user data:", error);
        res.status(500).json({ error: "An error occurred while getting user data." });
    }
});

router.post("/", async (req, res) => {
    console.log("Received POST request");
    try {
        const { first_name, last_name, email, password, user_type } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Check if email already exists
        const existingUser = await Register.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Create a new record with the hashed password
        const newRegister = await Register.create({
            email,
            password: hashedPassword, // Store the hashed password in the database
            user_type
        });

        const newProfile = await Profile.create({
            user_id: newRegister.id,
            first_name,
            last_name
        });
        console.log("Record created successfully:", newRegister.toJSON(), newProfile.toJSON());
        res.json(newRegister);
    } catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({ error: "An error occurred while creating the record." });
    }
});

router.put("/update", async (req, res) => {
    try {
        // Retrieve the session user data
        const { session_user } = req;
        console.log(session_user);
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        // Check if the session user is an admin
        if (existingUser.user_type !== "admin") {
            return res.status(403).json({ error: "Only admins can update user data." });
        }
        // Retrieve the updated user data from the request body
        const { email, user_type, is_verified, is_blocked } = req.body;
        console.log(email);
        // Find the user in the Register model by their ID
        const updating_user = await Register.findOne({ where: {email : email} });
        // Check if the session user is an admin;

        // If the user doesn't exist, return an error
        if (!updating_user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Update the user data
        updating_user.email = email; // Note: You might want to hash the password again if it's being updated
        updating_user.user_type = user_type;
        updating_user.is_verified = is_verified;
        updating_user.is_blocked = is_blocked;

        // Save the updated user data
        await updating_user.save();

        // Respond with the updated user data
        res.json({ message: "User data updated successfully", user: updating_user.toJSON() });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "An error occurred while updating user data." });
    }
});
module.exports = router;

