import { normalizedUsers } from '../../fixtures';
import {CREATE_USER} from "../constants";

const defaultUsers = normalizedUsers.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {}
)

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    case CREATE_USER:
      const {userId: id, name} = action;
      return {...users, [id]: {id, name}};
    default:
      return users;
  }
};
