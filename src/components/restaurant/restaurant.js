import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import {averageRatingSelector} from "../../redux/selectors";
import {connect} from "react-redux";

const Restaurant = ({restaurant, averageRating}) => {
  const {name, menu, reviews, id} = restaurant;

  const tabs = [
    {title: 'Menu', content: <Menu menu={menu}/>},
    {title: 'Reviews', content: <Reviews reviews={reviews} restaurantId={id} />},
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating}/>
      </Banner>
      <Tabs tabs={tabs}/>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    menu: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

const mapStateToProps = (state, props) => ({
  averageRating: averageRatingSelector(state, props.restaurant.reviews)
})

export default connect(mapStateToProps)(Restaurant);
