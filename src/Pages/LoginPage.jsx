import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Auth'; // Adjust the path if needed

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  console.log("");
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(email, password);
    //console.log("success: ",loginUser(email, password));//true
    
    if (success) {
      alert('Login successful!');
      navigate('/'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password"
          placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <p>
          Not registered? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;