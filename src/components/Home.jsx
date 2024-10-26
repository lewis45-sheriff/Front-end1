import React, { useState, useEffect } from 'react';
import './Home.css';
import { Menu, X } from 'lucide-react';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/product/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Adjust this breakpoint as needed
        setIsSidebarOpen(true); // Always open on larger screens
      } else {
        setIsSidebarOpen(false); // Collapse on smaller screens
      }
    };

    handleResize(); // Set initial state based on current width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bestSellers = products.filter(product => product.isBestSeller);
  const newProducts = products.filter(product => product.isNew);

  return (
    <div className="home-page">
      <div className="relative">
        {/* Toggle Button */}


        {/* Sidebar for product categories */}
        <nav class='dropdown'>
          <div class="dropdown-toggl">CATEGORIES</div>
          <div class="dropdown-menu">
            <div>Premium Brands</div>
            <div>Spirits</div>
            <div>Wine</div>
            <div>Beer</div>
            <div>Cocktails</div>
            <div>Non-Alcoholic</div>
          </div>
        </nav>



    </div>

      {/* Main content */ }
  <div className="main-content">
    <header className="header">
      <h1>Atlas Liquor Store</h1>
    </header>

    {/* Promotional Section */}
    <section className="promo-section">
      <img
        src="https://i.pinimg.com/originals/22/07/81/220781f7c2a3d5c986dd7cc34db24b42.gif"
        alt="Liquor Promotion"
        className="promo-image"
      />
      <div className="promo-text">
        <p>
          Welcome to <strong>Atlas Liquor Store</strong>, your premier destination for a diverse selection of premium liquors, spirits, wines, and beers. We cater to both retail and wholesale customers, ensuring that whether you’re stocking up for your business or seeking the perfect drink for a special occasion, we have just what you need. Our inventory features everything from exclusive, high-end collections to everyday essentials, all at wholesale prices. Enjoy the best value with our carefully curated retail selections. Explore <strong>Atlas Liquor Store</strong> today and experience the convenience of quality beverages delivered right to your door, whether you're purchasing in bulk or just a single bottle.
        </p>
      </div>
    </section>

    {/* Featured Wine Types */}
    <section className="wine-gallery">
      <h2>Featured Categories</h2>
      <div className="category-grid">
        <div className="category-item">
          <img src="https://i.pinimg.com/236x/59/15/a3/5915a3540f01f148b13b50b022077a56.jpg" alt="Premium Collections" />
          <h3>Premium Collections</h3>
          <p>Exclusive selections of rare and sought-after bottles for the discerning collector.</p>
        </div>
        <div className="category-item">
          <img src="https://i.pinimg.com/236x/0f/0f/05/0f0f0587a2f73ebd1098b0a1ef0b3ace.jpg" alt="Wines" />
          <h3>Wines</h3>
          <p>Curated selection of red, white, and rosé wines from renowned vineyards worldwide.</p>
        </div>
        <div className="category-item">
          <img src="https://i.pinimg.com/236x/90/7d/29/907d29ea4ee97d1554e820e797d0f6e0.jpg" alt="Beers" />
          <h3>Beers</h3>
          <p>Craft and premium beers featuring local brews, imports, and limited editions.</p>
        </div>
        <div className="category-item">
          <img src="https://i.pinimg.com/236x/a7/08/5d/a7085da262fb2ded24df4b117c47873d.jpg" alt="Spirits" />
          <h3>Spirits</h3>
          <p>Fine selection of whiskey, gin, vodka, and other premium spirits from around the globe.</p>
        </div>
      </div>
    </section>

    {/* Loading State */}
    {loading ? (
      <div className="loading">Loading products...</div>
    ) : (
      <div className="product-grid">
        {/* Best Sellers Section */}
        <h2 className='heading1'>Best Sellers</h2>
        <div className="grid">
          {bestSellers.length > 0 ? (
            bestSellers.map((product, index) => (
              <div key={index} className="product-card">
                {product.isNew && <div className="new-badge">NEW</div>}
                <img
                  src={product.imageUrl || '/api/placeholder/300/400'}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">KShs {product.price}</p>
                  <button className="add-to-cart-button">ADD TO CART</button>
                </div>
              </div>
            ))
          ) : (
            <p>No bestsellers available.</p>
          )}
        </div>

        {/* New Products Section */}
        <h2 className='heading1'> New</h2>
        <div className="grid">
          {newProducts.length > 0 ? (
            newProducts.map((product, index) => (
              <div key={index} className="product-card">
                <img
                  src={product.imageUrl || '/api/placeholder/300/400'}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">KShs {product.price}</p>
                  <button className="add-to-cart-button">ADD TO CART</button>
                </div>
              </div>
            ))
          ) : (
            <p>No new products available.</p>
          )}
        </div>

        {/* All Products Section */}
        <h2 className='heading1'>All Products</h2>
        <div className="grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.imageUrl || '/api/placeholder/300/400'}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">KShs {product.price}</p>
                <button className="add-to-cart-button">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
    </div >
  );
}

export default Home;
