const express = require('express');
const router = express.Router();
const { Register, AddFriend, Profile } = require("../models");
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

        // Check if recipientId is provided
        if (!recipientId) {
            return res.status(400).json({ error: 'Recipient ID is required.' });
        }

        // Retrieve the session user's information
        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        // Check if the session user exists
        if (!existingUser) {
            return res.status(404).json({ error: 'Session user not found.' });
        }

        // Check if the recipient exists
        const recipientExists = await Register.findOne({ where: { id: recipientId } });
        if (!recipientExists) {
            return res.status(404).json({ error: 'Recipient not found.' });
        }

        // Check if the friend request already exists
        const existingRequest = await AddFriend.findOne({
            where: {
                requesterId: existingUser.id,
                recipientId
            }
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already exists.' });
        }

        // Create a new friend request
        const newRequest = await AddFriend.create({
            requesterId: existingUser.id,
            recipientId
        });

        res.status(201).json(newRequest);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});


module.exports = router;
