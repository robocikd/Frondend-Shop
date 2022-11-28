import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from './model/ProductDetails';
import { Review } from './model/review';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>('/api/products/' + slug);
  }

  saveProductReview(review: Review): Observable<Review> {
    return this.http.post<Review>('/api/reviews', review);
  }
}
