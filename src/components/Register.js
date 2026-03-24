import React, { useState } from 'react';

function Register({ setView }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://stocksync-api.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        alert('Registered! You can now log in.');
        setView('login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert("Server connection failed.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={{ width: '100%' }}>Register</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#3498db' }} onClick={() => setView('login')}>
        Have an account? Login here.
      </p>
    </div>
  );
}
export default Register;