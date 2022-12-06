import { OrderSummary } from './model/orderSummary';
import { OrderDto } from './orderDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartSummary } from './../common/model/cart/cartSummary';
import { OrderService } from './order.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cartSummary!: CartSummary;
  formGroup!: FormGroup;
  orderSummary!: OrderSummary;
  private statuses = new Map<string, string>([['NEW', 'NOWE']]);
  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkedCartEmpty();
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  checkedCartEmpty() {
    let cartId = Number(this.cookieService.get('cartId'));
    this.orderService
      .getCart(cartId)
      .subscribe((summary) => (this.cartSummary = summary));
  }

  submit() {
    if (this.formGroup.valid) {
      this.orderService
        .placeOrder({
          firstname: this.formGroup.get('firstname')?.value,
          lastname: this.formGroup.get('lastname')?.value,
          street: this.formGroup.get('street')?.value,
          zipcode: this.formGroup.get('zipcode')?.value,
          city: this.formGroup.get('city')?.value,
          email: this.formGroup.get('email')?.value,
          phone: this.formGroup.get('phone')?.value,
          cartId: Number(this.cookieService.get('cartId')),
        } as OrderDto)
        .subscribe((orderSummary) => {
          this.orderSummary = orderSummary;
          this.cookieService.delete('cartId');
        });
    }
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  get firstname() {
    return this.formGroup.get('firstname');
  }
  get lastname() {
    return this.formGroup.get('lastname');
  }
  get street() {
    return this.formGroup.get('street');
  }
  get zipcode() {
    return this.formGroup.get('zipcode');
  }
  get city() {
    return this.formGroup.get('city');
  }
  get email() {
    return this.formGroup.get('email');
  }
  get phone() {
    return this.formGroup.get('phone');
  }
}
