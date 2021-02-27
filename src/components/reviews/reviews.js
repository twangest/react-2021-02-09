import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import {loadReviews, loadUsers} from '../../redux/actions';
import { connect } from 'react-redux';
import {
  usersErrorSelector,
  usersLoadedSelector,
  usersLoadingSelector,
  restaurantReviewsLoadedSelector, reviewsLoadingSelector
} from "../../redux/selectors";
import Loader from "../loader";

const Reviews = ({ reviews, restaurantId, loadReviews, reviewsLoaded, reviewsLoading,
                   loadUsers, usersLoading, usersLoaded, usersError }) => {
  useEffect(() => {
    if (!reviewsLoading && !reviewsLoaded(reviews)) {
      loadReviews(restaurantId);
    }
  }, [loadReviews, restaurantId, reviewsLoaded, reviewsLoading, reviews]);
  useEffect( () => {
    if (!usersLoading && !usersLoaded && !usersError) {
      loadUsers();
    }
  }, [loadUsers, usersLoading, usersLoaded, usersError]);

  if (usersLoading || reviewsLoading) return <Loader />
  if (!reviewsLoaded) return null;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
const mapStateToProps = (state) => ({
  usersLoading: usersLoadingSelector(state),
  usersLoaded: usersLoadedSelector(state),
  usersError: usersErrorSelector(state),
  reviewsLoaded: (reviews) => restaurantReviewsLoadedSelector(state, reviews),
  reviewsLoading: reviewsLoadingSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => dispatch(loadUsers()),
  loadReviews: (id) => dispatch(loadReviews(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
