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

// MODELS
const PersonSchame = new.mongoose.Schema({
    name: String,
    image: String,
}, {timestamps: true});

const Person = mongoose.model('Person', personSchema);

// MIDDLEWARE
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("Welcome to the Yearbook");
})

// I

app.get('/', async (req, res) => {
    try {
        res.json(await Person.find({}));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// N



// D

app.delete('/person/:id', async ( req, res) => {
    try {
        res.json(await Person.findByIdAndDelete(req.params.id));
    }  catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// U

app.put('/person/:id', async (res, req) => {
    try {
        res.json(await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
})

// C

app.post('/person', async (req, res) => {
    try {
        const person = await Person.create(req.body);
        res.json(person);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// E