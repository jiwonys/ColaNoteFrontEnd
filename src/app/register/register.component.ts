import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    this.http.post('http://localhost:8080/api/v1/auth/register', body)
      .subscribe(() => {
      alert("Registeration Successful!")
        // Registration successful, redirect to login page
        this.router.navigate(['/authenticate']);
      }, (error: any) => {
      alert("registeration failed, please populate all fields");
        console.error('Registration failed:', error);
        // Handle registration error, e.g., display error message to the user
      });
  }
}
