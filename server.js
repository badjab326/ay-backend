// Get .env variables
require("dotenv").config();

// Pull PORT from .env, give default value of 4000
// Pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;

// Import express
const express = require("express");

// Create application object
const app = express();

// Import mongoose
const mongoose = require("mongoose");

// Import middlware
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
.on('connected', () => console.log('connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' + err.message));

// MIDDLEWARE
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("Welcome to the Yearbook");
})

app.use('/july22', require('./controllers/avatar-yearbook'));

// LISTENER
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
});