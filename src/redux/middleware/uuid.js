import { v4 as uuidv4 } from 'uuid';
import {CREATE_USER, PUBLISH_REVIEW} from "../constants";
import {createUser} from "../actions";
import {userByNameSelector} from "../selectors";
export default (store) => (next) => (action) => {
  const uuid = uuidv4();
  const {type} = action
  switch (type) {

    case CREATE_USER:
      next({...action, userId: uuid});
      break;

    case PUBLISH_REVIEW:
      const user = userByNameSelector(store.getState(), action.name);
      if (user) {
        next({...action, id: uuid, userId: user.id});
        break;
      }
      store.dispatch(createUser(action.name))
      const newUser = userByNameSelector(store.getState(), action.name);
      next({...action, userId: newUser.id, id: uuid});
      break;
    default:
      next(action);
  }

}
