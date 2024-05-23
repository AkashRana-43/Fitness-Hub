const express = require('express');
const router = express.Router();
const { Profile, Diet, Register, DietAssignment, RequestDiet } = require('../models'); // Import the Diet and Register models
const { sendEmail } = require('./mail');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');


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
                attributes: ['id','title', 'meal_name', 'meal_type', 'description', 'calories', 'protein', 'carbohydrates', 'fat', 'fiber']
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

router.post('/submitRequest', async (req, res) => {
    const { requested_to, message } = req.body;

    try {
        const { session_user } = req;

        // Verify that the requester is the user who has the session
        const requester = await Register.findOne({ where: { email: session_user.email } });

        if (!requester) {
            return res.status(404).json({ message: "Requester not found" });
        }

        const requestee = await Register.findByPk(requested_to);

        if (!requestee) {
            return res.status(404).json({ message: "Requestee not found" });
        }

        // Generate QR code with a URL to call an API
        const apiUrl = `http://192.168.4.49/profile/${requester.id}`;


         // Set the path to the uploads directory
         const uploadsDir = path.join(__dirname, '../uploads/');
         if (!fs.existsSync(uploadsDir)) {
             fs.mkdirSync(uploadsDir, { recursive: true });
         }
 
         // Path to save the QR code image
         const qrCodePath = path.join(uploadsDir, 'requester_qr.png');
         await QRCode.toFile(qrCodePath, apiUrl);
         
         const requesterProfile = await Profile.findOne({ where: { user_id: requester.id } });
         console.log(requesterProfile.first_name);
        // Construct the HTML email content
        const emailContent = `<h1>You have a new diet request from ${requesterProfile.first_name}</h1>
                              <p><strong>Message:</strong> ${message}</p>
                              <p><strong>Details of the requester:</strong></p>
                              <p><strong>Name : </strong>${requesterProfile.first_name}  ${requesterProfile.last_name}</p>
                              <p><strong>Contact : </strong>${requesterProfile.contact}</p>
                              <p><strong>Address : </strong>${requesterProfile.address}</p>
                              <p></p>
                              <p></p>
                              <p>With Regards,</p>
                              <p> ${requesterProfile.first_name}</p>
                              <p></p>
                              <p>See attached QR code for more details.</p>`;

        // Send email using the existing sendEmail function with the QR code image attached
        await sendEmail(requestee.email, 'New Diet Request', emailContent, [{
            filename: 'requester_qr.png',
            path: qrCodePath,
            contentType: 'image/png'
        }]);
        
        // Create the request in the database
        const newRequest = await RequestDiet.create({
            requested_by: requester.id,
            requested_to,
            message,
            status: false // Assuming 'false' means the request is not yet approved
        });

        res.status(201).json({ message: 'Request submitted, saved in database, and email sent successfully', requestId: newRequest.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to process the request', error: error.message });
    }
});

// Route to serve the QR code image for testing
router.get('/testQR', (req, res) => {
    const qrCodePath = path.join(__dirname, '../uploads/requester_qr.png');
    res.sendFile(qrCodePath);
});

router.post('/assign_diets', async (req, res) => {
    try {
        const { session_user } = req;
        const { dietIds, userId } = req.body;

        const trainer = await Register.findOne({ where: { email: session_user.email, user_type: 'trainer' } });
        if (!trainer) {
            return res.status(403).json({ error: 'Only trainers can assign diets' });
        }

        const diets = await Diet.findAll({
            where: {
                id: dietIds,
                user_id: trainer.id
            }
        });

        if (diets.length !== dietIds.length) {
            return res.status(404).json({ error: 'One or more diets not found or not created by this trainer' });
        }

        const user = await Register.findByPk(userId);
        const userEmail = user.email;
        const trainerProfile = await Profile.findOne({ where: { user_id: trainer.id } });
        const userProfile = await Profile.findOne({ where: { user_id: userId } });

        // Set the path to the uploads directory
        const uploadsDir = path.join(__dirname, '../uploads/'); // Adjust the path as necessary
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate PDF
        const pdfPath = path.join(uploadsDir, 'DietPlan.pdf');
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);
        doc.fontSize(16).text('Diet Plan Assignment', { underline: true });
        diets.forEach(diet => {
            doc.moveDown().fontSize(14).text(`Title: ${diet.title}`);
            doc.text(`Meal Name: ${diet.meal_name}`);
            doc.text(`Meal Type: ${diet.meal_type}`);
            doc.text(`Calories: ${diet.calories} kcal`);
            doc.text(`Protein: ${diet.protein} g`);
            doc.text(`Carbohydrates: ${diet.carbohydrates} g`);
            doc.text(`Fat: ${diet.fat} g`);
            doc.text(`Fiber: ${diet.fiber} g`);
            doc.moveDown();
        });
        doc.end();

        // Ensure the PDF is fully written before sending the email
        stream.on('finish', async () => {
            // Send Email with PDF attachment
            const emailContent = `Dear ${userProfile.first_name},\nYou have been assigned new diets by ${trainerProfile.first_name}. Please check the attached PDF for details.` ;
            await sendEmail(userEmail, 'Your Assigned Diet Plan', emailContent, [{
                filename: 'DietPlan.pdf',
                path: pdfPath,
                contentType: 'application/pdf'
            }]);

            res.status(200).json({ message: 'Diets successfully assigned and emailed with details in PDF format.' });
        });

        stream.on('error', (err) => {
            console.error('Stream Error:', err);
            res.status(500).json({ error: 'Error writing PDF file.' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});




module.exports = router;