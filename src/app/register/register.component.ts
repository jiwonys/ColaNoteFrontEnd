import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  private apiUrl = environment.apiurl;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // Check email format
    if (!this.isValidEmail()) {
      alert('Invalid Email format!');
      return;
    }

    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.http.post(`${this.apiUrl}/api/v1/auth/register`, body)
      .subscribe(() => {
        alert('Registration Successful!');
        // Registration successful, redirect to login page
        this.router.navigate(['/authenticate']);
      }, (error: any) => {
        alert('Registration failed, please populate all fields');
        console.error('Registration failed:', error);
        // Handle registration error, e.g., display error message to the user
      });
  }

  private isValidEmail(): boolean {
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
