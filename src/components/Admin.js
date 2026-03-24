import React, { useState } from 'react';

function Admin({ products, loadProducts }) {
  const [newStockName, setNewStockName] = useState('');
  const [newStockPrice, setNewStockPrice] = useState('');
  const [newStockQuantity, setNewStockQuantity] = useState(''); // NEW STATE

  const handleAddStock = async (e) => {
    e.preventDefault();
    await fetch('https://stocksync-api.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newStockName, 
        price: parseFloat(newStockPrice),
        stock: parseInt(newStockQuantity) // SENDING TO BACKEND
      })
    });
    setNewStockName('');
    setNewStockPrice('');
    setNewStockQuantity('');
    loadProducts(); 
  };

  const handleDeleteStock = async (id) => {
    await fetch(`https://stocksync-api.onrender.com/api/products/${id}`, { method: 'DELETE' });
    loadProducts(); 
  };

  return (
    <div className="card admin-panel">
      <h2>Inventory Management</h2>
      <form onSubmit={handleAddStock} className="flex-row">
        <input placeholder="Product Name" value={newStockName} onChange={e => setNewStockName(e.target.value)} required />
        <input type="number" step="0.01" placeholder="Price" value={newStockPrice} onChange={e => setNewStockPrice(e.target.value)} required />
        <input type="number" placeholder="Qty" value={newStockQuantity} onChange={e => setNewStockQuantity(e.target.value)} required style={{width: '100px'}} />
        <button type="submit">Add Stock</button>
      </form>

      <h3>Current Stocks</h3>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>In Stock</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{p.id}</td>
              <td style={{ padding: '10px' }}>{p.name}</td>
              <td style={{ padding: '10px' }}>${p.price.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>{p.stock}</td>
              <td style={{ padding: '10px' }}>
                <button className="danger" onClick={() => handleDeleteStock(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;