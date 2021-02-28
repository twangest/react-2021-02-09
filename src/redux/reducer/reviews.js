import {ADD_REVIEW, FAILURE, LOAD_REVIEWS, REQUEST, SUCCESS} from '../constants';
import { arrToMap } from '../utils';
import produce from "immer";

const reviewsInitialState = {
  entities: {}, loading: false, error: null
}

export default produce((draft = reviewsInitialState, action) => {
  const { type, review, reviewId, userId, error } = action;
  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      draft.loading = true;
      break;
    case LOAD_REVIEWS + SUCCESS:
      draft.loading = false;
      Object.assign(draft.entities, arrToMap(action.data));
      break;
    case LOAD_REVIEWS + FAILURE:
      draft.loading = false;
      draft.error = error
      break;
    case ADD_REVIEW:
      const { text, rating } = review;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating }
      break;
    default:
      return draft;
  }
});
