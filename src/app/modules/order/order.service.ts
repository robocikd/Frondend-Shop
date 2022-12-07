import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartCommonService } from '../common/service/cart-common.service';
import { InitData } from './model/initData';
import { OrderSummary } from './model/orderSummary';
import { OrderDto } from './orderDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private cartCommonService: CartCommonService,
    private http: HttpClient
  ) {}

  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id);
  }

  placeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>('/api/orders', order);
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>('/api/orders/initData');
  }
}
