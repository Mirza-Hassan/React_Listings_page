export { default } from './Listings';

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