const express = require('express');
const router = express.Router();
const { Login } = require("../models");

router.post("/", async (req, res) => {
    try {
        // Extract the session ID from the request body
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({ error: "Session ID is required." });
        }

        // Find the session in the database
        const existingSession = await Login.findOne({ where: { session_id } });

        if (!existingSession) {
            return res.status(404).json({ error: "Session not found." });
        }

        // Delete the session from the database
        await Login.destroy({ where: { session_id } });

        // Respond with success message
        res.status(200).json({ message: "Successfully signed out." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred." });
    }
});

module.exports = router;