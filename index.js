import React from "react" ;
import  { useReducer } from 'react';

const initialState = {
  cart: [], 
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [
          ...state.cart,
          { id: action.id, name: action.name, price: action.price, quantity: 1},
        ],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.id
              ? item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null
              : item
          )
          .filter(item => item !== null),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
    { id: 3, name: 'Product 3', price: 200 },
  ];

  const handleAddItem = (product) => {
    dispatch({ type: 'ADD_ITEM', id: product.id, name: product.name, price: product.price });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>Available Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
            <button onClick={() => handleAddItem(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Your Cart</h2>
      {state.cart.length === 0? (
        <p>Your cart is empty. Please add some items!</p>
      ) : (
        <div>
          <ul>
            {state.cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};
