import {createSelector} from 'reselect';

const restaurantsSelector = (state) => state.restaurants.entities;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users.entities;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;
export const restaurantsErrorSelector = (state) => state.restaurants.error;

export const productsLoadingSelector = (state) => state.products.loading;
export const productsErrorSelector = (state) => state.products.error;

export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;
export const usersErrorSelector = (state) => state.users.error;

export const menuProductsLoaded = createSelector(
  productsSelector,
  (_, {restaurant}) => restaurant.menu || [],
  (products, menu) => {
     const isLoaded = [...menu].reduce((acc, item) => acc && Object.keys(products).includes(item), true)
    return !!isLoaded;
  }
)

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

export const amountSelector = (state, {id}) => orderSelector(state)[id] || 0;

export const productSelector = createSelector(
  productsSelector,
  (_, {id}) => id,
  (products, id) => {
    return Object.keys(products).includes(id) ? products[id] : null;
  });

const reviewSelector = (state, {id}) => reviewsSelector(state)[id];

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
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, {restaurant}) => restaurant.reviews,
  (reviews, ids) => {
    const ratings = ids.map((id) => reviews[id].rating);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);
