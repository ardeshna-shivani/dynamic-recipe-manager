import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../utils/Auth';

const SignupPage = () => {
  const { signupUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const success = signupUser(email.toLowerCase(), password,name);
    if (success) {
      alert('Signup successful!');
      navigate('/'); 
    } else {
      alert('User already exists.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>Name</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignupPage;