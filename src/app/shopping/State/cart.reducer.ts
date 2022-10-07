import { createReducer, on } from "@ngrx/store";
import { addItem } from "./cart.action";

const cartState = createReducer(initialstate, on(addItem, (state) => {
    return {
      ...state,
    //   products: state + item;
    };
}));