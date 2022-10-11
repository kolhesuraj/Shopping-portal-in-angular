import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cart } from './cart.state';

const getCartState = createFeatureSelector<cart>('cart');

export const getCartProducts = createSelector(getCartState, (state) => {
  return state.products;
});

export const getCheckOut= createSelector(getCartState, (state) => {
    return state.checkOut;
})
