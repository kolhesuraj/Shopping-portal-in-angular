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
export const increaseCounter = createAction(
  'increaseCounter',
  props<{ products:cartInterface }>()
);
export const minusCounter = createAction(
  'minusCounter',
  props<{ productID: string }>()
);
