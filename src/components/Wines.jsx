import React, { useEffect, useState } from 'react';

const WhiskeyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/product/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Implement cart functionality
    console.log(`Added ${product.name} to cart`);
  };

  if (loading) return <div className="text-center p-8">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.avatar}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category and Alcohol Content */}
              <div className="text-sm text-gray-600 mb-2">
                {product.category} | {product.alcohol_content}%
              </div>

              {/* Product Name */}
              <h3 className="text-lg font-semibold mb-2 truncate">
                {product.name}
              </h3>

              {/* Volume and Price */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">{product.volume} ml</span>
                <span className="font-bold text-lg">Ksh {product.price.toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg">🛒</span>
                </button>
                
                <a
                  href={`https://wa.me/254105054766?text=I'm interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors text-center"
                >
                  <span className="text-lg">💬</span>
                </a>
                
                <button
                  className="flex-1 text-red-500 p-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  <span className="text-lg">❤️</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhiskeyProducts;