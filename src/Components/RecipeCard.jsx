import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Auth';

const RecipeCard = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState('');

  //login user show edit and delete btn
//   console.log("recipe",props?.recipe); recipe obj
  const isUserOwner = user && user.email === props?.recipe.userEmail; 
//   console.log("userEmail: ",user.email);
//   console.log("recipe email: ",props?.recipe.userEmail);
//   console.log("isUserOwner",user.email === props?.recipe.userEmail);

  const onEdit = () => {
    // Navigate to the addRecipe page with the current recipe data
    navigate(`/editRecipe/${props.recipe.id}`);
    // console.log("recipe id: ",props.recipe.id);
    
  };

  const onDelete = () => {
    // Remove the recipe from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//store recipe//[{}]
    const updatedRecipes = storedRecipes.filter(recipe => recipe.id !== props.recipe.id);//{}
    //stored recipe ma id cha aa props.recipe.id jevi na hoi to reva devane 
    // Update the localStorage with the new filtered list
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // Call the parent's onDelete function to update the state
    if (props.onDelete) {
      props.onDelete(props.recipe.id); // Pass the ID of the recipe to delete
    }
  };

  return (
    <div
      onClick={props?.onClick}
      style={{
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
      }}
    >
      <div>
        <h3>{props?.recipe.name}</h3>
        <p><b>Cuisine:</b> {props?.recipe.cuisine}</p>
        <p><b>Cooking Time:</b> {props?.recipe.time}</p>
        <p><b>Rating: </b></p>
      </div>

      {/* Show buttons if the user owns the recipe */}
      {isUserOwner && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <button onClick={onEdit} style={{ backgroundColor: '#f0ad4e' }}>Edit</button>
          <button onClick={onDelete} style={{ backgroundColor: '#d9534f' }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;