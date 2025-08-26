// import React, { createContext, useState, useEffect } from "react";

//  const AuthContext = createContext();//create context

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load user from localStorage 
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     if (savedUser && token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         if (payload.exp * 1000 < Date.now()) {
//           logoutUser();
//         } else {
//           setUser(savedUser);
//         }
//       } catch {
//         logoutUser();
//       }
//     }

//     setLoading(false);
//   }, []);

//   // const loginUser = (email, password) => {
//   //   const users = JSON.parse(localStorage.getItem("users")) || [];
//   //   console.log("users:",users);//[{}]
//   //   //JSON.parse - string na js obj ma convert, localStorage.getItem("users") - 
//   //   // localstorage -> "users" name ne key ma rahela data lave , localstorage ma badhu string ma store thay.
//   //   const foundUser = users.find(u => u.email === email && u.password === password);
//   //   console.log("found user: ",foundUser);//user obj
    
//   //   if (foundUser) {
//   //     setUser(foundUser);
//   //     localStorage.setItem("user", JSON.stringify(foundUser));//JSON.stringify - obj to convert string because localstorage store data.
//   //     return true;
//   //   }
//   //   return false;
//   // };

//   const loginUser = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) return false;

//       const data = await response.json();
//       setUser(data.user);
//       localStorage.setItem("user", JSON.stringify(data.user));
//        localStorage.setItem("token", data.token); 
//       return true;
//     } catch (error) {
//       console.error("Login error:", error);
//       return false;
//     }
//   };

//   // const signupUser = (email, password,name) => {
//   //   // console.log("Signup initiated with:", email, password, name);
//   //   const users = JSON.parse(localStorage.getItem("users")) || [];//[{}]
//   //   //  console.log(" Existing users from localStorage:", users);//{}
//   //   if (users.find(u => u.email === email)) {//userslist ma pela thi koi user hase jena email match thay to ta user pela thi register hase
//   //     // console.log("User already exists with this email:", email);
//   //     return false;
//   //   } // userlist ma check kare k same email register cha to false
//   //   const newUser = { email, password,name };//{}
//   //   // console.log("Creating new user:", newUser);
//   //   users.push(newUser);//userlist array [{}]
//   //   // console.log("Updated users array:", users);
//   //   localStorage.setItem("users", JSON.stringify(users));//whole user array to convert string and store localstorage "users"
//   //   // console.log("Stored updated users in localStorage");{}
//   //   setUser(newUser);//new user login user set {}
//   //   // console.log("Set current user state:", newUser);
//   //   localStorage.setItem("user", JSON.stringify(newUser));//new user "user" key sathe store {}
//   //  //console.log("Saved current user in localStorage");
//   //   // console.log("Signup successful!");
//   //   return true;
//   // };


//   const signupUser = async (email, password, name) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, name }),
//       });

//       if (!response.ok) return false;

//       const data = await response.json();
//       setUser(data.user);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("token", data.token);
//       return true;
//     } catch (error) {
//       console.error("Signup error:", error);
//       return false;
//     }
//   };

//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     fetch("http://localhost:5000/api/logout", {
//     method: "POST",
//   }).catch((err) => console.error("Logout request failed:", err));
//   };

//   const getCurrentUser = () => user;//login user no {}
//   // console.log("getCurrentUser: ",getCurrentUser());
  
//   return (
//     <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser, getCurrentUser,loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext };



import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  const scheduleAutoLogout = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));//atob-base 64 to convert normal json
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeout = expiryTime - currentTime;

      if (timeout > 0) {
        setTimeout(() => {
          logoutUser();
        }, timeout);
      }
    } catch (error) {
      console.error("Failed to schedule auto logout:", error);
    }
  };
  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode token to get payload
        if (payload.exp * 1000 < Date.now()) {
          logoutUser(); // Log out user if token expired
          navigate("/login"); // Redirect to login page
        } else {
          setUser(savedUser); // Set the user if the token is valid
          scheduleAutoLogout(token);
        }
      } catch {
        logoutUser(); // Log out user if token is invalid
        navigate("/login"); // Redirect to login page
      }
    } else {
      setLoading(false); // If no user or token, set loading to false
    }

    setLoading(false); // Done with loading state
  }, [navigate]); // Adding `navigate` as a dependency to ensure it is used correctly

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      scheduleAutoLogout(data.token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signupUser = async (email, password, name) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      scheduleAutoLogout(data.token);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    fetch(`${process.env.REACT_APP_API}/logout`, { method: "POST" }).catch((err) =>
      console.error("Logout request failed:", err)
    );
    navigate("/login"); // Redirect to login page after logout
  };

  const getCurrentUser = () => user;

  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser, getCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};