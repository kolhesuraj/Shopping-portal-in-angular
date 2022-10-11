import { createAction, props } from '@ngrx/store';
import { cartInterface } from './cart.state';

export const addItem = createAction(
  'addItem',
  props<{ products: cartInterface }>()
);
export const removeItem = createAction(
  'removeItem',
  props<{ products: cartInterface }>()
);
export const addCheckoutItem = createAction(
  'addCheckoutItem',
  props<{ checkOut: cartInterface }>()
);
export const removeCheckoutItem = createAction(
  'removeCheckoutItem',
  props<{ checkOut: cartInterface }>()
);
export const Counter = createAction(
  'Counter',
  props<{ checkOut: cartInterface }>()
);
