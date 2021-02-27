import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import {
  averageRatingSelector, menuProductsLoaded,
  productsErrorSelector,
  productsLoadingSelector
} from '../../redux/selectors';
import {loadProducts} from "../../redux/actions";

const Restaurant = ({
                      restaurant,
                      averageRating,
                      menuProductsLoaded,
                      productsLoading,
                      productsError,
                      loadProducts}) => {
  const {id, name, menu, reviews} = restaurant;

  useEffect(() => {
    if (!productsLoading && !menuProductsLoaded && !productsError) {
      loadProducts(id)
    }
  }, [productsLoading, menuProductsLoaded, id, loadProducts, productsError])

  const tabs = [
    {title: 'Menu', content: <Menu menu={menu} loaded={menuProductsLoaded} loading={productsLoading}/>},
    {
      title: 'Reviews',
      content: <Reviews reviews={reviews} restaurantId={id}/>,
    },
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
    id: PropTypes.string,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  averageRating: averageRatingSelector(state, props),
  productsLoading: productsLoadingSelector(state),
  productsError: productsErrorSelector(state),
  menuProductsLoaded: menuProductsLoaded(state, props)
})
const mapDispatchToProps = (dispatch) => ({
  loadProducts: (id) => {
    dispatch(loadProducts(id))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
