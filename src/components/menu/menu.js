import React from 'react';
import PropTypes from 'prop-types';

import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';
import Loader from "../loader";
import {connect} from "react-redux";

import {
  menuProductsLoaded,
  productsErrorSelector,
  productsLoadingSelector
} from "../../redux/selectors";

import {loadProducts} from "../../redux/actions";

class Menu extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  constructor(props) {
    super(props);
    const {
      menuProductsLoaded,
      productsLoading,
      productsError,
      loadProducts,
      restaurantId
    } = this.props
    if (!productsLoading && !menuProductsLoaded && !productsError) {
      loadProducts(restaurantId)
    }
  }

  state = {
    error: null
  };

  componentDidCatch(error) {
    this.setState({error});
  }

  render() {
    const {menu, menuProductsLoaded} = this.props;

    if (this.props.productsLoading) return <Loader />
    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
    }
    if (!menuProductsLoaded) return null;
    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            <Product key={id} id={id}/>
          ))}
        </div>
        <div>
          <Basket/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  productsLoading: productsLoadingSelector(state),
  productsError: productsErrorSelector(state),
  menuProductsLoaded: menuProductsLoaded(state, props)
})
const mapDispatchToProps = (dispatch) => ({
  loadProducts: (id) => {
    dispatch(loadProducts(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
