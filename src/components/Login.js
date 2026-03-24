import React, { useState } from 'react';

function Login({ setUser, setView }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        setView('shop');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert("Server connection failed.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>System Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={{ width: '100%' }}>Login</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#3498db' }} onClick={() => setView('register')}>
        Need an account? Register here.
      </p>
    </div>
  );
}
export default Login;