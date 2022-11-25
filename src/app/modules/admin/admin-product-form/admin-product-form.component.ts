import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  template: `<div [formGroup]="parentForm" fxLayout="column">
    <mat-form-field appearance="fill">
      <mat-label> Nazwa </mat-label>
      <input
        matInput
        placeholder="Podaj nazę produktu"
        formControlName="name"
      />
      <div
        *ngIf="name?.invalid && (name?.dirty || name?.touched)"
        class="errorMessage"
      >
        <div *ngIf="name?.errors?.['required']">
          <p>Nazwa jest wymagana</p>
        </div>
        <div *ngIf="name?.errors?.['minlength']">
          <p>Nazwa musi mieć przynajmniej 4 znaki</p>
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Przyjazny url</mat-label>
      <input matInput placeholder="Podaj url" formControlName="slug" />
      <div
        *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)"
        class="errorMessage"
      >
        <div *ngIf="slug?.errors?.['required']">
          <p>Url jest wymagany</p>
        </div>
        <div *ngIf="slug?.errors?.['minlength']">
          <p>Url musi mieć przynajmniej 4 znaki</p>
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label> Opis </mat-label>
      <textarea
        matInput
        rows="10"
        placeholder="Podaj opis produktu"
        formControlName="description"
      ></textarea>
      <div
        *ngIf="
          description?.invalid && (description?.dirty || description?.touched)
        "
        class="errorMessage"
      >
        <div *ngIf="description?.errors?.['required']">
          <p>Opis jest wymagany</p>
        </div>
        <div *ngIf="description?.errors?.['minlength']">
          <p>Opis musi mieć przynajmniej 4 znaki</p>
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label> Pełny opis </mat-label>
      <textarea
        matInput
        rows="20"
        placeholder="Podaj pełny opis produktu"
        formControlName="fullDescription"
      ></textarea>
      <div
        *ngIf="
        fullDescription?.invalid && (fullDescription?.dirty || fullDescription?.touched)
        "
        class="errorMessage"
      >
        <div *ngIf="fullDescription?.errors?.['required']">
          <p>Pełny opis jest wymagany</p>
        </div>
        <div *ngIf="fullDescription?.errors?.['minlength']">
          <p>Pełny opis musi mieć przynajmniej 4 znaki</p>
        </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label> Kategoria </mat-label>
      <input
        matInput
        placeholder="Podaj kategorię produktu"
        formControlName="category"
      />
      <div
        *ngIf="category?.invalid && (category?.dirty || category?.touched)"
        class="errorMessage"
      >
        <div *ngIf="category?.errors?.['required']">
          <p>Kategoria jest wymagana</p>
        </div>
        <div *ngIf="category?.errors?.['minlength']">
          <p>Kategoria musi mieć przynajmniej 4 znaki</p>
        </div>
      </div>
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label> Cena </mat-label>
      <input
        matInput
        placeholder="Podaj cenę produktu"
        formControlName="price"
      />
      <div
        *ngIf="price?.invalid && (price?.dirty || price?.touched)"
        class="errorMessage"
      >
        <div *ngIf="price?.errors?.['required']">
          <p>Cena jest wymagana</p>
        </div>
        <div *ngIf="price?.errors?.['min']">
          <p>Cena nie może być ujemna</p>
        </div>
        <div *ngIf="price?.errors?.['pattern']">
          <p>Cena musi mieć poprawny format np. 11.22</p>
        </div>
      </div>
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label> Waluta </mat-label>
      <input matInput placeholder="Podaj walutę" formControlName="currency" />
      <div
        *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)"
        class="errorMessage"
      >
        <div *ngIf="currency?.errors?.['required']">
          <p>Waluta jest wymagana</p>
        </div>
      </div>
    </mat-form-field>
    <div fxLayoutAlign="end">
      <button mat-flat-button color="primary" [disabled]="!parentForm.valid">
        Zapisz
      </button>
    </div>
  </div>`,
  styles: [
    `
      .errorMessage {
        font-size: 12px;
        color: red;
      }
    `,
  ],
})
export class AdminProductFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  ngOnInit(): void {}

  get name() {
    return this.parentForm.get('name');
  }
  get description() {
    return this.parentForm.get('description');
  }
  get fullDescription() {
    return this.parentForm.get('fullDescription');
  }
  get category() {
    return this.parentForm.get('category');
  }
  get price() {
    return this.parentForm.get('price');
  }
  get currency() {
    return this.parentForm.get('currency');
  }
  get slug() {
    return this.parentForm.get('slug');
  }
}
