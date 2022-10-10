import { createReducer, on } from '@ngrx/store';
import { addItem, increaseCounter, removeItem } from './cart.action';
import { cart, cartInterface, initialstate } from './cart.state';

const cartState = createReducer(
  initialstate,
  on(addItem, (state, action) => {
    return {
      ...state,
      products: [...state.products, action.products],
    };
  }),
  on(removeItem, (state, action) => {
    let newCart = state.products.filter((product) => {
      return product.productId !== action.products.productId;
    });

    return {
      ...state,
      products: newCart,
    };
  }),
  on(increaseCounter, (state, action) => {
    // console.log("incresee", action.products)
    let newProductsArray = state.products.map((element) => {
      return element.productId === action.products.productId
        ? action.products
        : element;
    });
    return {
      ...state,
      products: newProductsArray,
    };
  })
);

export function cartAction(state: any, action: any) {
  return cartState(state, action);
}
