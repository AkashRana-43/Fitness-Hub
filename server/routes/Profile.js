const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Register, Profile, AddFriend } = require("../models");
const { Sequelize } = require('sequelize');
const profile = require('../models/profile');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



router.get("/", async (req, res) => {
    // Access session_id from the req object
    try {
        // Retrieve the session user data
        const { session_user } = req;
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        let output = await Profile.findOne({ where: { user_id: existingUser.id } });
        if (existingUser.user_type === "admin"){
            output = await Profile.findAll({
                include: [{
                    model: Register,
                    as: 'user',
                    where: { user_type: ["normal", "trainer"]
                },
                    attributes: ['user_type']
                }],
                attributes: ['user_id', 'first_name', 'last_name', 'contact', 'address', 'profile_image','current_height','current_weight','sex','body_type','goal_weight','goal_body_type']
            }); 
            output = output.map(profile => ({
                user_id: profile.user_id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                contact: profile.contact,
                address: profile.address,
                profile_image: profile.profile_image,
                user_type: profile.user.user_type,
                current_height: profile.current_height,
                current_weight: profile.current_weight,
                sex: profile.sex,
                body_type: profile.body_type,
                goal_weight: profile.goal_weight,
                goal_body_type: profile.goal_body_type  
            }));
        };
        res.status(200).json(output);
    } catch (error) {
        console.error("Error for getting user profile data:", error);
        res.status(500).json({ error: "An error occurred while getting user profile data." });
    }
});

router.get("/allusers", async (req, res) => {
    try {
        // Access session_user from the req object
        const { session_user } = req;

        // Retrieve the session user data
        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the session user is an admin, normal, or trainer
        if (["admin", "normal", "trainer"].includes(existingUser.user_type)) {
            // Get the IDs of users who are friends with the existingUser
            const friendIds = await AddFriend.findAll({
                attributes: ['requesterId', 'recipientId'],
                where: {
                    [Sequelize.Op.or]: [
                        { requesterId: existingUser.id },
                        { recipientId: existingUser.id }
                    ],
                    status: ['accepted', 'pending']
                }
            }).then(friends => {
                const ids = friends.map(friend => friend.requesterId === existingUser.id ? friend.recipientId : friend.requesterId);
                ids.push(existingUser.id); // Add the session user's own ID to ensure they are excluded
                return ids;
            });

            console.log("Friend IDs:", friendIds);

            // Get all profile data for users with user_type "normal" or "trainer" excluding friends
            const profileDetail = await Profile.findAll({
                include: [{
                    model: Register,
                    as: 'user',
                    where: {
                        user_type: ["normal", "trainer"],
                        id: { [Sequelize.Op.notIn]: friendIds }
                    },
                    attributes: ['user_type']
                }],
                attributes: ['user_id', 'first_name', 'last_name', 'contact', 'address', 'profile_image']
            });

            console.log("Profile Details excluding friends:", profileDetail);

            // Process the result to access user_type attribute
            const processedResult = profileDetail.map(profile => ({
                user_id: profile.user_id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                contact: profile.contact,
                address: profile.address,
                profile_image: profile.profile_image,
                user_type: profile.user.user_type // Access user_type from the Register object
            }));

            res.status(200).json(processedResult);
        } else {
            // For non-admin users, return unauthorized error
            return res.status(403).json({ error: "Unauthorized access." });
        }
    } catch (error) {
        console.error("Error for getting user profile data:", error);
        res.status(500).json({ error: "An error occurred while getting user profile data." });
    }
});



router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { session_user } = req; // This assumes you are storing logged-in user's info in session_user

    try {
        const userProfile = await Profile.findOne({
            where: { user_id: userId },
            include: [{
                model: Register,
                as: 'user',
                attributes: ['user_type']
            }]
        });

        if (!userProfile) {
            return res.status(404).json({ error: "Profile not found." });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "An error occurred while fetching user profile data." });
    }
});





router.put("/", upload.single('profile_image'), async (req, res) => {
    try {
        // Retrieve the session user data
        const { session_user } = req;


        // Retrieve the updated user data from the request body
        const {
            user_id, first_name, last_name, contact, address,
            current_height, current_weight, sex, body_type, goal_weight, goal_body_type
        } = req.body;
        const profile_image = req.file ? req.file.filename : null; // This now contains of the uploaded file if there is one
        const existingUser = await Register.findOne({ where: { email: session_user.email } });
        let updating_user;

        // Check if the session user is an admin
        if (existingUser.user_type !== "admin") {
            // Find the user in the Profile model by their ID
            updating_user = await Profile.findOne({ where: { user_id: existingUser.id } });
        } else {
            updating_user = await Profile.findOne({ where: { user_id: user_id } });
        }


        // If the user doesn't exist, return an error
        if (!updating_user) {
            return res.status(404).json({ error: "User not found." });
        }


        // Update the user profile data
        updating_user.first_name = first_name;
        updating_user.last_name = last_name;
        updating_user.contact = contact;
        updating_user.address = address;
        if (profile_image) {
            updating_user.profile_image = profile_image;
        }
        updating_user.current_height = current_height;
        updating_user.current_weight = current_weight;
        updating_user.sex = sex;
        updating_user.body_type = body_type;
        updating_user.goal_weight = goal_weight;
        updating_user.goal_body_type = goal_body_type;

        if (profile_image) {
            updating_user.profile_image = profile_image;
        }
        updating_user.current_height = current_height;
        updating_user.current_weight = current_weight;
        updating_user.sex = sex;
        updating_user.body_type = body_type;
        updating_user.goal_weight = goal_weight;
        updating_user.goal_body_type = goal_body_type;

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