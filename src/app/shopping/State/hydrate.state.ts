import { ActionReducer, INIT } from '@ngrx/store';
import { cart } from './cart.state';


export const hydrationMetaReducer = (
  reducer: ActionReducer<cart>
): ActionReducer<cart> => {
  return (state, action) => {
    if (action.type === INIT) {
      const storageValue = sessionStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          sessionStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    sessionStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};
