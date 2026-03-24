import React from 'react';

function Shop({ products, cart, setCart, setView }) {
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // Calculates how many of a specific item are currently sitting in the cart
  const getInCartCount = (productId) => {
    return cart.filter(item => item.id === productId).length;
  };

  return (
    <div className="card">
      <div className="header-bar">
        <h2>Available Products</h2>
        <button onClick={() => setView('billing')} disabled={cart.length === 0}>
          Cart ({cart.length}) - ${cartTotal.toFixed(2)}
        </button>
      </div>
      <div className="grid">
        {products.map(p => {
          // Calculate if the user can buy more
          const inCart = getInCartCount(p.id);
          const remainingStock = p.stock - inCart;

          return (
            <div key={p.id} className="product-card">
              <h4>{p.name}</h4>
              <p>${p.price.toFixed(2)}</p>
              
              <p style={{ fontSize: '0.9rem', color: remainingStock > 0 ? '#7f8c8d' : '#e74c3c' }}>
                {remainingStock > 0 ? `${remainingStock} available` : 'Sold Out'}
              </p>

              <button 
                onClick={() => setCart([...cart, p])}
                disabled={remainingStock <= 0}
                style={{ 
                  backgroundColor: remainingStock <= 0 ? '#bdc3c7' : '#3498db',
                  marginTop: '10px'
                }}
              >
                {remainingStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Shop;