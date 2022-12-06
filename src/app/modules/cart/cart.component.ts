import { CartIconService } from './../common/service/cart-icon.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from './cart.service';
import { Location } from '@angular/common';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartSummaryItem } from '../common/model/cart/cartSummaryItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  summary!: CartSummary;
  formGroup!: FormGroup;
  private isProductAdded = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let productId = Number(
      this.activatedRoute.snapshot.queryParams['productId']
    );
    if (productId > 0) {
      this.isProductAdded = true;
      this.addToCart(productId);
    } else {
      this.isProductAdded = false;
      this.getCart();
    }
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([]),
    });
  }

  getCart() {
    let cartId = Number(this.cookieService.get('cartId'));
    if (cartId > 0) {
      this.cartService.getCart(cartId).subscribe((summary) => {
        this.summary = summary;
        this.patchFormItems();
        this.cartIconService.cartChange(summary.items.length);
      });
    }
  }

  addToCart(id: Number) {
    let cartId = Number(this.cookieService.get('cartId'));
    this.cartService
      .addToCart(cartId, { productId: id, quantity: 1 })
      .subscribe((summary) => {
        this.summary = summary;
        this.patchFormItems();
        this.cartIconService.cartChange(summary.items.length);
        this.cookieService.delete('cartId');
        this.cookieService.set(
          'cartId',
          summary.id.toString(),
          this.expiresDays(3)
        );
        this.router.navigate(['/cart']);
      });
  }

  patchFormItems() {
    let formItems = <FormArray>this.formGroup.get('items');
    this.summary.items.forEach((item) => {
      formItems.push(
        this.formBuilder.group({
          id: [item.id],
          quantity: [item.quantity],
          product: [item.product],
          lineValue: [item.lineValue],
        })
      );
    });
  }

  expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  submit() {
    let cartId = Number(this.cookieService.get('cartId'));
    this.cartService
      .updateCart(cartId, this.mapToRequestListDto())
      .subscribe((summary) => {
        this.summary = summary;
        this.formGroup.get('items')?.setValue(summary.items);
      });
  }
  mapToRequestListDto(): any[] {
    let items: Array<CartSummaryItem> = this.formGroup.get('items')?.value;
    return items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
  }

  deleteItem(itemId: number) {
    this.cartService.deleteCartItem(itemId).subscribe(() => {
      this.ngOnInit();
    });
  }

  back() {
    this.location.historyGo(this.isProductAdded ? -2 : -1);
  }

  get items() {
    return (<FormArray>this.formGroup.get('items')).controls;
  }
}
