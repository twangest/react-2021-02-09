import { DECREMENT, INCREMENT, CLEAR_AMOUNT } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return state[id]
        ? { ...state, [id]: state[id]-1 > 0 ? state[id] - 1 : 0  }
        : state;
    case CLEAR_AMOUNT:
      return state[id] ? { ...state, [id]: 0 } : state;
    default:
      return state;
  }
};
