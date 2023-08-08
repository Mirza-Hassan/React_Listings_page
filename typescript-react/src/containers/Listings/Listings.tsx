import ListingCard from '@components/ListingCard';
import ListingForm from '@components/ListingForm';
import styles from './listings.module.scss';
import { useState, useEffect } from 'react';
import React from 'react';
import { Listing } from './index';

const Listings = () => {

  // State for listings
  const [listings, setListings] = useState<Listing[]>([]);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [refresh, setRefresh] = useState(false);

   // Fetch listings
   useEffect(() => {
    // if (!refresh) return; // Check condition to avoid unnecessary fetching
    fetch('https://localhost:7044/listings') // Fetch the listings from the API
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error('Error fetching listings:', error));
      // setRefresh(false);
    }, [refresh]); // Depend on the refresh state

  // Handle edit action
  const handleEdit = (listing: React.SetStateAction<Listing | null>) => {
    setEditingListing(listing);
    setRefresh(!refresh); // toggle the refresh state
  };
  return (
    <main className={styles['listings']}>
      <h1 className={styles['listings__title']}>Main Listings page</h1>
      <div className={styles['listings__wrapper']}>
        <aside className={styles['listings__aside']}>
          <h2 className={styles['listings__sub-title']}>Add a listing</h2>
          <ListingForm listing={editingListing} refresh={refresh} setRefresh={setRefresh} setEditingListing={setEditingListing}/>
        </aside>
        <section className={styles['listings__section']}>
          <h2 className={styles['listings__sub-title']}>Listings</h2>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <React.Fragment key={listing.id}>
              <ListingCard listing={listing} />
                <button className={styles['listings__edit-button']} onClick={() => handleEdit(listing)}>Edit</button>
              </React.Fragment>
            ))
          ) : (
            <p>No listings available.</p>
          )}

        </section>
      </div>
    </main>
  );
};

export default Listings;
