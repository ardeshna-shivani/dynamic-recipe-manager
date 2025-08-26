const express = require('express');
const router = express.Router();
const { getAllRecipes, addRecipe, deleteRecipe, editRecipe, getSingleRecipe } = require('../Controller/recipeController');

router.get('/', getAllRecipes);
router.post('/', addRecipe);
router.delete('/:id', deleteRecipe);
router.put('/:id',editRecipe);
router.get('/:id',getSingleRecipe);

module.exports = router;