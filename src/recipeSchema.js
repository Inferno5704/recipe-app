const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    imagePath: String, // This will store the file path of the image
    ingredients: [String],
    instructions: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
