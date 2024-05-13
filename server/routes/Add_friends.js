const express = require('express');
const router = express.Router();
const { Register, AddFriend, Profile } = require("../models");
<<<<<<< HEAD
const { Sequelize } = require('sequelize');

// Route to get all pending friend requests received by a user
router.get('/requests/:status', async (req, res) => {
    try {
        const { session_user } = req;
        const { status } = req.params;
        // Retrieve the user data from the request session
        const existingUser = await Register.findOne({ where: { email: session_user.email } });
        // Find all pending friend requests where the user is the recipient
        // Get the IDs of users who are friends with the existingUser
        const friendIds = await AddFriend.findAll({
            attributes: ['requesterId', 'recipientId'],
            where: {
                [Sequelize.Op.or]: [
                    { recipientId: existingUser.id }
                ],
                status: [status]
            }
        }).then(friends => {
            const ids = friends.map(friend => friend.requesterId === existingUser.id ? friend.recipientId : friend.requesterId);
            return ids;
        });                

        // User is an admin, get all profile data for users with user_type "normal" or "trainer"
        profile_detail = await Profile.findAll({
                    include: [{
                        model: Register,
                        as: 'user',
                        where: {
                        id: { [Sequelize.Op.in]: [friendIds] }
                    },
                        attributes: ['user_type']
                    }],
                    attributes: ['user_id', 'first_name', 'last_name', 'contact', 'address', 'profile_image']
        });  

        // Process the result to access user_type attribute
        const processedResult = profile_detail.map(profile => ({
            user_id: profile.user_id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            contact: profile.contact,
            address: profile.address,
            profile_image: profile.profile_image,
            user_type: profile.user.user_type
        }));
        const output = processedResult;

        res.status(200).json(output);
=======
const profile = require('../models/profile');


// Route to get all pending friend requests received by a user
router.get('/requests', async (req, res) => {
    try {
        const { session_user } = req;

        // Retrieve the user data from the request session
        const existingUser = await Register.findOne({ where: { email: session_user.email } });
        //const Profile = await Profile.findOne({where: {email: session_user.email}});

        // Find all pending friend requests where the user is the recipient
        const friendRequests = await AddFriend.findAll({
            where: {
                recipientId: existingUser.id,
                status: 'pending'
            }
        });

        res.status(200).json(friendRequests);
>>>>>>> 13568df9ef55d95dca1a5ecad773051533eb2cf0
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});


// Route to accept or reject a friend request
router.put('/request/decision', async(req, res) => {
    try {
        const { requesterId , action } = req.body;
        const { session_user } = req;

        // Retrieve the updated user data from the request body
        const existingUser = await Register.findOne({ where: { email: session_user.email } });
        // Find the friend request by ID
        const friendRequest = await AddFriend.findOne({ where: {requesterId: requesterId } });
        // Check if the friend request exists
        if (!friendRequest) {
            return res.status(404).json({ error: 'Friend request not found.' });
        }

        // Check if the user is the recipient of the friend request
        if (existingUser.id !== friendRequest.recipientId) {
            return res.status(403).json({ error: 'You are not authorized to perform this action.' });
        }

        // Handle action (accept or reject)
        if (action === 'accept') {
            // Update the status to 'accepted'
            await friendRequest.update({ status: 'accepted' });

            return res.status(200).json({ message: 'Friend request accepted.' });
        } else if (action === 'reject') {
            // Delete the friend request
            await friendRequest.destroy();

            return res.status(200).json({ message: 'Friend request rejected and deleted.' });
        } else {
            return res.status(400).json({ error: 'Invalid action.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

// Route to send a friend request
router.post('/request', async (req, res) => {
    try {
        const { recipientId } = req.body;
        const { session_user } = req;
        
        // Retrieve the updated user data from the request body
        const existingUser = await Register.findOne({ where: {email : session_user.email} });
        // Check if both requesterId and recipientId are provided
        // Check if the recipientId exists
        const recipientExists = await Register.findOne({ where: { id: recipientId } });

        if (!recipientExists) {
            return res.status(404).json({ error: 'Recipient not found.' });
        }
        if (!recipientId) {
            return res.status(400).json({ error: 'recipientId are required.' });
        }
        const requesterId = existingUser.id ; 
        // Check if the friend request already exists
        const existingRequest = await AddFriend.findOne({
            where: {
                requesterId,
                recipientId
            }
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already exists.' });
        }

        // Create a new friend request
        const newRequest = await AddFriend.create({
            requesterId,
            recipientId
        });

        res.status(201).json(newRequest);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});


module.exports = router;