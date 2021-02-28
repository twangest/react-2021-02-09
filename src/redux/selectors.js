import {createSelector} from 'reselect';

const restaurantsSelector = (state) => state.restaurants.entities;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;
export const restaurantsErrorSelector = (state) => state.restaurants.error;

export const productsLoadingSelector = (state) => state.products.loading;
export const productsErrorSelector = (state) => state.products.error;

export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;
export const usersErrorSelector = (state) => state.users.error;

const arrayHasKeys = (obj, keys) => !![...keys].reduce((acc, item) => acc && Object.keys(obj).includes(item), true)

export const menuProductsLoaded = createSelector(
  productsSelector,
  (_, {menu}) => menu,
  (products, menu) => arrayHasKeys(products, menu)
)

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

export const amountSelector = (state, {id}) => orderSelector(state)[id] || 0;

export const productSelector = createSelector(
  productsSelector,
  (_, {id}) => id,
  (products, id) => products?.[id] || null
  );

const reviewSelector = createSelector(
  reviewsSelector,
  (_, {id}) => id,
  (reviews, id) => reviews?.[id] || null
)

export const orderProductsSelector = createSelector(
  orderSelector,
  productsSelector,
  (order, products) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, {subtotal}) => acc + subtotal, 0)
);

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => {return review ?  {...review, user: users[review.userId]?.name} : null}
);

export const restaurantReviewsLoadedSelector = createSelector(
  reviewsSelector,
  (_, props) => props.restaurant ? props.restaurant.reviews : props,
  (reviews, ids) => {
    return arrayHasKeys(reviews, ids);
  }
)
export const reviewsLoadingSelector = state => state.reviews.loading

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, {restaurant}) => restaurant.reviews,
  restaurantReviewsLoadedSelector,

  (reviews, ids, reviewsLoaded) => {
    if (!reviewsLoaded) return 0;
    const ratings = ids.map((id) => reviews[id].rating);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);
