import React from 'react';
import PropTypes from 'prop-types';
import Rate from '../../rate';
import styles from './review.module.css';

const propTypes = {
  user: PropTypes.string,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number
}
const defaultProps = {
  user: 'Anonymous',
};
const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id='review-user'>{user}</h4>
        <p className={styles.comment} data-id='review-text'>{text}</p>
      </div>
      <div className={styles.rate} data-id='review-rate'>
        <Rate value={rating} />
      </div>
    </div>
  </div>
);
Review.propTypes = propTypes;
Review.defaultProps = defaultProps;

export default Review;
