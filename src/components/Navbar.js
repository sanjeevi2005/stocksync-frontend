import React from 'react';

function Navbar({ user, setUser, setCart, setView, view }) {
  if (!user) return null;

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setView('login');
  };

  return (
    <div className="header-bar card" style={{ padding: '15px 30px', marginBottom: '20px' }}>
      <h3>Welcome, {user.username}</h3>
      <div>
        {user.username === 'admin' && view !== 'admin' && (
           <button className="secondary" onClick={() => setView('admin')} style={{ marginRight: '10px' }}>Admin Dashboard</button>
        )}
        {view !== 'shop' && (
           <button className="secondary" onClick={() => setView('shop')} style={{ marginRight: '10px' }}>Shop</button>
        )}
        {view !== 'orders' && (
           <button className="secondary" onClick={() => setView('orders')} style={{ marginRight: '10px' }}>My Orders</button>
        )}
        <button className="danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
export default Navbar;