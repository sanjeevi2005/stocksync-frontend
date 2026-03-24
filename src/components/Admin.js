import React, { useState, useEffect } from 'react';

function Admin({ products, loadProducts }) {
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Product States
  const [newStockName, setNewStockName] = useState('');
  const [newStockPrice, setNewStockPrice] = useState('');
  const [newStockQuantity, setNewStockQuantity] = useState('');

  // Fetch Users & Orders when those tabs are clicked
  useEffect(() => {
    if (activeTab === 'users') {
      fetch('https://stocksync-api.onrender.com/api/admin/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error("Failed to load users", err));
    } else if (activeTab === 'orders') {
      fetch('https://stocksync-api.onrender.com/api/admin/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Failed to load orders", err));
    }
  }, [activeTab]);

  // --- PRODUCT FUNCTIONS ---
  const handleAddStock = async (e) => {
    e.preventDefault();
    await fetch('https://stocksync-api.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newStockName, 
        price: parseFloat(newStockPrice),
        stock: parseInt(newStockQuantity) 
      })
    });
    setNewStockName(''); setNewStockPrice(''); setNewStockQuantity('');
    loadProducts(); 
  };

  const handleDeleteStock = async (id) => {
    await fetch(`https://stocksync-api.onrender.com/api/products/${id}`, { method: 'DELETE' });
    loadProducts(); 
  };

  return (
    <div className="card admin-panel">
      <h2>System Administration</h2>
      
      {/* --- TAB NAVIGATION --- */}
      <div className="flex-row" style={{ marginBottom: '20px', borderBottom: '2px solid #ffe0b2', paddingBottom: '10px' }}>
        <button 
          className={activeTab === 'products' ? '' : 'secondary'} 
          onClick={() => setActiveTab('products')}
        >Manage Inventory</button>
        <button 
          className={activeTab === 'users' ? '' : 'secondary'} 
          onClick={() => setActiveTab('users')}
        >View Users</button>
        <button 
          className={activeTab === 'orders' ? '' : 'secondary'} 
          onClick={() => setActiveTab('orders')}
        >View All Orders</button>
      </div>

      {/* --- TAB 1: PRODUCTS --- */}
      {activeTab === 'products' && (
        <div>
          <form onSubmit={handleAddStock} className="flex-row">
            <input placeholder="Product Name" value={newStockName} onChange={e => setNewStockName(e.target.value)} required />
            <input type="number" step="0.01" placeholder="Price" value={newStockPrice} onChange={e => setNewStockPrice(e.target.value)} required />
            <input type="number" placeholder="Qty" value={newStockQuantity} onChange={e => setNewStockQuantity(e.target.value)} required style={{width: '100px'}} />
            <button type="submit">Add Stock</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Price</th><th>In Stock</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.name}</td><td>${p.price.toFixed(2)}</td><td>{p.stock}</td>
                  <td><button className="danger" onClick={() => handleDeleteStock(p.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAB 2: USERS --- */}
      {activeTab === 'users' && (
        <div>
          <h3>Registered Users ({users.length})</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th><th>Username</th><th>Role Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td style={{ fontWeight: 'bold' }}>{u.username}</td>
                  <td>{u.username === 'admin' ? 'Administrator' : 'Customer'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAB 3: ORDERS --- */}
      {activeTab === 'orders' && (
        <div>
          <h3>Platform Order History</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th><th>Customer</th><th>Total</th><th>Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td style={{ fontWeight: 'bold', color: '#4f46e5' }}>{o.username}</td>
                  <td style={{ fontWeight: 'bold' }}>${o.total.toFixed(2)}</td>
                  <td style={{ color: '#64748b' }}>{o.billing_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;