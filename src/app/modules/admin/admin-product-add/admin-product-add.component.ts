import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminMessageService } from '../admin-message.service';
import { AdminProductAddService } from './admin-product-add.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss'],
})
export class AdminProductAddComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN'],
    });
  }
  submit() {
    this.adminProductAddService
      .saveNewProduct(this.productForm.value)
      .subscribe({
        next: (product) => {
          this.router
            .navigate(['/admin/products/update/', product.id])
            .then(() =>
              this.snackBar.open('Produkt został dodany', '', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              })
            );
        },
        error: (err) => this.adminMessageService.addSpringErrors(err.error),
      });
  }
}
