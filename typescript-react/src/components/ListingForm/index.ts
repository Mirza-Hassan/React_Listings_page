export { default } from './ListingForm';

export interface Listing {
    id: string;
    latest_price_eur: number;
    building_type: string;
    surface_area_m2: string;
    rooms_count: number;
    postal_address: {
      city: string;
      country: string;
      postal_code: string;
      street_address: string;
    };
    description: string;
    updated_date: string;
  }
  
export  interface ListingFormProps {
    listing: Listing | null;
    refresh: boolean;
    setRefresh: (value: boolean) => void;
    setEditingListing: (listing: Listing | null) => void;
  }
  
export type FormData = {
  building_type: string;
  bedrooms_count: string;
  contact_phone_number: string;
  description: string;
  latest_price_eur: string;
  name: string;
  postal_address: {
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
  };
  rooms_count: string;
  surface_area_m2: string;
};