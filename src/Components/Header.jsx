import React, { useContext } from "react";
import logoImage from "../assets/logo.png";
import { AuthContext } from "../utils/Auth";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
  logoutUser(); // update context
  setTimeout(() => {
    navigate("/login"); // navigate after state update
  }, 0); // delay to avoid React sync rendering issues
};

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#0077ff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {/* Logo & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => navigate('/')}>
        <img src={logoImage} alt="Logo" style={{ width: 40, height: 40 }} />
        <span style={{ fontWeight: "bold", fontSize: "20px", color: "#fff" }}>
          Recipe Manager
        </span>
      </div>

      {/* Search & Filters */}
      <div
        style={{
          flexGrow: 1,
          maxWidth: 800,
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flexGrow: 29 }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={props?.searchTerm || ""}
            onChange={(e) => props?.setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 40px 10px 15px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />
          <svg
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 20,
              fill: "#999",
            }}
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.292 14.292l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </div>

        <select onChange={(e) => props?.setCuisineFilter(e.target.value)} value={props?.cuisineFilter}>
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Asian">Asian</option>
            </select>

            <select onChange={(e) => props?.setDifficultyFilter(e.target.value)} value={props?.difficultyFilter}>
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

        <select
          value={props?.sortOption || ""}  // Default to empty string
          onChange={(e) => props?.setSortOption(e.target.value)}
          style={selectStyle}
        >
          <option value="">Sort By</option>
          <option value="time">Cooking Time</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      {/* User Info */}
      <div style={{ fontSize: 16, color: "#fff" }}>
        {user ? (
          <>
            <span style={{ marginRight: 15 }}>
              Hello, {user.name}
            </span>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              style={{ marginRight: 15, textDecoration: "none", color: "#cce4ff" }}
            >
              Login
            </a>
            <a href="/signup" style={{ textDecoration: "none", color: "#cce4ff" }}>
              Register
            </a>
          </>
        )}
      </div>
    </header>
  );
};

const selectStyle = {
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
};

const logoutButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid #fff",
  borderRadius: "5px",
  padding: "5px 10px",
  color: "#fff",
  cursor: "pointer",
};

export default Header;