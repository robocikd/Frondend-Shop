import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from './model/cartProduct';
import { CartSummary } from './model/cartSummary';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(id: number): Observable<CartSummary> {
    return this.http.get<CartSummary>('/api/carts/' + id);
  }

  addToCart(id: number, cartItem: any): Observable<CartSummary> {
    return this.http.put<CartSummary>('/api/carts/' + id, cartItem);
  }
}
