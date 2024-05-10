const express = require('express');
const router = express.Router();
const { Diet, Register } = require('../models'); // Import the Diet and Register models

// Route to create a new diet entry
router.post('/', async (req, res) => {
    try {
        const { session_user } = req;

        const existingUser = await Register.findOne({ where: { email: session_user.email } });

        if (!existingUser.user_type === "trainer") {
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

module.exports = router;