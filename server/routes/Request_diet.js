const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { Register, Profile, RequestDiet } = require('../models'); // Adjust the import based on your project structure

// Route to get request diet data using session and requested_to
router.get('/diets', async (req, res) => {
    try {
        // Access session_user from the req object
        const { session_user } = req;

        // Retrieve the session user data
        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Define where condition
        const whereCondition = { requested_to: existingUser.id };

        // Fetch requests where the session user is the requested_to
        const requests = await RequestDiet.findAll({
            where: whereCondition,
            attributes: ['id','requested_by', 'message', 'status']
        });

        if (requests.length === 0) {
            return res.status(404).json({ error: 'No requests found.' });
        }

        // Extract the requested_by IDs
        const requestedByIds = requests.map(request => request.requested_by);

        // Fetch profiles for requested_by users
        const profiles = await Profile.findAll({
            include: [{
                model: Register,
                as: 'user',
                where: { id: { [Sequelize.Op.in]: requestedByIds } },
                attributes: ['user_type']
            }],
            attributes: ['user_id', 'first_name', 'last_name']
        });

        if (profiles.length === 0) {
            return res.status(404).json({ error: 'No profiles found.' });
        }

        // Map the profiles to the request data
        const output = requests.map(request => {
            const profile = profiles.find(profile => profile.user_id === request.requested_by);
            return {
                id: request.id,
                requested_by: request.requested_by,
                profile_name: `${profile.first_name} ${profile.last_name}`,
                message: request.message,
                status: request.status
            };
        });

        res.status(200).json(output);
    } catch (error) {
        console.error('Error fetching request diet data:', error);
        res.status(500).json({ error: 'An error occurred while fetching request diet data.' });
    }
});

// Route to update the status of a request diet entry
router.put('/status/:id', async (req, res) => {
    try {
        // Access session_user from the req object
        const { session_user } = req;
        const { id } = req.params;

        // Retrieve the session user data
        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the specific RequestDiet entry
        const request = await RequestDiet.findOne({
            where: {
                id: id,
                requested_to: existingUser.id // Ensure the user has the right to update the status
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found or unauthorized to update status.' });
        }

        // Update the status
        request.status = true;
        await request.save();

        res.status(200).json({ message: 'Request status updated successfully', request });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ error: 'An error occurred while updating request status.' });
    }
});

module.exports = router;
