import { createAction } from '@ngrx/store';

export const addItem = createAction('addItem');
export const removeItem = createAction('removeItem');
export const increaseCounter = createAction('increaseCounter');
export const minusCounter = createAction('increaseCounter');
