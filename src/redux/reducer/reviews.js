import {ADD_REVIEW, FAILURE, LOAD_REVIEWS, REQUEST, SUCCESS} from '../constants';
import { arrToMap } from '../utils';

const reviewsInitialState = {
  entities: {}, loading: false, error: null
}

export default (state = reviewsInitialState, action) => {
  const { type, review, reviewId, userId } = action;
  const {entities} = state;
  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOAD_REVIEWS + SUCCESS:
      // const entities = state.entities;
      return {
        ...state,
        loading: false,
        entities: {...entities, ...arrToMap(action.data)}
      }
    case LOAD_REVIEWS + FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADD_REVIEW:
      const { text, rating } = review;
      return {
        ...state,
        entities: {...entities, [reviewId]: { id: reviewId, userId, text, rating }}
      };
    default:
      return state;
  }
};
