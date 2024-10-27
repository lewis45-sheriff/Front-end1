import React, { useEffect, useState } from 'react';
import './Bestseller';
import Login from './Login';

// Modal Component for Login
function LoginModal({ onClose }) {
  return (
    <nav className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Login />
        
      </div>
    </nav>
  );
}

function Wines() {
  const [wines, setWines] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to show/hide modal

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchWines = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/product/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const wineData = data.map((wine) => ({
          id: wine.id,
          name: wine.name,
          category: wine.category,
          price: wine.price,
          isNew: wine.is_new,
          isBestSeller: wine.is_best_seller,
          image: wine.avatar,
          description: "",
        }));
        setWines(wineData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  const handleAddToCart = (wine) => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Show login modal if not logged in
      return;
    }
    if (cart.some(item => item.id === wine.id)) {
      alert(`${wine.name} is already in the cart.`);
      return;
    }
    setCart((prevCart) => [...prevCart, wine]);
    console.log(`Added ${wine.name} to cart`);
  };

  const closeModal = () => setShowLoginModal(false); // Close modal function

  const bestSellers = wines.filter(wine => wine.isBestSeller);
  const newProducts = wines.filter(wine => wine.isNew);

  return (
    <div className="wine-list">
      {loading && <p>Loading wines...</p>}
      {error && <p>Error fetching wines: {error}</p>}
      
      {/* Best Sellers Section */}
      {!loading && !error && bestSellers.length > 0 ? (
        <div className="best-sellers-section">
          <h2>Best Sellers</h2>
          {bestSellers.map((wine) => (
            <div key={wine.id} className="wine-item">
              <h3>{wine.name}</h3>
              <img src={wine.image} alt={wine.name} className="wine-image" />
              <p><strong>Price:</strong> {wine.price}</p>
              {wine.isNew && <span className="badge new">New!</span>}
              {wine.isBestSeller && <span className="badge best-seller">Best Seller</span>}
              <button onClick={() => handleAddToCart(wine)}>Add to Cart</button>
              <a
                href={`https://wa.me/254105054766?text=I'm interested in ${wine.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                Order via WhatsApp
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No best-selling wines available.</p>
      )}

      {/* New Products Section */}
      {!loading && !error && newProducts.length > 0 ? (
        <div className="new-products-section">
          <h2>New Products</h2>
          {newProducts.map((wine) => (
            <div key={wine.id} className="wine-item">
              <h3>{wine.name}</h3>
              <img src={wine.image} alt={wine.name} className="wine-image" />
              <p><strong>Price:</strong> {wine.price}</p>
              {wine.isNew && <span className="badge new">New!</span>}
              <button onClick={() => handleAddToCart(wine)}>Add to Cart</button>
              <a
                href={`https://wa.me/254105054766?text=I'm interested in ${wine.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                Order via WhatsApp
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No new wines available.</p>
      )}

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={closeModal} />}
    </div>
  );
}

export default Wines;
