import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-category-form',
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
        placeholder="Podaj opis kategorii"
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
export class AdminCategoryFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get name() {
    return this.parentForm.get('name');
  }
  get description() {
    return this.parentForm.get('description');
  }

  get slug() {
    return this.parentForm.get('slug');
  }
}
