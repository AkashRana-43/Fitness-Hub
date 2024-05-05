const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Register, Profile, AddFriend } = require("../models");
const { Sequelize } = require('sequelize');
const profile = require('../models/profile');

router.get("/", async (req, res) => {
    // Access session_id from the req object
    try {
        // Retrieve the session user data
        const { session_user } = req;
        
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let output;
        // Check if the session user is an admin
        if (existingUser.user_type === "admin" || existingUser.user_type === "Client" || existingUser.user_type === "Trainer") {
            output = await Profile.findOne({ where: { user_id: existingUser.id } });
            
        }else{
            return res.status(403).json({ error: "Unauthorized access." });
        }

        res.status(200).json(output);
    } catch (error) {
        console.error("Error for getting user profile data:", error);
        res.status(500).json({ error: "An error occurred while getting user profile data." });
    }
});

router.get("/allusers", async (req, res) => {
        // Access sesssion_id from the req object
        try {
            // Retrieve the session user data
            const { session_user } = req;
            
            const existingUser = await Register.findOne({ where: {email : session_user.email} });
            let output;
            // Check if the session user is an admin
            if (existingUser.user_type === "admin" || existingUser.user_type === "Client" || existingUser.user_type === "Trainer") {

                // Get the IDs of users who are friends with the existingUser
                const friendIds = await AddFriend.findAll({
                    attributes: ['requesterId', 'recipientId'],
                    where: {
                        [Sequelize.Op.or]: [
                            { requesterId: existingUser.id },
                            { recipientId: existingUser.id }
                        ],
                        status: 'accepted'
                    }
                }).then(friends => {
                    const ids = friends.map(friend => friend.requesterId === existingUser.id ? friend.recipientId : friend.requesterId);
                    return ids;
                });                

            
                output = await Profile.findAll({
                            include: [{
                                model: Register,
                                where: { user_type: ["Client", "Trainer"],
                                id: { [Sequelize.Op.notIn]: [friendIds, existingUser.id] }
                            },
                                attributes: []
                            }],
                            attributes: ['user_id', 'first_name', 'last_name', 'contact', 'address', 'profile_image']
                });  
                console.log(output);
            } else {
                // For non-admin users, return unauthorized error
                return res.status(403).json({ error: "Unauthorized access." });
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
        const {first_name, last_name, contact, address, profile_image } = req.body;
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let updating_user;
        // Check if the session user is an admin
        if (existingUser.user_type !== "admin") {
             // Find the user in the Register model by their ID
            updating_user = existingUser;
        }
        updating_user = await Profile.findOne({ where: { user_id: existingUser.id } });
        // If the user doesn't exist, return an error
        if (!updating_user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Update the user profile data
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