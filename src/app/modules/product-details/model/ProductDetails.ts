import { Review } from './review';

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  price: string;
  currency: string;
  image: string;
  slug: string;
  reviews: Array<Review>;
}
