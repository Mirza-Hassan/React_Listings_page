import styles from './listing-card.module.scss';
import { Link } from 'react-router-dom';
import { ListingCardProps } from './index';

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <article className={styles['listing-card']}>
      <span className={styles['listing-card__price']}>{listing.latest_price_eur}  &euro;</span>
      <ul className={styles['listing-card__properties']}>
        <li className={styles['listing-card__properties-item']}>{listing.building_type}</li>
        <li className={styles['listing-card__properties-item']}>
        {listing.surface_area_m2}<sup>2</sup>
        </li>
        <li className={styles['listing-card__properties-item']}>{listing.rooms_count} rooms</li>
      </ul>
      <section className={styles['listing-card__address']}>
      <address>
          {listing.postal_address.street_address}, {listing.postal_address.city}, {listing.postal_address.postal_code}, {listing.postal_address.country}
        </address>      
      </section>
      <section className={styles['listing-card__description']}>
        <h3>Property description: </h3>
        <p> {listing.description}</p>
      </section>
      <div className={styles['listing-card__footer']}>
        <p className={styles['listing-card__reference']}>
          Ref: {listing.id} <br />
          {listing.updated_date}
        </p>
        <Link key={listing.id} className={styles['listing-card__link']} to={`/${listing.id}/prices`}>
        See history &rarr;
        </Link>
      </div>
    </article>
  );
};

export default ListingCard;
