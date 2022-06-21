// Dependencies
const express = require('express');
const Person = require ('../models/person');
const router = express.Router();

function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).json({message: 'you must be logged in'})
    } else {
        return next()
    }
}

// Routes
// Index 
router.get('/', async (req, res) => {
    try {
        res.send(await Person.find({}))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Create
router.post('/', isAuthenticated, async (req, res) => {
    try {
        res.json(await Person.create(req.body))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Update
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        res.json(await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Delete
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        res.json(await Person.findByIdAndDelete(req.params.id))
    } catch (error) {
        console.log('error', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Exports
module.exports = router;