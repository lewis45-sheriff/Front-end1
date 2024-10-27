import React from 'react';
import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router-dom'; // Import useParams

const ProductDisplay = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Updated endpoint
        const response = await fetch(`http://localhost:8000/api/product_info/1/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Add id to the dependency array

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-600">
        <p>Error loading product: {error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={product.image || "/api/placeholder/400/600"}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center gap-2">
              <li>HOME</li>
              <li>/</li>
              <li>BEERS, INFUSIONS & SAKE</li>
              <li>/</li>
              <li>BEERS</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <div className="text-2xl font-bold text-amber-500">
            KShs {product.price}
          </div>

          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex gap-2">
                <span className="font-semibold">Product Name:</span>
                <span>{product.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Country of origin:</span>
                <span>{product.country_of_origin}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Alcohol content:</span>
                <span>{product.alcohol_content}%</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Type:</span>
                <span>{product.type}</span>
              </div>
            </div>

            <div className="text-green-600 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{product.in_stock ? 'In stock' : 'Out of stock'}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={!product.in_stock}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x"
                  disabled={!product.in_stock}
                  min="1"
                />
                <button 
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={!product.in_stock}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                className={`flex items-center gap-2 px-6 py-2 rounded-md ${
                  product.in_stock 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
