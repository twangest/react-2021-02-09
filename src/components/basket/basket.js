import React, {useMemo} from 'react'
import {connect} from "react-redux";
import styles from './styles.module.css'
import Product from "../product";

const orderItem = (product) => {
  const {id, price, amount} = product
  return (
    <div key={id} className={styles.product__wrapper}>
      <div className={styles.product__name}><Product product={product} /></div>
      <div className={styles.product__price_amount}>${amount*price}</div>
    </div>
  )
}

const filterById = (items = [], id) => {
  return items.find(item => item.id === id)
}

const Basket = ({restaurants, order}) => {

  const products = useMemo(() => {
    return Object.entries(order)
      .map(([id, amount]) => {
        const restaurant = restaurants.find(restaurant => {
          return filterById(restaurant.menu, id)
        })
        return restaurant ? {...filterById(restaurant.menu, id), amount} : false
      })
  }, [order, restaurants]);

  const total = useMemo( () => {
    return [...products]
      .reduce((total, item)=>total + item['price'] * item.amount, 0)
  }, [products]);

  return (
    <div className={styles.basket}>
      <div className={styles.title}>
        Заказ товаров {Object.keys(order).length} на сумму:  <span className={styles.total}>${total}</span>
      </div>
      {products.map(orderItem)}
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  order: state.order
})

export default connect(mapStateToProps)(Basket)
