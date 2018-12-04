import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { formatPrice } from '../helpers';

const Order = ({ order, fishes, removeFromOrder }) => {

  const displayOrder = () => {
    return Object.keys(order)
      .map((key) => {

        if (fishHasBeenRemoved(key) ||
            orderHasBeenRemoved(key)) {
          return null;
        }

        const handleOnClick = () => {
          removeFromOrder(key);
        }

        return (
          <CSSTransition
            key={key}
            classNames="order"
            timeout={{ enter: 500, exit: 500 }}
          >
            <li key={key}>
              {displayOrderItem(key, handleOnClick)}
            </li>
          </CSSTransition>
        );
      }
    );
  };

  const fishHasBeenRemoved = (key) => {
    return !fishes[key];
  };

  const orderHasBeenRemoved = (key) => {
    return !order[key];
  };

  const displayOrderItem = (key, handleOnClick) => {
    const { name, isAvailable } = fishes[key];
    const fishWeight = order[key];

    return isAvailable ? 
      addToFishOrder(fishWeight, name, key, handleOnClick):
      `Sorry, ${name} is no longer available`;
  }

  const addToFishOrder = (fishWeight, name, key, handleOnClick) => {
    return (
      <span>
        <TransitionGroup
          component='span'
          className='count'
        >
          <CSSTransition
            key={fishWeight}
            classNames='count'
            timeout={{ enter: 500, exit: 500 }}
          >
            <span>
              {fishWeight}
            </span>
          </CSSTransition>
        </TransitionGroup>
        {`lbs ${name}`}
        <span>
          {calculatePriceForOrderItem(fishes[key])}
        </span>
        <button onClick={handleOnClick}>
          &times;
        </button>
      </span>
    );
  };

  const calculatePriceForOrderItem = ({ isAvailable, price }) => {
    if (isAvailable) {
      return (
        <span>
          {formatPrice(price)}
        </span>
      );
    } 
  }

  const getTotalForOrder = () => {
    return Object.keys(order)
      .reduce((total, key) => {

        if (fishHasBeenRemoved(key)) {
          return total;
        }

        const { price, isAvailable } = fishes[key];

        if (!isAvailable){
          return total;
        }

        const numOrder = order[key];
        const totalPriceForOrder = price * numOrder;
        total += totalPriceForOrder;
        return total;
      }, 0);
  };

  return (
    <React.Fragment>
      <div className="order-wrap">
        <h2>
          Your Order
        </h2>
        <TransitionGroup
          className="order"
          component="ul"
        >
          {displayOrder()}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>
            {` ${formatPrice(getTotalForOrder())}`}
          </strong>
        </div>
      </div>
    </React.Fragment>
  );  
}

export default Order;