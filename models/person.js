const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    picture: String,
    linkedin: String,
    github: String,
    portfolio: String,
    location: String,
    instagram: String,
    quote: String,
    nation: String,
    gaming: {
        steam: String,
        xbox: String,
        sonypsn: String,
        nintendo: String},
    favorites: {
        favbook: String,
        favmovie: String,
        favgame: String}
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;