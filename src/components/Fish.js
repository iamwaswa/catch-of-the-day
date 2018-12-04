import React from 'react';
import { formatPrice } from '../helpers';

const Fish = ({ details, index, addToOrder }) => {
  const handleAddToOrder = () => {
    addToOrder(index);
  };

  return (
    <li className="menu-fish">
      <img src={details.image} alt={details.name}/>
      <h3 className="fish-name">
        {details.name}
        <span className="price">
          {formatPrice(details.price)}
        </span>
      </h3>
      <p>
        {details.description}
      </p>
      <button 
        disabled={!details.isAvailable} 
        onClick={handleAddToOrder}
      >
        {details.isAvailable ? `Add To Order` : `Sold Out!`}
      </button>
    </li>
  );
}

export default Fish;