import { normalizedReviews } from '../../fixtures';
import {PUBLISH_REVIEW} from "../constants";

const defaultReviews = normalizedReviews.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {}
)

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case PUBLISH_REVIEW:
      const {userId, text, rating, id} = action;
      if (!userId && !text)
        return reviews;
      return {...reviews, [id] : {id, text, userId, rating}}
    default:
      return reviews;
  }
};
