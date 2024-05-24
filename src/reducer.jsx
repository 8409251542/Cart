// src/reducer.js
export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return state.map(product => 
          product.id === action.payload.id 
            ? { ...product, qty: product.qty + 1 }
            : product
        );
  
      case 'REMOVE_PRODUCT':
        return state.map(product =>
          product.id === action.payload.id && product.qty > 0
            ? { ...product, qty: product.qty - 1 }
            : product
        );

        case 'DELETE_PRODUCT':
            return state.map(product =>
              product.id === action.payload.id
                ? { ...product, qty: 0 }
                : product
        );
  
      default:
        return state;
    }
  };
  