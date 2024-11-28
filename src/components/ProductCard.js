import React from 'react'

const ProductCard = ({productProps}) => {
    const product=productProps
  return (
    <div className="max-w-64 max-h-min rounded overflow-hidden shadow-lg bg-white">
    <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.productName} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{product.productName}</div>
      <p className="text-gray-700 text-base">{product.description}</p>
    </div>
    <div className="px-6 py-4">
      <span className="text-gray-900 font-bold">₹{product.price}</span>
    </div>
  </div>
  )
}

export default ProductCard