import React, { useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { AuthProvider, AuthContext } from './utils/Auth';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import RecipeForm from './Components/RecipeForm';



function App() {
  const { user,loading  } = useContext(AuthContext); // Get the user state from AuthContext

  // State variables for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  

  // State to hold the fetched recipe data
  const [allRecipes, setAllRecipes] = useState([]);

  // Update localStorage whenever recipes change
  useEffect(() => {
    if (allRecipes.length > 0) {//recipe cha to j
      localStorage.setItem("recipes", JSON.stringify(allRecipes));
    }
  }, [allRecipes]);//allRecipe change thay tyare run

  if (loading) return <div>Loading...</div>;

  // Deriving unique cuisines and difficulties using useMemo for optimization
  const uniqueCuisines = [...new Set(allRecipes.map((r) => r.cuisine))];
  //allRecipes = [{ id: 1, name: "Pizza", cuisine: "Italian" },{ id: 2, name: "Tacos", cuisine: "Mexican" },{ id: 3, name: "Pasta", cuisine: "Italian" }]
// → allRecipes.map(...) → ["Italian", "Mexican", "Italian"]
// new Set(["Italian", "Mexican", "Italian"]) → Set {"Italian", "Mexican"} //normal array ma convert mate.
  const uniqueDifficulties = [...new Set(allRecipes.map((r) => r.difficulty))];

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cuisineFilter={cuisineFilter}
        setCuisineFilter={setCuisineFilter}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        uniqueCuisines={uniqueCuisines}
        uniqueDifficulties={uniqueDifficulties}
      />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          {/* Home Page: Accessible by everyone */}
          <Route
            path="/"
            element={<HomePage
              searchTerm={searchTerm}
              cuisineFilter={cuisineFilter}
              difficultyFilter={difficultyFilter}
              sortOption={sortOption}
            />}
          />

          {/* Login & Signup routes only if the user is not logged in */}
          {!user && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}

          {/* If user is logged in, redirect them to home */}
          {user && <Route path="/login" element={<Navigate to="/" />} />}
          {user && <Route path="/signup" element={<Navigate to="/" />} />}

          {/* Protected Add Recipe Page */}
          <Route
            path="/addRecipe"
            element={user ? <RecipeForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/editRecipe/:id"
            element={user ? <RecipeForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;