import React, { useEffect, useState } from 'react';
import './Wines.css';

function Wines() {
  const [wines, setWines] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          category: wine.category, // Assuming category is a number; you can map it to a string later if needed
          price: wine.price,
          isNew: wine.is_new,
          isBestSeller: wine.is_best_seller,
          image: wine.avatar, // Updated to use the avatar field for the image
          description: "", // Placeholder; update as needed
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
      alert('Please log in to add items to the cart');
      return;
    }
    if (cart.some(item => item.id === wine.id)) {
      alert(`${wine.name} is already in the cart.`);
      return;
    }
    setCart((prevCart) => [...prevCart, wine]);
    console.log(`Added ${wine.name} to cart`);
  };

  // Filter to show only best sellers
  const bestSellers = wines.filter(wine => wine.isBestSeller);

  return (
    <div className="wine-list">
      {loading && <p>Loading wines...</p>}
      {error && <p>Error fetching wines: {error}</p>}
      {!loading && !error && bestSellers.length > 0 ? (
        bestSellers.map((wine) => (
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
        ))
      ) : (
        !loading && <p>No best-selling wines available.</p>
      )}
    </div>
  );
}

export default Wines;
