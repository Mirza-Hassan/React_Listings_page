import styles from './price-history-card.module.scss';
import React, { useState, useEffect } from 'react';
import {PriceHistoryCardProps, PriceHistory} from './index';

const PriceHistoryCard = ({ listingId }: PriceHistoryCardProps) => {

  // State for price history
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);

  // Fetch price history
  useEffect(() => {
    if (listingId) { // Check if listingId exists
    const url = `https://localhost:7044/listings/${listingId}/prices`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPriceHistory(data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching price history:', error);
      });
    }
  }, [listingId]);

  return (
    <div className={styles['container']}>
      <table className={styles['price-card']}>
        <tbody>
          <tr className={styles['price-card__header']}>
            <th scope="col">Date</th>
            <th scope="col">Price (eur)</th>
          </tr>
          {priceHistory?.map((history) => (
            <tr key={history?.created_date}>
              <td>{history?.created_date}</td>
              <td>{history?.latest_price_eur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PriceHistoryCard;