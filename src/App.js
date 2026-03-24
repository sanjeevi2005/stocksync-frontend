import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop';
import Admin from './components/Admin';
import Billing from './components/Billing';
import Orders from './components/Orders';

function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products.");
    }
  };

  useEffect(() => {
    if (view === 'shop' || view === 'admin') {
      loadProducts();
    }
  }, [view]);

  return (
    <div className="container">
      <Navbar user={user} setUser={setUser} setCart={setCart} setView={setView} view={view} />

      {view === 'login' && <Login setUser={setUser} setView={setView} />}
      {view === 'register' && <Register setView={setView} />}
      {user && view === 'orders' && <Orders user={user} />}
      {user && view === 'shop' && <Shop products={products} cart={cart} setCart={setCart} setView={setView} />}
      {user && view === 'admin' && user.username === 'admin' && <Admin products={products} loadProducts={loadProducts} />}
      {user && view === 'billing' && <Billing user={user} cart={cart} setCart={setCart} setView={setView} />}
    </div>
  );
}

export default App;