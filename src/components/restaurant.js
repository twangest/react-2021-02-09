import React, {useState, useMemo} from 'react';
import Menu from "./menu";
import Reviews from "./reviews";
import Rate from "./rate";



function Restaurant(props) {


  return (
    <div>
      <h3>{props.name} </h3>
      <Menu menu={props.menu} />
      <Reviews reviews={props.reviews} />
    </div>
  );
}

export default Restaurant;
