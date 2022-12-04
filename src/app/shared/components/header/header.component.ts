import { CartIconService } from './../../../modules/common/service/cart-icon.service';
import { HeaderService } from './header.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = 'Shop';
  cartProductCounter = '';

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService
  ) {}

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subjectIcon.subscribe(
      (counter) =>
        (this.cartProductCounter = String(counter > 0 ? counter : ''))
    );
  }

  getCountProducts() {
    this.headerService
      .getCountProducts(Number(this.cookieService.get('cartId')))
      .subscribe(
        (counter) =>
          (this.cartProductCounter = String(counter > 0 ? counter : ''))
      );
  }
}
