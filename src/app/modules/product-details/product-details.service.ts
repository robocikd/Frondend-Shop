import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from './model/ProductDetails';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>('/api/products/' + slug);
  }
}
