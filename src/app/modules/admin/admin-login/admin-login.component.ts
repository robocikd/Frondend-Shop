import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from './admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formGroup!: FormGroup;
  loginError = false;
  constructor(private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.adminLoginService.login(this.formGroup.value)
        .subscribe({
          next: () => this.loginError = false,
          error: () => this.loginError = true,
        });
    }
  }

  get username() {
    return this.formGroup.get("username");
  }
  get password() {
    return this.formGroup.get("password");
  }
}
