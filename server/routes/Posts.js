const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Register } = require("../models");

router.get("/", (req, res) => {
    // Access session_id from the req object
    const { session_user } = req;
    console.log((session_user.email))
    res.json({ message: "Already logged in", session_user });
});

module.exports = router;