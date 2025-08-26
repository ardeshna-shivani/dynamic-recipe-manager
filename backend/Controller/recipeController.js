const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Get all recipes
    res.json({ recipes });
  } catch (err) {
    console.error("Get recipes error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
  } catch (err) {
    console.error("Add recipe error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    console.error("Delete recipe error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { userEmail, rating, ...otherFields } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (userEmail && rating !== undefined) {
  const existingIndex = recipe.rating.findIndex(r => r.userEmail === userEmail);

  if (existingIndex !== -1) {
    // Update existing rating
    recipe.rating[existingIndex].rating = rating;
  } else {
    // Add new rating
    recipe.rating.push({ userEmail, rating });
  }

      await recipe.save();
      return res.status(200).json({ message: 'Rating updated', recipe });
    }

    Object.assign(recipe, otherFields);
    await recipe.save();

    res.status(200).json({ message: 'Recipe updated', recipe });

  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  // Defensive: Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (err) {
    console.error("Get single recipe error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllRecipes, addRecipe, deleteRecipe, editRecipe, getSingleRecipe };