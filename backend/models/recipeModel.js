const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    difficulty: String,
    time: String,
    ingredients: [String],
    instructions: String,
    userEmail: String,
    rating: [
  {
    userEmail: String,
    rating: Number
  }
]
});
module.exports = mongoose.model('recipe', recipeSchema)