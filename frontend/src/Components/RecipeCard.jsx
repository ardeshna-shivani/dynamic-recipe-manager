// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../utils/Auth';

// const RecipeCard = (props) => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [avgRating, setAvgRating] = useState(0);

//   useEffect(() => {
//     const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//[{}]
//     const currentRecipeName = props.recipe.name.trim().toLowerCase();//recipe name
//     // console.log("currentRecipeName",currentRecipeName);
//     const allRatings = storedRecipes
//       .filter(r => r.name.trim().toLowerCase() === currentRecipeName && Array.isArray(r.ratings))
//       .flatMap(r => r.ratings);
//     // console.log("allRatings",allRatings);//[ {userEmail, rating}, {userEmail, rating}, ... ]
//     //all stored recipe mathi only choose recipe k jenu name currentRecipeName sathe exact match kare and rating
//     //cha aa pn array hovi joy .flatmap() recipe ander all rating ak motu array banave da.

//     const validRatings = allRatings
//       .map(r => r.rating)
//       .filter(r => typeof r === 'number' && r > 0);
//     // console.log("validRatings",validRatings);//[rating number array] -> [4,4,4]
    
//     if (validRatings.length > 0) {
//       const sum = validRatings.reduce((acc, val) => acc + val, 0);
//       const avg = sum / validRatings.length;
//       setAvgRating(avg);
//       // console.log("avg",avg);//number
      
//     } else {
//       setAvgRating(0);
//     }
//   }, [props.recipe]);

//   const isUserOwner = user && user.email === props.recipe.userEmail;

//   const onEdit = () => {
//     // Navigate to the addRecipe page with the current recipe data
//     navigate(`/editRecipe/${props.recipe.id}`);
//   };

//   const onDelete = () => {
//      // Remove the recipe from localStorage
//     const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//store recipe//[{}]
//     const updatedRecipes = storedRecipes.filter(recipe => recipe.id !== props.recipe.id);//{}
//     //stored recipe ma id cha aa props.recipe.id jevi na hoi to reva devane 
//     // Update the localStorage with the new filtered list
//     localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
//     // Call the parent's onDelete function to update the state
//     if (props.onDelete) {
//       props.onDelete(props.recipe.id); // Pass the ID of the recipe to delete
//     }
//   };

//   return (
//     <div
//       onClick={props.onClick}
//       style={{
//         border: '1px solid #ddd',
//         padding: 16,
//         borderRadius: 8,
//         backgroundColor: '#fff',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         cursor: 'pointer',
//         transition: 'box-shadow 0.3s',
//       }}
//     >
//       <div>
//         <h3>{props.recipe.name}</h3>
//         <p><b>Cuisine:</b> {props.recipe.cuisine}</p>
//         <p><b>Cooking Time:</b> {props.recipe.time}</p>
//         <p><b>Rating:</b> {avgRating.toFixed(1)} / 5</p>
//       </div>

//       {isUserOwner && (
//         <div
//           onClick={e => e.stopPropagation()}
//           style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}
//         >
//           <button onClick={onEdit} style={{ backgroundColor: '#f0ad4e' }}>Edit</button>
//           <button onClick={onDelete} style={{ backgroundColor: '#d9534f' }}>Delete</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeCard;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Auth';

const RecipeCard = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const ratings = Array.isArray(props.recipe.rating) ? props.recipe.rating : [];//props.recipe.ratings aa array cha k nahi 

    const validRatings = ratings
      .map(r => r.rating)// Result: [4, 0, 4, "bad", 4]
      .filter(r => typeof r === 'number' && r > 0);
      //typeof check => only numbers: [4, 0, 4, 4]
      //r > 0 => only positive: [4, 4, 4]

    if (validRatings.length > 0) {
      const sum = validRatings.reduce((acc, val) => acc + val, 0);
      //validRatings = [4, 5, 3];
      // acc = 0 → 0 + 4 = 4
// acc = 4 → 4 + 5 = 9
// acc = 9 → 9 + 3 = 12
// sum = 12
      const avg = sum / validRatings.length;// avg = 12/3 = 4
      setAvgRating(avg);//4
    } else {
      setAvgRating(0);
    }
  }, [props.recipe]);

  const isUserOwner = user && user.email === props.recipe.userEmail;

  const onEdit = (e) => {
    e.stopPropagation();
    navigate(`/editRecipe/${props.recipe._id}`);
  };

  const onDelete = async (e) => {
    e.stopPropagation();

    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${props.recipe._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete recipe');
      }

      if (props.onDelete) {
        props.onDelete(props.recipe._id); //onDelete call parent component
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div
      onClick={props.onClick}
      style={{
        border: '1px solid #ddd',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
      }}
    >
      <div>
        <h3>{props.recipe.name}</h3>
        <p><b>Cuisine:</b> {props.recipe.cuisine}</p>
        <p><b>Cooking Time:</b> {props.recipe.time}</p>
        <p><b>Rating:</b> {avgRating.toFixed(1)} / 5</p>
      </div>

      {isUserOwner && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}
        >
          <button onClick={onEdit} style={{ backgroundColor: '#f0ad4e' }}>Edit</button>
          <button onClick={onDelete} style={{ backgroundColor: '#d9534f' }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;