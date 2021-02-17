import React from 'react';
import PropTypes from 'prop-types'
import styles from './navigation.module.css';

const propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
      .isRequired
  ),
  onRestaurantClick: PropTypes.func
}

const Navigation = ({restaurants, onRestaurantClick}) => (
  <div className={styles.list}>
    {restaurants.map(({id, name}) => (
      <span
        key={id}
        className={styles.restaurant}
        onClick={() => onRestaurantClick(id)}
      >
        {name}
      </span>
    ))}
  </div>
);

Navigation.propTypes = propTypes;

export default Navigation;
