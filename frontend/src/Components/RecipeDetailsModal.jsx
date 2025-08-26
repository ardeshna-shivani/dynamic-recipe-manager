// import React, { useEffect, useState, useContext } from 'react';
// import { Rating } from 'react-simple-star-rating';
// import { AuthContext } from '../utils/Auth';

// const RecipeDetailsModal = (props) => {
//   const { user } = useContext(AuthContext);
//   const [showRating, setShowRating] = useState(false);//show star mate
//   const [tempRating, setTempRating] = useState(0);
//   const [originalRating, setOriginalRating] = useState(0);
//   const [saveMessage, setSaveMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//[{}]
//   //   const currentRecipe = storedRecipes.find(r => r.id === props.recipe.id);//{selected recipe no obj} //match by id
//   //   // console.log("currentRecipe",currentRecipe);

//   //   if (currentRecipe && Array.isArray(currentRecipe.ratings)) {//rating array 
//   //     const userRatingObj = currentRecipe.ratings.find(r => r.userEmail === user?.email);//useremail per thi currentRecipe rating find
//   //     console.log("userRatingObj (matched by email):", userRatingObj); //{userEmail: 'test1@gmail.com', rating: 4}

//   //     const ratingToSet = userRatingObj ? userRatingObj.rating : 0
//   //     setTempRating(ratingToSet);
//   //     console.log("ratingToSet",ratingToSet);//4

//   //   } else {
//   //     setTempRating(0);
//   //   }

//   //   setShowRating(false);
//   //   console.log("Rating UI hidden (setShowRating = false)");
//   // }, [props.recipe, user?.email]);


//     const fetchUserRating = async () => {
//       if(!props?.recipe || !user?.email) return
//       try{
//         const response = await fetch(`http://localhost:5000/api/recipes/${props.recipe._id}`)
//         const data = await response.json();
//         const userRatingObj = data.rating?.find(r => r.userEmail === user.email);
//         const ratingValue = userRatingObj ? userRatingObj.rating : 0;
//         setTempRating(ratingValue);
//         setOriginalRating(ratingValue);
//         setShowRating(false);
//       }
//       catch(err){
//         console.log("Error fetching recipe rating: ",err);
//         setTempRating(0);
//         setOriginalRating(0);

//       }
//     } 

//     useEffect(() => {
//       fetchUserRating();
//     },[props?.recipe,user?.email])

//   if (!props.recipe) return null;

//   const handleRatingChange = (rate) => {
//     setTempRating(rate);//user new rating per click kare tyare temprating change
//   };

//   // const handleSave = () => {
//   //   const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];//[{}]

//   //   const updatedRecipes = storedRecipes.map(r => {
//   //     if (r.id === props.recipe.id) {
//   //       const existingRatings = Array.isArray(r.ratings) ? r.ratings : [];
//   //       //Array.isArray(r.ratings) - r.ratings aa ak array cha k nahi
//   //       // console.log("existingRatings",existingRatings);//[{useremail,rating}]
//   //       // Remove old rating by current user (if any)
//   //       const filteredRatings = existingRatings.filter(rating => rating.userEmail !== user?.email);
//   //       // console.log("filteredRatings",filteredRatings);//[{useremail,rating}]
//   //       //juna rating mathi current user rating remove(old rating remove)

//   //       // Add new/updated rating
//   //       const newRating = { userEmail: user?.email, rating: tempRating };
//   //       // console.log("newRating",newRating);//{userEmail: 'test@gmail.com', rating: 5}
//   //       const updatedRating = { ...r, ratings: [...filteredRatings, newRating] }
//   //       // console.log("filteredRatings",[...filteredRatings, newRating]);
//   //       // console.log("newRating",newRating);


//   //       console.log("updatedRating",updatedRating);//{recipe}

//   //       return updatedRating;
//   //     }
//   //     return r;
//   //   });

//   //   localStorage.setItem('recipes', JSON.stringify(updatedRecipes));//[{}]
//   //   setShowRating(false);
//   //   if (props?.onRatingUpdate) props?.onRatingUpdate();
//   // };


//   const handleSave = async () => {
//   try {
//     setLoading(true)
//     const response = await fetch(`http://localhost:5000/api/recipes/${props.recipe._id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({userEmail: user?.email,rating: tempRating}),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update rating");
//     }
//     setOriginalRating(tempRating);
//     setShowRating(false);
//     setSaveMessage("Rating Saved!");
//     if (props?.onRatingUpdate) props.onRatingUpdate(); // re-fetch list
//   } catch (error) {
//     console.error("Error saving rating:", error);
//   }
//   finally{
//     setLoading(false);
//   }
// };

//   const rateButtonLabel = tempRating === originalRating > 0 ? "Edit Recipe Rating" : "Add Recipe Rating";
//   //temprating 0 karta vadhare hoi to edit show otherwise add
//   console.log("tempRating Rating:", tempRating);
//   console.log("Rate Button Label:", rateButtonLabel);
//   return (
//     <div style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "rgba(0,0,0,0.6)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//     }}>
//       <div style={{
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "8px",
//         width: "90%",
//         maxWidth: "500px",
//         maxHeight: "80vh",
//         overflowY: "auto",
//         position: "relative",
//       }}>
//         <button style={{
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           padding: "5px 10px",
//           cursor: "pointer",
//         }} onClick={props?.onClose}>X</button>

//         <h2>{props.recipe.name}</h2>

//         <button
//           onClick={() => setShowRating(true)}
//           style={{
//             marginTop: '10px',
//             padding: '8px 16px',
//             backgroundColor: '#ed2929ff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}>
//           {rateButtonLabel}
//         </button>

//         {showRating ? (
//           <div style={{ marginTop: '10px' }}>
//             <Rating
//               onClick={handleRatingChange}
//               size={30}
//               initialValue={tempRating}
//               allowHover
//               allowFraction={false}
//               transition
//               fillColor="#FFD700"
//               emptyColor="#fff"
//               SVGstyle={{ stroke: 'black', strokeWidth: 2, margin: 2 }}
//             />
//             <button
//               onClick={handleSave}
//               style={{
//                 marginTop: '10px',
//                 padding: '8px 16px',
//                 backgroundColor: '#28a745',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}>

//             </button>
//             {saveMessage && (
//               <p style={{ color: 'green', marginTop: '8px' }}>{saveMessage}</p>
//             )}
//           </div>
//         ) : (
//           tempRating > 0 && (
//             <div style={{ marginTop: '10px' }}>
//               <p><strong>Your Rating:</strong></p>
//               <Rating
//                 readonly
//                 size={25}
//                 initialValue={tempRating}
//                 fillColor="#FFD700"
//                 emptyColor="#fff"
//                 SVGstyle={{ stroke: 'black', strokeWidth: 2, margin: 2 }}
//               />
//             </div>
//           )
//         )}

//         <p><strong>Cuisine:</strong> {props.recipe.cuisine}</p>
//         <p><strong>Difficulty Level:</strong> {props.recipe.difficulty}</p>
//         <p><strong>Time:</strong> {props.recipe.time} hour</p>
//         <p><strong>Instructions:</strong> {props.recipe.instructions}</p>

//         <p><strong>Ingredients:</strong></p>
//         <ul>
//           {props.recipe.ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetailsModal;

//user have already rate recipe
//than second time rate tempRating 0
//i have tempRating current user rate show 



import React, { useEffect, useState, useContext } from 'react';
import { Rating } from 'react-simple-star-rating';
import { AuthContext } from '../utils/Auth';

const RecipeDetailsModal = (props) => {
  const { user } = useContext(AuthContext);

  const [showRating, setShowRating] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [originalRating, setOriginalRating] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ratingLoaded, setRatingLoaded] = useState(false);

  useEffect(() => {
  if (!props?.recipe || !user?.email) {
    // Modal closed or no user: reset states
    setTempRating(0);
    setOriginalRating(0);
    setShowRating(false);
    setRatingLoaded(false);
    setSaveMessage('');
    return;
  }

  // Modal opened - fetch user rating fresh
  const fetchUserRating = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${props.recipe._id}`);
      const data = await res.json();
      console.log('Fetched recipe ratings:', data.recipe.rating);
      const userRatingObj = data.recipe.rating?.find(r => r.userEmail === user.email);
      const value = userRatingObj ? userRatingObj.rating : 0;

      setTempRating(value);
      setOriginalRating(value);
      setSaveMessage('');
    } catch (err) {
      console.error('Error fetching user rating:', err);
      setTempRating(0);
      setOriginalRating(0);
    } finally {
      setRatingLoaded(true);
      setShowRating(false);
    }
  };

  fetchUserRating();
}, [props?.recipe, user?.email]);

  const handleRatingChange = (rate) => {
    setTempRating(rate);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${props.recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.email,
          rating: tempRating,
        }),
      });

      if (!response.ok) throw new Error('Failed to save rating');

      setOriginalRating(tempRating);
      setShowRating(false);
      setSaveMessage('Rating Saved!');
      if (props?.onRatingUpdate) props.onRatingUpdate();
    } catch (error) {
      console.error('Error saving rating:', error);
      setSaveMessage('Failed to save rating.');
    } finally {
      setLoading(false);
    }
  };


  const rateButtonLabel = ratingLoaded
    ? originalRating > 0
      ? 'Edit Recipe Rating'
      : 'Add Recipe Rating'
    : 'Loading...';


  useEffect(() => {
    if (ratingLoaded) {
      console.log("=== Rating Debug Info ===");
      console.log("originalRating:", originalRating);
      console.log("tempRating:", tempRating);
      console.log("rateButtonLabel:", rateButtonLabel);
      console.log("Condition:", originalRating > 0 ? "Editing existing rating" : "Adding new rating");
      console.log("=========================");
    }
  }, [ratingLoaded, originalRating, tempRating]);

  if (!props?.recipe) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflowY: "auto",
        position: "relative",
      }}>
        <button style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
        }} onClick={props?.onClose}>X</button>

        <h2>{props?.recipe.name}</h2>

        {ratingLoaded && (
          <button
            onClick={() => setShowRating(true)}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#ed2929ff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
            {rateButtonLabel}
          </button>
        )}

        {showRating ? (
          <div style={{ marginTop: '10px' }}>
            <Rating
              onClick={handleRatingChange}
              size={30}
              initialValue={tempRating}
              allowHover
              allowFraction={false}
              transition
              fillColor="#FFD700"
              emptyColor="#fff"
              SVGstyle={{ stroke: 'black', strokeWidth: 2, margin: 2 }}
            />
            <button
              onClick={handleSave}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
              {loading ? 'Saving...' : 'Save Rating'}
            </button>
          </div>
        ) : (
          ratingLoaded && tempRating > 0 && (
            <div style={{ marginTop: '10px' }}>
              <p><strong>Your Rating:</strong></p>
              <Rating
                readonly
                size={25}
                initialValue={tempRating}
                fillColor="#FFD700"
                emptyColor="#fff"
                SVGstyle={{ stroke: 'black', strokeWidth: 2, margin: 2 }}
              />
            </div>
          )
        )}

        <p><strong>Cuisine:</strong> {props?.recipe.cuisine}</p>
        <p><strong>Difficulty Level:</strong> {props?.recipe.difficulty}</p>
        <p><strong>Time:</strong> {props?.recipe.time} hour</p>
        <p><strong>Instructions:</strong> {props?.recipe.instructions}</p>

        <p><strong>Ingredients:</strong></p>
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


