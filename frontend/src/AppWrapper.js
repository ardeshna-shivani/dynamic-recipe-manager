import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Correctly import and use Router
import { AuthProvider } from "./utils/Auth"; // Import AuthProvider
import App from "./App"; // Import the main App component

function AppWrapper() {
  return (
    <Router> {/* Wrap the whole app with Router here */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;