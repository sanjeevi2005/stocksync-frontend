import React, { useState } from 'react';

function Billing({ user, cart, setCart, setView }) {
  const [address, setAddress] = useState('');
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // --- NEW: Group identical items together ---
  const groupedCart = [];
  cart.forEach(item => {
    const existingItem = groupedCart.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.qty += 1;
      existingItem.subtotal += item.price;
    } else {
      groupedCart.push({ ...item, qty: 1, subtotal: item.price });
    }
  });

  const handleRemoveOne = (productId) => {
    // Find the first instance of this product and remove it
    const indexToRemove = cart.findIndex(item => item.id === productId);
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);
      
      if (updatedCart.length === 0) {
        alert("Your cart is empty. Returning to shop.");
        setView('shop');
      }
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://stocksync-api.onrender.com/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, total: cartTotal, address, cartItems: cart }) 
      });
      const data = await res.json();
      if (data.success) {
        alert(`Order placed! Order ID: ${data.orderId}`);
        setCart([]);
        setView('orders'); // Send them to their order history after buying!
      }
    } catch (err) {
      alert("Checkout failed.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Checkout</h2>

      <div style={{ marginBottom: '20px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 0' }}>
        <h3 style={{ marginBottom: '15px' }}>Order Summary</h3>
        
        {/* --- Loop through the GROUPED cart instead of the flat cart --- */}
        {groupedCart.map((item) => (
          <div key={item.id} className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span>
              <strong>{item.name}</strong> (Qty: {item.qty}) 
              <span style={{ color: '#7f8c8d', marginLeft: '10px' }}>${item.subtotal.toFixed(2)}</span>
            </span>
            <button 
              className="danger" 
              onClick={() => handleRemoveOne(item.id)}
              style={{ padding: '5px 10px', fontSize: '14px' }}
            >
              Remove 1
            </button>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '1.2rem', margin: '15px 0' }}>Total Amount: <strong>${cartTotal.toFixed(2)}</strong></p>
      
      <form onSubmit={handleCheckout}>
        <textarea placeholder="Enter Shipping Address" value={address} onChange={e => setAddress(e.target.value)} required rows="4" />
        <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="secondary" onClick={() => setView('shop')}>Back to Shop</button>
          <button type="submit" disabled={cart.length === 0}>Confirm Order</button>
        </div>
      </form>
    </div>
  );
}

export default Billing;