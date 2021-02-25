import {normalizedProducts, normalizedRestaurants} from '../../fixtures';
import {PUBLISH_REVIEW} from "../constants";
const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {}
)
export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case PUBLISH_REVIEW:
      const {restaurantId, id} = action;
      if (restaurantId && id) {
        const restaurant = restaurants[restaurantId];
        if (restaurant) {
          restaurant.reviews = [...restaurant.reviews, id];
          return {...restaurants, [restaurantId]: {...restaurant}}
        }
      }
      return restaurants
    default:
      return restaurants;
  }
};
