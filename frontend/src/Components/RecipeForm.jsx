// import React, { useContext, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from '../utils/Auth';

// const RecipeForm = () => {
//   const { id } = useParams();//url ne ander thi dynamic value.
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
//   // Retrieve initial data for editing (if any)
//   const initialData = id ? recipes.find((r) => r.id.toString() === id) : {};
//   //console.log("initialData: ",initialData);//recipe obj
//   //const id = "102" url thi 
//   // const recipes = [{ id: 101, name: "Pasta" },{ id: 102, name: "Pizza" },{ id: 103, name: "Burger" }];
//   //find r.id "102" === "102" = initialdata ma update thay 
//   const parseTime = (timeStr) => {
//     const parts = timeStr ? timeStr.split(':') : [];
//     // console.log("parts: ",parts);['2', '14']  
//     const hours = parts[0] && !isNaN(parts[0]) ? parseInt(parts[0]) : 0;
//     //console.log("hours: ",hours); //parts[0] - "2" 
//     const minutes = parts[1] && !isNaN(parts[1]) ? parseInt(parts[1]) : 0;
//     // console.log("minutes: ",minutes);   //parts[1] - "30"
//     return { hours, minutes };
//   };

//   // Parse the time into hours and minutes
//   const { hours: initialHours, minutes: initialMinutes } = parseTime(initialData?.time);
//   // console.log("parseTime",parseTime(initialData?.time)); {}
  


//   // State hooks for form inputs
//   const [name, setName] = useState(initialData?.name || "");
//   const [cuisine, setCuisine] = useState(initialData?.cuisine || "");
//   const [instructions, setInstructions] = useState(initialData?.instructions || "");

//   // Ensure that hours and minutes are initialized with valid values
//   const [hours, setHours] = useState(initialHours);
//   const [minutes, setMinutes] = useState(initialMinutes);

//   const [difficulty, setDifficulty] = useState(initialData?.difficulty || "Easy");
//   const [ingredients, setIngredients] = useState(initialData?.ingredients || [""]);

//   // Handler to add/update a recipe
//   const onAddOrEdit = (newRecipe) => {
//     const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//get recipe
//     // console.log("Existing Recipes: ", existingRecipes);//[{}]
//     if (initialData?.id) {//edit recipe id
//       // console.log("Initial Data ID: ", initialData.id); // Logs the ID of the recipe being edited
//       // console.log("New Recipe: ", newRecipe);//{}
//       // Editing an existing recipe
//       const updatedRecipes = existingRecipes.map(recipe =>
//         recipe.id === initialData.id ? newRecipe : recipe//jena id match thay ta add
//         //initialData.id cha recipe thase otherwise newrecipe
//       );
//       // console.log("Updated Recipes: ", updatedRecipes);[{}]
//       localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
//     } else {
//       // Adding a new recipe
//       const newRecipeWithId = { ...newRecipe, id: Date.now() }; //{id: "1", name: "pasta"}
//       // console.log("New Recipe with ID: ", newRecipeWithId);
//       const updatedRecipes = [...existingRecipes, newRecipeWithId];//[{id:"1", name: "pasta"},{id:"123", name: "Sandwhich"}]
//       // console.log("existingRecipes",existingRecipes);//all recipe [{}]
//       //console.log("newRecipeWithId",newRecipeWithId); {}
//       //console.log("Updated Recipes with New Recipe: ", updatedRecipes); // Logs the list after adding the new recipe
//       localStorage.setItem('recipes', JSON.stringify(updatedRecipes));//save

//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const paddedMinutes = minutes.toString().padStart(2, '0');
//     const timeString = `${hours}:${paddedMinutes}`;

//     const newRecipe = {
//       id: initialData?.id || Date.now(),
//       name,
//       cuisine,
//       instructions,
//       time: timeString,
//       difficulty,
//       ingredients: ingredients.filter((ing) => ing!== ""),
//       userEmail: user.email
//     };

//     console.log("new recipe: ", newRecipe);

//     onAddOrEdit(newRecipe); // Add or Edit the recipe
//     navigate('/'); // Navigate to the homepage after submission
//   };

//   // Handle ingredient changes (add/remove ingredients)
//   const handleIngredientChange = (index, value) => {//change in input field 
//     const updatedIngredients = [...ingredients];//copy ingredients array like:ingredients = ["Salt", "Pepper", "Oil"]
//     updatedIngredients[index] = value;//update value, like(1,"Chilli")
//     setIngredients(updatedIngredients);//update ingredients array, like: ["Salt", "Chili", "Oil"].
//   };

//   const addIngredient = () => {
//     setIngredients([...ingredients, '']);//ingredients array ma blank box add karva
//   };

//   const removeIngredient = (index) => {
//     const updatedIngredients = ingredients.filter((_, i) => i !== index);//_ aa element 
//     setIngredients(updatedIngredients);//[]
//   };
//   //ingredients = ["Tomato", "Onion", "Garlic"] //remove: onion - index 1
//   //"Tomato" -> 0 -> 0!==1 -> including in new list
//   //"Onion" -> 1 -> 1!==1 -> include nahi thay

//   return (
//     <form onSubmit={handleSubmit} className="container" style={{ maxWidth: '600px' }}>
//       <h2>{initialData?.id ? 'Edit Recipe' : 'Add Recipe'}</h2>

//       <label>Recipe Name:</label>
//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <label>Cuisine Type:</label>
//       <select
//         value={cuisine}
//         onChange={(e) => setCuisine(e.target.value)}
//         required
//       >
//         <option value="">Select cuisine</option>
//         <option>Italian</option>
//         <option>Mexican</option>
//         <option>Asian</option>
//       </select>

//       <label>Instructions:</label>
//       <textarea
//         value={instructions}
//         onChange={(e) => setInstructions(e.target.value)}
//         rows={4}
//         required
//       />

//       <label>Cooking Time:</label>
//       <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//         <div style={{marginRight:'5px'}}>
//           <input
//             type="number"
//             min="0"
//             value={hours}
//             onChange={(e) => setHours(Number(e.target.value))}
//             required
//             placeholder="Hours"
//           />
//         </div> Hours

//         <div style={{marginRight:'5px'}}>
//           <input
//             type="number"
//             min="0"
//             max="59"
//             value={minutes}
//             onChange={(e) => setMinutes(Math.min(Number(e.target.value), 59))}
//             required
//             placeholder="Minutes"
//           />
//         </div> Minutes
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
//         <label style={{ whiteSpace: 'nowrap' }}>Difficulty Level:</label>

//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//             <input type="radio" name="difficulty" value="Easy" checked={difficulty === "Easy"} onChange={() => setDifficulty("Easy")} />
//             Easy
//           </label>

//           <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//             <input type="radio" name="difficulty" value="Medium" checked={difficulty === "Medium"} onChange={() => setDifficulty("Medium")} />
//             Medium
//           </label>

//           <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//             <input type="radio" name="difficulty" value="Hard" checked={difficulty === "Hard"} onChange={() => setDifficulty("Hard")} />
//             Hard
//           </label>
//         </div>
//       </div>

//       <label>Ingredients:</label>
//       {ingredients.map((ingredient, index) => (
//         <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '5px' }}>
//           <input
//             type="text"
//             value={ingredient}
//             onChange={(e) => handleIngredientChange(index, e.target.value)}
//             placeholder={`Ingredient ${index + 1}`}
//             style={{ flex: 1 }}
//             required
//           />
//           {ingredients.length > 1 && (
//             <button
//               type="button"
//               onClick={() => removeIngredient(index)}
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '50%',
//                 padding: '8px',
//                 width: '30px',
//                 height: '30px',
//                 cursor: 'pointer',
//                 // alignItems: 'center',
//                 // justifyContent: 'center'
//               }}
//               aria-label={`Delete ingredient ${index + 1}`}
//             >
//               X
//             </button>
//           )}
//         </div>
//       ))}

//       <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
//         <button type="button" onClick={addIngredient}>Add Ingredient</button>
//       </div>

//       <button type="submit" style={{ marginBottom: '20px' }}>
//         {initialData?.id ? 'Update Recipe' : 'Add Recipe'}
//       </button>
//     </form>
//   );
// };

// export default RecipeForm;

// //filtering data set
// //click logo go to home page
// //form add one field HH:MM and logic add and edit form
// //show my recipe btn click show login user recipe with edit and delete flow. otherwise show all recipe.



import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../utils/Auth';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!id); //if id than loading state true

  // Form state
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [instructions, setInstructions] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [ingredients, setIngredients] = useState(['']);

  // Parse "HH:MM" string
  const parseTime = (timeStr) => {
    const parts = timeStr ? timeStr.split(':') : [];
    const hours = parts[0] && !isNaN(parts[0]) ? parseInt(parts[0]) : 0;
    const minutes = parts[1] && !isNaN(parts[1]) ? parseInt(parts[1]) : 0;
    return { hours, minutes };
  };

  // Fetch recipe data editing
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;//id cha to edit mode cha to recipe show

      try {
        const res = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!res.ok) throw new Error('Recipe not found');
        const data = await res.json();
        setInitialData(data.recipe);
        setName(data.recipe.name || '');
        setCuisine(data.recipe.cuisine || '');
        setInstructions(data.recipe.instructions || '');
        const { hours, minutes } = parseTime(data.recipe.time);
        setHours(hours);
        setMinutes(minutes);
        setDifficulty(data.recipe.difficulty || 'Easy');
        setIngredients(data.recipe.ingredients || ['']);
      } catch (err) {
        console.error(err);
        alert('Failed to load recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paddedMinutes = minutes.toString().padStart(2, '0');
    const timeString = `${hours}:${paddedMinutes}`;

    const recipeData = {
      name,
      cuisine,
      instructions,
      time: timeString,
      difficulty,
      ingredients: ingredients.filter((ing) => ing !== ''),
      userEmail: user?.email,
    };

    try {
      if (initialData?._id) {
        // Edit existing recipe
        const res = await fetch(`http://localhost:5000/api/recipes/${initialData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        });

        if (!res.ok) throw new Error('Failed to update recipe');
      } else {
        // Create new recipe
        const res = await fetch('http://localhost:5000/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        });

        if (!res.ok) throw new Error('Failed to add recipe');
      }

      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);//blank box add 

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: '600px' }}>
      <h2>{initialData ? 'Edit Recipe' : 'Add Recipe'}</h2>

      <label>Recipe Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Cuisine Type:</label>
      <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
        <option value="">Select cuisine</option>
        <option>Italian</option>
        <option>Mexican</option>
        <option>Asian</option>
      </select>

      <label>Instructions:</label>
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={4} required />

      <label>Cooking Time:</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value))} required />
        Hours
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(Math.min(Number(e.target.value), 59))}
          required
        />
        Minutes
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '10px' }}>
        <label style={{ whiteSpace: 'nowrap' }}>Difficulty Level:</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <input type="radio" name="difficulty" value={level} checked={difficulty === level} onChange={() => setDifficulty(level)} />
              {level}
            </label>
          ))}
        </div>
      </div>

      <label>Ingredients:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '5px' }}>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder={`Ingredient ${index + 1}`}
            style={{ flex: 1 }}
            required
          />
          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '8px',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
              aria-label={`Delete ingredient ${index + 1}`}
            >
              X
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addIngredient} style={{ marginBottom: '15px' }}>
        Add Ingredient
      </button>

      <button type="submit">{initialData ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
  );
};

export default RecipeForm;