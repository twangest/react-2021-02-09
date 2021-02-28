import produce from 'immer';
import {ADD_REVIEW, FAILURE, LOAD_USERS, REQUEST, SUCCESS} from '../constants';
import {arrToMap} from '../utils';

const usersInitialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
}

export default produce((draft = usersInitialState, action) => {
  const {type, review, userId} = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      draft.loading = true;
      break;
    case LOAD_USERS + SUCCESS:
      draft.loading = false;
      draft.loaded = true;
      draft.entities = arrToMap(action.data);
      break;
    case LOAD_USERS + FAILURE:
      draft.loading = false;
      draft.error = action.error;
      break;
    case ADD_REVIEW:
      const {name} = review;
      draft.entities[userId] = {id: userId, name};
      break;
    default:
      return draft;
  }
});
