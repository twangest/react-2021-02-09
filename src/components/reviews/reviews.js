import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import {loadReviews, loadUsers} from '../../redux/actions';
import { connect } from 'react-redux';
import {
  reviewWitUserSelector,
  usersErrorSelector,
  usersLoadedSelector,
  usersLoadingSelector
} from "../../redux/selectors";
import Loader from "../loader";

const Reviews = ({ reviews, restaurantId, loadReviews,
                   loadUsers, usersLoading, usersLoaded, usersError }) => {
  useEffect(() => {
    loadReviews(restaurantId);
  }, [loadReviews, restaurantId]);
  useEffect( () => {
    if (!usersLoading && !usersLoaded && !usersError) {
      loadUsers();
    }
  }, [loadUsers, usersLoading, usersLoaded, usersError]);

  if (usersLoading) return <Loader />

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
const mapStateToProps = (state, props) => ({
  usersLoading: usersLoadingSelector(state),
  usersLoaded: usersLoadedSelector(state),
  usersError: usersErrorSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => dispatch(loadUsers()),
  loadReviews
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
