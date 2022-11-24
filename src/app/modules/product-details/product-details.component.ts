import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from './model/ProductDetails';
import { ProductDetailsService } from './product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: ProductDetails;

  constructor(
    private productDetailsService: ProductDetailsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug'];
    return this.productDetailsService
      .getProductDetails(slug)
      .subscribe((product) => (this.product = product));
  }
}
