import {createSelector} from 'reselect';

// const restaurantsSelector = (state) => state.restaurants;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;
const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users;

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


const restaurantReviewsSelector = (state, reviews) => reviews.map(id => reviewsSelector(state)[id]);

export const averageRatingSelector = createSelector(
  restaurantReviewsSelector,
  (reviews) => {
    const total = reviews.reduce((acc, {rating}) => acc + rating, 0);
    return reviews.length
      ? Math.round(total / reviews.length)
      : 0;
  }
);

export const productSelector = (state, productId) => productsSelector(state)[productId];

export const amountSelector = (state, productId) => orderSelector(state)[productId];

export const reviewSelector = (state, reviewId) => reviewsSelector(state)[reviewId];
export const userByIdSelector = (state, userId) => usersSelector(state)[userId];
export const userByNameSelector = (state, name) => Object.values(usersSelector(state))
  .find(user => user.name === name);
