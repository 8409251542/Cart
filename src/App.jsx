// src/App.js
import React, { useReducer } from 'react';
import { cartReducer } from './reducer';

const initialProducts = [
  { id: 1, name: "iphones6", brand: "apple", qty: 0, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjcD39vufzzI7kaTsysvnMmqoai-iY-v28njI3mstbw&s", price: 40000 },
  { id: 2, name: "Poco F6", brand: "Xiaomi", qty: 0, imgUrl: "https://cdn1.smartprix.com/rx-iOnzDZrgN-w420-h420/poco-f6-5g-12gb-ram.jpg", price: 20000 },
  { id: 3, name: "Sumsang s20", brand: "Sumsung", qty: 0, imgUrl: "https://5.imimg.com/data5/SELLER/Default/2023/6/319962441/PY/DM/FH/4924047/samsung-galaxy-s20-fe-5g-cloud-lavender-128-gb-8-gb-ram-.jpg", price: 60000 }
];

const App = () => {
  const [products, dispatch] = useReducer(cartReducer, initialProducts);

  const handleAddProduct = (id) => {
    dispatch({ type: 'ADD_PRODUCT', payload: { id } });
  };

  const handleRemoveProduct = (id) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { id } });
  };
  const handleDeleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: { id } });
  };

  const totalItems = products.reduce((sum, product) => sum + product.qty, 0);
  const totalPrice = products.reduce((sum, product) => sum + product.qty * product.price, 0);

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{totalItems} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            {products.map(({ id, qty, brand, name, price, imgUrl }) => (
              <div key={id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={imgUrl} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{name}</span>
                    <span className="text-red-500 text-xs">{brand}</span>
                    <a onClick={() => handleDeleteProduct(id)} className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs">Remove</a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg onClick={() => handleRemoveProduct(id)} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>
                  <input className="mx-2 border text-center w-8" type="text" value={qty} readOnly />
                  <svg onClick={() => handleAddProduct(id)} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">₹{price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">₹{price * qty}</span>
              </div>
            ))}
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {totalItems}</span>
              <span className="font-semibold text-sm">₹{totalPrice}</span>
            </div>
            <div className="mt-8 mb-8">
              {products.filter(product => product.qty > 0).map(({ id, name, qty, price }) => (
                <div key={id} className="flex justify-between py-2">
                  <span className="font-semibold text-sm">{name}</span>
                  <span className="font-semibold text-sm">{qty} x ₹{price}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
