export { default } from './PriceHistoryCard';

export interface PriceHistoryCardProps {
    listingId: number;
  }
  
export interface PriceHistory {
  created_date: string;
  latest_price_eur: number;
}
