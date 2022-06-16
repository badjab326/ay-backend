// Dependencies
const express = require('express');
const Person = require ('../models/person');
const router = express.Router();

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
router.post('/', async (req, res) => {
    try {
        res.json(await Person.create(req.body))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Update
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    try {
        res.json(await Person.findByIdAndDelete(req.params.id))
    } catch (error) {
        console.log('error', error)
        res.json({error: 'something went wrong - check console'})
    }
});

// Exports
module.exports = router;