import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <Link to={`/products/${product.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;