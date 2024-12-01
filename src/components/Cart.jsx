import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-primary inline-block">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
              <p className="text-indigo-600 font-medium">${item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MinusIcon className="w-5 h-5 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <PlusIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-gray-600">Subtotal</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="btn-primary w-full text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
