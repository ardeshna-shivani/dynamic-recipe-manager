import React, { useState } from 'react';

const RecipeDetailsModal = (props) => {
  // const [showRating,setShowRating] = useState(false);
  // const [rating, setRating] = useState(0);

  if (!props?.recipe) return null;

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  };

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button style={closeButtonStyle} onClick={props?.onClose}>X</button>
        <h2>{props.recipe.name}</h2>
        <div style={{ marginTop: '10px' }}>
          <button
            // onClick={handleRateClick}
              style={{padding: '8px 16px',backgroundColor: '#ed2929ff',color: '#fff',border: 'none',borderRadius: '4px',
              cursor: 'pointer',}}>
            Rate Recipe
          </button>
        </div>
        <p><strong>Cuisine:</strong> {props.recipe.cuisine}</p>
        <p><strong>Difficulty Level:</strong> {props.recipe.difficulty}</p>
        <p><strong>Time:</strong> {props.recipe.time} hour</p>
        <p><strong>Instructions: </strong>{props.recipe.instructions}</p>
        {/* Ingredients can be displayed here if needed */}
        <p>Ingredients:</p>
        <ul>
          {props?.recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;