// import React, { useContext,useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import RecipeCard from '../Components/RecipeCard';
// import { AuthContext } from '../utils/Auth';
// import RecipeDetailsModal from '../Components/RecipeDetailsModal';

// const HomePage = (props) => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   // console.log("recipes: ",recipes);
//   const [showMyRecipe, setShowMyRecipe] = useState(false);
//   // console.log("showMyRecipe",showMyRecipe);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [triggerUpdate, setTriggerUpdate] = useState(false);
  

// //   useEffect(() => {
// //   console.log('triggerUpdate changed:', triggerUpdate);
// // }, [triggerUpdate]);

//   // Force re-render after delete
//   const refreshRecipes = () => setTriggerUpdate(prev => !prev);//delete true otherwise false
  
  
//   // Loading recipes from localStorage
//   const getRecipesFromStorage = () => {
//     return JSON.parse(localStorage.getItem('recipes')) || [];
//   };

//   const handleRatingUpdate = () => {
//     refreshRecipes();
//   };

//   // Handle filtering and sorting directly in the render cycle
//   const handleFilterAndSort = () => {
//     let visibleRecipes = getRecipesFromStorage(); // Make a shallow copy of the recipes
//     //console.log("visibleRecipes: ",visibleRecipes); [{}]
//     // console.log("AllRecipes: ",[...Allrecipes]);//[]
//     // Filter based on the "Show My Recipes" toggle
//     if (showMyRecipe && user) {//if user and show my recipe true login user recipe
//       visibleRecipes = visibleRecipes.filter((recipe) => recipe.userEmail === user.email);
//     }//my recipe btn click show user recipe.

//     // Filter by search term
//     if (props?.searchTerm) {
//       visibleRecipes = visibleRecipes.filter((recipe) =>
//         recipe.name.toLowerCase().includes(props?.searchTerm.toLowerCase())
//       );
//     }

//     // Filter by cuisine
//     if (props?.cuisineFilter) {
//       visibleRecipes = visibleRecipes.filter((recipe) => recipe.cuisine === props?.cuisineFilter);
//     }

//     // Filter by difficulty
//     if (props?.difficultyFilter) {
//       visibleRecipes = visibleRecipes.filter((recipe) => recipe.difficulty === props?.difficultyFilter);
//     }

//     // Sorting logic for time
//     if (props?.sortOption === 'time') {
//       visibleRecipes = visibleRecipes.sort((a, b) => {
//         const timeToMinutes = (time) => {
//           const [hours, minutes] = time.split(':').map(Number);
//           return hours * 60 + minutes;
//         };
//         //"01:30" → 1*60 + 30 = 90, "00:45" → 0*60 + 45 = 45
//         const timeA = timeToMinutes(a.time);
//         const timeB = timeToMinutes(b.time);
//         return timeA - timeB; // Sort in ascending order
//       });
//     } 
//     // Sorting logic for alphabetical order
//     else if (props?.sortOption === 'alpha') {
//       visibleRecipes = visibleRecipes.sort((a, b) => {
//         const nameA = String(a.name).toLowerCase();
//         const nameB = String(b.name).toLowerCase();
//         return nameA.localeCompare(nameB);
//       });
//     }

//     return visibleRecipes; // Return the filtered and sorted list
//   };

//   const handleDelete = (recipeId) => {
//     const allRecipe = getRecipesFromStorage();
//     const updatedRecipes = allRecipe.filter((recipe) => recipe.id !== recipeId);
//     //  setAllRecipes(updatedRecipes); // Update the recipes state
//     localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Store the updated list in localStorage
//     refreshRecipes();
//   };

//   // Get filtered recipes here instead of updating state on each render
//   const visibleRecipes = handleFilterAndSort();

//   return (
//     <div>
//       {/* User logged in, show the buttons for adding and filtering recipes */}
//       {user && (
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <button onClick={() => setShowMyRecipe((prev) => !prev)}>
//             {showMyRecipe ? "Show All Recipes" : "Show My Recipes"}
//           </button>
//           <button onClick={() => navigate("/addRecipe")}>Add Recipe</button>
//         </div>
//       )}

//       {/* No recipes found message */}
//       {visibleRecipes.length === 0 ? (
//         <p>No recipes found. Try adjusting your filters or add one!</p>
//       ) : (
//         <div style={gridStyle}>
//           {/* Render recipe cards */}
//           {visibleRecipes.map((r, index) => (
//             <RecipeCard
//               key={r.id || index}
//               recipe={r}
//               onDelete={handleDelete} // Pass handleDelete to RecipeCard
//               onClick={() => setSelectedRecipe(r)} // Set selectedRecipe when clicking a recipe card
//             />
//           ))}
//         </div>
//       )}

//       {/* Show Recipe Details Modal */}
//       {selectedRecipe && (
//         <RecipeDetailsModal
//           recipe={selectedRecipe} 
//            onClose={() => setSelectedRecipe(null)}
//            onRatingUpdate={handleRatingUpdate}
//         />
//       )}
//     </div>
//   );
// };

// const gridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//   gap: '20px',
// };

// export default HomePage;



import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../Components/RecipeCard';
import { AuthContext } from '../utils/Auth';
import RecipeDetailsModal from '../Components/RecipeDetailsModal';

const HomePage = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showMyRecipe, setShowMyRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  // Fetch all recipes from backend
  const fetchRecipesFromServer = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/recipes`);
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  useEffect(() => {
    fetchRecipesFromServer();
  }, [triggerUpdate]);

  // Force re-render after delete
  const refreshRecipes = () => setTriggerUpdate((prev) => !prev);

  const handleRatingUpdate = () => {
    refreshRecipes();
  };

  //delete recipe
  const handleDelete = async (recipeId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete recipe from server');
    }

    refreshRecipes();
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  const handleFilterAndSort = () => {
    let visibleRecipes = [...recipes]; 

    if (showMyRecipe && user) {
      visibleRecipes = visibleRecipes.filter((recipe) => recipe.userEmail === user.email);
    }

    if (props?.searchTerm) {
      visibleRecipes = visibleRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(props.searchTerm.toLowerCase())
      );
    }

    if (props?.cuisineFilter) {
      visibleRecipes = visibleRecipes.filter((recipe) => recipe.cuisine === props.cuisineFilter);
    }

    if (props?.difficultyFilter) {
      visibleRecipes = visibleRecipes.filter((recipe) => recipe.difficulty === props.difficultyFilter);
    }

    if (props?.sortOption === 'time') {
      visibleRecipes = visibleRecipes.sort((a, b) => {
        const timeToMinutes = (time) => {
          const [hours, minutes] = time.split(':').map(Number);
          return hours * 60 + minutes;
        };
        return timeToMinutes(a.time) - timeToMinutes(b.time);
      });
    } else if (props?.sortOption === 'alpha') {
      visibleRecipes = visibleRecipes.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }

    return visibleRecipes;
  };

  const visibleRecipes = handleFilterAndSort();

  return (
    <div>
      {user && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => setShowMyRecipe((prev) => !prev)}>
            {showMyRecipe ? 'Show All Recipes' : 'Show My Recipes'}
          </button>
          <button onClick={() => navigate('/addRecipe')}>Add Recipe</button>
        </div>
      )}

      {visibleRecipes.length === 0 ? (
        <p>No recipes found. Try adjusting your filters or add one!</p>
      ) : (
        <div style={gridStyle}>
          {visibleRecipes.map((r, index) => (
            <RecipeCard
              key={r._id || index}
              recipe={r}
              onDelete={() => handleDelete(r._id)}
              onClick={() => setSelectedRecipe(r)}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onRatingUpdate={handleRatingUpdate}
        />
      )}
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
};

export default HomePage;