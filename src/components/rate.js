import React, {useState} from 'react';
function Rate(props) {
  const rating = props.rating < 0
    ? 0
    : props.rating > 5
      ? 5
      : props.rating;
  return (
    <div className={props.className}>{(props.title) ? `${props.title} ` : ''}{rating}</div>
  );
}

export default Rate;
