import React from 'react';
import { commerce } from '../lib/commerce';
import { useCartState, useCartDispatch } from './CartContext';

const LineItemControls = ({ lineItemId, quantity }) => {
  const { setCart } = useCartDispatch();
  const updateLineItem = async (lineItemId, quantity) => {
    try {
      const updatedCart = await commerce.cart.updateLineItem(lineItemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const removeLineItem = async (lineItemId) => {
    try {
      const updatedCart = await commerce.cart.removeLineItem(lineItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => updateLineItem(lineItemId, quantity - 1)}> - </button>
      <span>{quantity}</span>
      <button onClick={() => updateLineItem(lineItemId, quantity + 1)}> + </button>
      <button onClick={() => removeLineItem(lineItemId)}>Remove</button>
    </div>
  );
};

export default LineItemControls;
