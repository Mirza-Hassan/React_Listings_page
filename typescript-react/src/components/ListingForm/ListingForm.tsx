import styles from './listing-form.module.scss';
import React, { useState, useEffect } from 'react';
import {ListingFormProps, FormData} from './index';

// Initialize form data
const initialFormData = {
  building_type: "none",
  bedrooms_count: "",
  contact_phone_number: "",
  description: "",
  latest_price_eur: "",
  name: "",
  postal_address: {
    street_address: "",
    postal_code: "",
    city: "",
    country: "none",
  },
  rooms_count: "",
  surface_area_m2: "",
};

const ListingForm: React.FC<ListingFormProps> = ({ listing, refresh, setRefresh, setEditingListing }) => {

  // State for Listing Form
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const listingId = listing?.id;

  // Update form with listing
  useEffect(() => {
    if (listing) {
      setFormData(listing as any);
    }
  }, [listing]);

  // Clear the success and error message after a delay.
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timerId = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000); // Clears the message after 3 seconds
      return () => clearTimeout(timerId); // Clear the timer if the component unmounts
    }
  }, [successMessage, errorMessage]);

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (['street_address', 'postal_code', 'city', 'country'].includes(name)) {
      setFormData((prevFormData: FormData) => ({ // Handling nested postal_address fields
        ...prevFormData,
        postal_address: {
          ...prevFormData.postal_address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData: FormData) => ({ // Handling other fields
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Handle mobile input changes
  const handleMobileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Validate phone number if the name is "contact_phone_number"
    if (name === 'contact_phone_number' && !value.match(/^\+[1-9]\d{1,14}$/)) {
      console.error('Invalid phone number format');
      return; // Exit the function if the phone number is invalid
    }
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  // Determine HTTP method
  const httpMethod = listingId ? 'PUT' : 'POST';

  // Build request URL
  const url = listingId ? `https://localhost:7044/listings/${listingId}` : 'https://localhost:7044/listings';

  // Submit form data
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(url, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form submission successful!', data);
        const action = listingId ? 'updated' : 'created';
        setSuccessMessage(`Listing has been successfully ${action}!`);
        setErrorMessage(null); // Clear error message on success
        // Reset the form data after successful submission (either creation or update).
        // Successfully created or updated, so refresh listings
        setRefresh(!refresh);
        setEditingListing(null); // Reset editing state
        setFormData(initialFormData);      
      })
      .catch((error) => {
        console.error('Form submission failed:', error);
        setErrorMessage('An error occurred while processing your request. Please try again later.');
      });
  };

  return (
    <>
      <form className={styles['listing-form']} onSubmit={submit}>
        <div className={styles['listing-form__card']}>
        <div className={styles['listing-form__input-group']}>
            <label htmlFor="bedrooms_count">Bedrooms:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="number"
              name="bedrooms_count"
              className={styles['listing-form__input-text']}
              value={formData.bedrooms_count}
              onChange={handleChange}  
              placeholder="Enter number of Bedrooms"
              required        
            />
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="building_type">Building type:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <select
              name="building_type"
              className={styles['listing-form__select']}
              value={formData.building_type}
              onChange={handleChange}
              required
            >
              <option value="none">Select Building</option>
              <option value="studio">Studio</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
            </select>
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="contact_phone_number">Contact Phone Number:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="contact_phone_number"
              className={styles['listing-form__input-text']}
              value={formData.contact_phone_number}
              onChange={handleMobileInputChange}   
              placeholder="+12345678901"
              required       
            />
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="description">Description:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="description"
              className={styles['listing-form__input-text']}
              value={formData.description}
              onChange={handleChange}      
              placeholder="Enter property description"
              required    
            />
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="latest_price_eur">Price:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="number"
              name="latest_price_eur"
              className={styles['listing-form__input-text']}
              value={formData.latest_price_eur}
              onChange={handleChange}
              placeholder="Enter price in EUR"
              required
            />
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="name">Name:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="name"
              className={styles['listing-form__input-text']}
              value={formData.name}
              onChange={handleChange}          
              placeholder="Enter property name"
              required
            />
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="street_address">Street address:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="street_address"
              className={styles['listing-form__input-text']}
              value={formData?.postal_address?.street_address}
              onChange={handleChange}
              placeholder="Enter street address"
              required
            />
          </div>        
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="postal_code">Postal Code:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="postal_code"
              className={styles['listing-form__input-text']}
              value={formData?.postal_address?.postal_code}
              onChange={handleChange}
              placeholder="Enter postal code"
              required
            />
          </div>  
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="city">City:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="text"
              name="city"
              className={styles['listing-form__input-text']}
              value={formData?.postal_address?.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>  
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="country">Country:
              <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <select
              name="country"
              id="country"
              className={styles['listing-form__input-text']}
              value={formData?.postal_address?.country}
              onChange={handleChange}
              required
            >
              <option value="none">Select Country</option>
              <option value="DE">Germany</option>
              <option value="US">USA</option>
              <option value="UK">England</option>
            </select>
          </div>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="rooms_count">Rooms:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="number"
              name="rooms_count"
              className={styles['listing-form__input-text']}
              value={formData.rooms_count}
              onChange={handleChange}          
              placeholder="Enter number of rooms"
              required
            />
          </div>       
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="surface_area_m2">Area:
            <span className={styles['listing-form__label--required']}>*</span>
            </label>
            <input
              type="number"
              name="surface_area_m2"
              className={styles['listing-form__input-text']}
              value={formData.surface_area_m2}
              onChange={handleChange}    
              placeholder="Enter surface area in m²"
              required      
            />
          </div>

          <button
            type="submit"
            className={styles['listing-form__button--submit']}
          >
            {listingId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
      {successMessage && <div className={styles['listing-form__success-message']}>{successMessage}</div>}
      {errorMessage && <div className={styles['listing-form__error-message']}>{errorMessage}</div>}
      </>
  );
};

export default ListingForm;
