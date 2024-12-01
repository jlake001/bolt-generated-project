import { useCart } from '../context/CartContext'

const products = [
  {
    id: 1,
    name: 'Premium T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable cotton blend, perfect for everyday wear'
  },
  {
    id: 2,
    name: 'Designer Jeans',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Premium denim with perfect fit and style'
  },
  {
    id: 3,
    name: 'Urban Sneakers',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Modern design with superior comfort'
  },
  {
    id: 4,
    name: 'Classic Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Timeless elegance for any occasion'
  },
  {
    id: 5,
    name: 'Leather Backpack',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Durable and stylish everyday companion'
  },
  {
    id: 6,
    name: 'Wireless Headphones',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Premium sound quality with noise cancellation'
  }
]

export default function ProductList() {
  const { addToCart } = useCart()

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden card-hover">
            <div className="relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-indigo-600">${product.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <button
                onClick={() => {
                  addToCart(product)
                  // Add a small vibration if supported
                  if ('vibrate' in navigator) {
                    navigator.vibrate(50)
                  }
                }}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
