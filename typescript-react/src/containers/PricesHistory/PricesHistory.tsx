import PricesHistoryCard from '@components/PriceHistoryCard';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './prices-history.module.scss';

const PricesHistory = () => {

  // Get listingId from URL
  const { listingId } = useParams<{ listingId: string }>();

  return (
    <div className={styles['container']}>
      <h1>Prices History</h1>
      <PricesHistoryCard listingId={Number(listingId)} />
      <Link to="/" className={styles['link']}>
        &larr; Back Home
      </Link>
    </div>
  );
};
export default PricesHistory;
