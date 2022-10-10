import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cart, cartInterface } from "./cart.state";

const getCartState = createFeatureSelector<cartInterface>('cart');


export const getCartProducts = createSelector(getCartState, (state) => {
    return state
})


// export const getChannelName = createSelector(getCartState, (state) => {
//     return state.
// })