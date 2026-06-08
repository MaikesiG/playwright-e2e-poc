import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = '';
  passwordError = '';
  loginError = '';
  loginSuccess = '';

  constructor(private router: Router) {}

  submit() {
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';
    this.loginSuccess = '';
    let valid = true;

    if (!this.email) {
      this.emailError = 'Email is required';
      valid = false;
    } else if (!this.email.includes('@')) {
      this.emailError = 'Invalid email format';
      valid = false;
    }
    if (!this.password) {
      this.passwordError = 'Password is required';
      valid = false;
    }
    if (!valid) return;

    if (this.email === 'admin@test.com' && this.password === 'password123') {
      this.loginSuccess = 'Login successful! Redirecting...';
      setTimeout(() => this.router.navigate(['/products']), 1000);
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
