import { DECREMENT, INCREMENT, CLEAR_AMOUNT } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const clearAmount = (id)=>({ type: CLEAR_AMOUNT, id });
