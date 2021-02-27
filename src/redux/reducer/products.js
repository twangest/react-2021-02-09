import { arrToMap } from '../utils';
import {FAILURE, LOAD_PRODUCTS, REQUEST, SUCCESS} from "../constants";

const initialState = {
  entities: {},
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOAD_PRODUCTS + SUCCESS:
      const entities = state.entities
      return {
        ...state,
        loading: false,
        entities: {...entities, ...arrToMap(data)}
      }
    case LOAD_PRODUCTS + FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state;
  }
};
