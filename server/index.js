const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const { Login } = require("./models");
const router = express.Router();


app.use(cookieParser());
app.use(express.json());

const db = require("./models");



// ROUTERS
const registerRouter = require("./routes/Registers"); 
const loginRouter = require("./routes/Sign_in");
const postRouter = require("./routes/Posts");
const profileRouter = require("./routes/Profile");
const logoutRouter = require("./routes/Sign_out");
const addfriendRouter = require("./routes/Add_friends");
const bulkMessageRouter = require("./routes/Bulk_message");
const dietRouter = require("./routes/Diet");


app.use("/register", registerRouter);
app.use("/register_detail", checkSessionExpiration, registerRouter);
app.use("/login", loginRouter);
app.use("/posts", checkSessionExpiration, postRouter);
app.use("/profile", checkSessionExpiration, profileRouter);
app.use("/logout", checkSessionExpiration, logoutRouter);
app.use("/add_friend", checkSessionExpiration, addfriendRouter);
app.use("/verify",loginRouter);
app.use("/bulk_email",checkSessionExpiration, bulkMessageRouter);
app.use("/diet",checkSessionExpiration, dietRouter);


 db.sequelize.sync().then(() =>{
   app.listen(3001, () => {
      console.log("server is running on port 3001");
   });
 });

// Middleware to check session expiration and remove expired session from the database
async function checkSessionExpiration(req, res, next) {
  try {
    // Retrieve the session expiry date from the database based on session id
    const session_id = req.headers.session;
    // const { session_id } = req.body;
    const sessionExpiry = await Login.findOne({
      where: { session_id: session_id},
      // attributes: ['id', 'expiry']
    });
    if (!sessionExpiry) {
      // Session not found in the database, consider it expired
      req.session.destroy();
      return res.status(401).json({ error: "Session has expired. Please log in again." });
    }

    // Convert the database expiry date to a JavaScript Date object
    const expiryDate = new Date(sessionExpiry.expiry);

    // Check if the session has expired
    if (expiryDate <= new Date()) {
      console.log(sessionExpiry.session_id)
      // Remove the expired session entry from the database
      await Login.destroy({ where: { session_id: sessionExpiry.session_id } });
      
      return res.status(401).json({ error: "Session has expired. Please login again." });
    } else {
      // Add session_id to the req object
      req.session_user = sessionExpiry;
      // Session is still valid, proceed to the next middleware or route handler
      next();
    }
  } catch (error) {
    console.error("Error checking session expiration:", error);
    res.status(500).json({ error: "An error occurred while checking session expiration." });
  }
}

function removeUnwantedSessionFromDb(email_id) {
      // Check if the session has expired
      if (expiryDate <= new Date()) {
        console.log(sessionExpiry.session_id)
        // Remove the expired session entry from the database
        Login.destroy({ where: { session_id: sessionExpiry.session_id } });
      }
}