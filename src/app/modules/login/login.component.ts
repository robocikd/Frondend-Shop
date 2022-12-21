import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../common/service/jwt.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly REDIRECT_ROUTE = "/profile";

  loginForm!: FormGroup;
  loginError = false;
  registrationForm!: FormGroup;
  registrationError = false;
  registrationErrorMsg = "";
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit(): void {

    if (this.jwtService.isLoggedIn()) {
      this.router.navigate([this.REDIRECT_ROUTE]);
    }
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    this.registrationForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      repeatPassword: ["", Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.router.navigate([this.REDIRECT_ROUTE]);
            this.loginError = false;
          },
          error: () => this.loginError = true
        });
    }
  }

  register() {
    if (this.registrationForm.valid && this.isPasswordIdentical(this.registrationForm.value)) {
      this.loginService.register(this.registrationForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.router.navigate([this.REDIRECT_ROUTE]);
          },
          error: err => {
            this.registrationError = true;
            if (err.error.message) {
              this.registrationError = err.error.message;
            } else {
              this.registrationErrorMsg = "Coś poszło nie tak, spróbuj później";
            }
          }
        });
    }
  }

  private isPasswordIdentical(reg: any): boolean {
    if (reg.password === reg.repeatPassword) {
      this.registrationError = false;
      return true;
    }
    this.registrationError = true;
    this.registrationErrorMsg = "Hasła nie są idetyczne";
    return false;
  }
}
