import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {reviewWitUserSelector} from "../../../redux/selectors";
import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({review} = {}) => {

    if (!review) return null;

    const {user, text, rating} = review;
    return (
      <div className={styles.review} data-id="review">
        <div className={styles.content}>
          <div>
            <h4 className={styles.name} data-id="review-user">
              {user}
            </h4>
            <p className={styles.comment} data-id="review-text">
              {text}
            </p>
          </div>
          <div className={styles.rate}>
            <Rate value={rating}/>
          </div>
        </div>
      </div>
    )
};

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
};

Review.defaultProps = {
  user: 'Anonymous',
};

const mapStateToProps = (state, props)=> ({
  review: reviewWitUserSelector(state, props),
})

export default connect(mapStateToProps)(Review);
