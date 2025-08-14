import React, { createContext, useState, useEffect } from "react";

 const AuthContext = createContext();//create context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage 
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    console.log("savedUser:",savedUser);//user obj
    
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);//app open login user show thay.
  }, []);

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("users:",users);//[{}]
    //JSON.parse - string na js obj ma convert, localStorage.getItem("users") - 
    // localstorage -> "users" name ne key ma rahela data lave , localstorage ma badhu string ma store thay.
    const foundUser = users.find(u => u.email === email && u.password === password);
    console.log("found user: ",foundUser);//user obj
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));//JSON.stringify - obj to convert string because localstorage store data.
      return true;
    }
    return false;
  };

  const signupUser = (email, password,name) => {
    // console.log("Signup initiated with:", email, password, name);
    const users = JSON.parse(localStorage.getItem("users")) || [];//[{}]
    //  console.log(" Existing users from localStorage:", users);//{}
    if (users.find(u => u.email === email)) {//userslist ma pela thi koi user hase jena email match thay to ta user pela thi register hase
      // console.log("User already exists with this email:", email);
      return false;
    } // userlist ma check kare k same email register cha to false
    const newUser = { email, password,name };//{}
    // console.log("Creating new user:", newUser);
    users.push(newUser);//userlist array [{}]
    // console.log("Updated users array:", users);
    localStorage.setItem("users", JSON.stringify(users));//whole user array to convert string and store localstorage "users"
    // console.log("Stored updated users in localStorage");{}
    setUser(newUser);//new user login user set {}
    // console.log("Set current user state:", newUser);
    localStorage.setItem("user", JSON.stringify(newUser));//new user "user" key sathe store {}
   //console.log("Saved current user in localStorage");
    // console.log("Signup successful!");
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => user;//login user no {}
  // console.log("getCurrentUser: ",getCurrentUser());
  
  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser, getCurrentUser,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
