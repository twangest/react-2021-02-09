import React from 'react';
import Product from './product';

export default function Menu(props) {
  return (
    <div>
      <h4>Меню:</h4>
      {props.menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
