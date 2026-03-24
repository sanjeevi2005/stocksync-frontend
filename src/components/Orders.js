import React, { useState, useEffect } from 'react';

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://stocksync-api.onrender.com/api/orders/${user.id}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load order history.");
      }
    };
    
    fetchOrders();
  }, [user.id]);

  return (
    <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2>My Order History</h2>
      
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px' }}>Order ID</th>
              <th style={{ padding: '10px' }}>Total Amount</th>
              <th style={{ padding: '10px' }}>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>#{order.id}</td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>${order.total.toFixed(2)}</td>
                <td style={{ padding: '10px', color: '#7f8c8d' }}>{order.billing_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;