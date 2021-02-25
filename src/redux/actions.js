import {DECREMENT, INCREMENT, REMOVE, PUBLISH_REVIEW, CREATE_USER} from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const publishReview = (values) => ({type: PUBLISH_REVIEW, ...values})
export const createUser = (name) => ({type: CREATE_USER, name})
