const express = require('express');
const router = express.Router();
const { Diet, Register, DietAssignment } = require('../models'); // Import the Diet and Register models

router.get('/', async (req, res) => {
    try {
        const { session_user } = req;

        // Find the user from the session information
        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        let diets;
        if (existingUser.user_type === "admin") {
            // If the user is an admin, fetch all diet entries with user IDs
            diets = await Diet.findAll({
                attributes: ['id','title', 'meal_name', 'meal_type', 'description', 'calories', 'protein', 'carbohydrates', 'fat', 'fiber', 'user_id'], // Include user_id in the selection
                include: [{
                    model: Register,
                    as: 'user',
                    attributes: ['id', 'email'] // Optionally include user email or other identifying info
                }]
            });
        } else {
            // If not an admin, fetch only the diet entries that belong to the user
            diets = await Diet.findAll({
                where: { user_id: existingUser.id },
                attributes: ['title', 'meal_name', 'meal_type', 'description', 'calories', 'protein', 'carbohydrates', 'fat', 'fiber']
            });
        }

        // Send the diets response
        res.status(200).json(diets);
    } catch (error) {
        console.error("Error retrieving diet entries:", error);
        res.status(500).json({ error: "An error occurred while retrieving diet data." });
    }
});

// Route to create a new diet entry
router.post('/', async (req, res) => {
    try {
        const { session_user } = req;

        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        if (existingUser.user_type != "trainer") {
            return res.status(403).json({ error: 'Only trainers can create diet entries' });
        }

        const user_id = existingUser.id; 
        // Retrieve other data from the request body
        const { title, meal_name, meal_type, description, calories, protein, carbohydrates, fat, fiber } = req.body;

        // Create a new diet entry
        const newDiet = await Diet.create({
            user_id,
            title,
            meal_name,
            meal_type,
            description,
            calories,
            protein,
            carbohydrates,
            fat,
            fiber
        });

        // Send a success response
        res.status(201).json({ message: 'Diet entry created successfully', diet: newDiet });
    } catch (error) {
        // Handle errors
        console.error('Error creating diet entry:', error);
        res.status(500).json({ error: 'An error occurred while creating diet entry' });
    }
});

// Route to update an existing diet entry
router.put('/:dietId', async (req, res) => {
    try {
        const { session_user } = req;

        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        const user_id = existingUser.id; 

        // Retrieve dietId from the request parameters
        const { dietId } = req.params;

        // Find the diet entry to update
        const existingDiet = await Diet.findByPk(dietId);
        if (!existingDiet) {
            return res.status(404).json({ error: 'Diet entry not found' });
        }

        // Check if the user is an admin / authentic user
        if (existingUser.user_type !== "admin"){
            if (user_id !==  existingDiet.user_id ) {
                return res.status(403).json({ error: 'Only admins or Authentic user can delete diet entries' });
            }     
        }

        // Retrieve updated data from the request body
        const { title, meal_name, meal_type, description, calories, protein, carbohydrates, fat, fiber } = req.body;

        // Update the diet entry
        await existingDiet.update({
            title,
            meal_name,
            meal_type,
            description,
            calories,
            protein,
            carbohydrates,
            fat,
            fiber
        });

        // Send a success response
        res.status(200).json({ message: 'Diet entry updated successfully', diet: existingDiet });
    } catch (error) {
        // Handle errors
        console.error('Error updating diet entry:', error);
        res.status(500).json({ error: 'An error occurred while updating diet entry' });
    }
});

// Route to delete an existing diet entry
router.delete('/:dietId', async (req, res) => {
    try {
        const { session_user } = req;

        // Retrieve the session user data
        const existingUser = await Register.findOne({ where: { email: session_user.email } });
        // Retrieve dietId from the request parameters
        const { dietId } = req.params;
        // Find the diet entry to delete
        const existingDiet = await Diet.findByPk(dietId);
        if (!existingDiet) {
            return res.status(404).json({ error: 'Diet entry not found' });
        }
        // Check if the user is an admin / authentic user
        if (existingUser.user_type !== "admin"){
            if (existingUser.id !==  existingDiet.user_id ) {
                return res.status(403).json({ error: 'Only admins or Authentic user can delete diet entries' });
            }     
        }
                // First, delete related entries from DietAssignment
        await DietAssignment.destroy({
            where: { diet_id: dietId }
        });
        // Delete the diet entry
        await existingDiet.destroy();

        // Send a success response
        res.status(200).json({ message: 'Diet entry deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting diet entry:', error);
        res.status(500).json({ error: 'An error occurred while deleting diet entry' });
    }
});


router.post('/assign_diets', async (req, res) => {
    try {
        const { session_user } = req;
        const { dietIds, userId } = req.body; // dietIds is an array of diet IDs

        const trainer = await Register.findOne({ where: { email: session_user.email, user_type: 'trainer' } });
        if (!trainer) {
            return res.status(403).json({ error: 'Only trainers can assign diets' });
        }

        // Verify the diets exist and are created by this trainer
        const diets = await Diet.findAll({
            where: {
                id: dietIds,
                user_id: trainer.id
            }
        });
        if (diets.length !== dietIds.length) {
            return res.status(404).json({ error: 'One or more diets not found or not created by this trainer' });
        }

        // Create multiple DietAssignment entries for the specified user
        const assignments = dietIds.map(dietId => ({
            diet_id: dietId,
            user_id: userId
        }));
        await DietAssignment.bulkCreate(assignments, {
            ignoreDuplicates: true // This prevents re-assigning the same diet to the same user
        });

        res.status(200).json({ message: 'Diets successfully assigned to user' });
    } catch (error) {
        console.error('Error assigning diets to user:', error);
        res.status(500).json({ error: 'An error occurred while assigning the diets' });
    }
});



module.exports = router;