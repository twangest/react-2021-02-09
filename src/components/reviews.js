import React from 'react';
import Rate from "./rate";
import styles from "./reviews.module.css";

function getAverageFromArray(items, digitsCount = 1) {
  const average = items.length
    ? items.slice().reduce((sum, item) => sum + item, 0) / items.length
    : 0;
  return (average - average.toFixed(digitsCount))
    ? average.toFixed(digitsCount)
    : average
}

function Reviews(props) {
  const averageRating = getAverageFromArray( props.reviews.map(item => item.rating))
  return (
    <div>
      <h4>Отзывы: (<Rate rating={averageRating} className={styles.inline}  title="средний рейтинг:"/>)</h4>

      {props.reviews.map(review => {
        return (
          <div className={styles.card} key={review.id}>
            <div className={styles.card__title}>{review.user}</div>
            <p>{review.text}</p>
            <p><Rate title="Рейтинг:" rating={review.rating} /></p>
          </div>
        )
      })}
    </div>
  );
}

export default Reviews;
