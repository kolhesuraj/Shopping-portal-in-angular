import { createReducer, on } from '@ngrx/store';
import { addCheckoutItem, addItem, Counter, removeItem,removeCheckoutItem } from './cart.action';
import { initialstate } from './cart.state';

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
  on(addCheckoutItem, (state, action) => {
    console.log(action.checkOut);
    return {
      ...state,
      checkOut: [action.checkOut],
    };
  }),
  on(removeCheckoutItem, (state, action) => {
    let newCheckOutArray = state.checkOut.filter((product) => {
      return product.productId !== action.checkOut.productId;
    });

    return {
      ...state,
      checkOut: newCheckOutArray,
    };
  }),
  on(Counter, (state, action) => {
    let newProductsArray = state.checkOut.map((element) => {
      return element.productId === action.checkOut.productId
        ? action.checkOut
        : element;
    });
    return {
      ...state,
      checkOut: newProductsArray,
    };
  })
);

export function cartAction(state: any, action: any) {
  return cartState(state, action);
}
