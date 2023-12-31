import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private apiUrl = environment.apiurl;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { email: this.email, password: this.password };
    this.http.post(`${this.apiUrl}` + '/api/v1/auth/authenticate', body)
      .subscribe((response: any) => {
        // Assuming the API returns a token upon successful authentication
        const token = response.token;
        // Store the token in local storage or a cookie for future API requests
        localStorage.setItem('token', token);
        // Redirect to the desired page after successful login
        this.router.navigate(['/board']);
      }, (error: any) => {
        console.error('Login failed:', error);
        alert("login has failed, please check your credentials");
        // Handle login error, e.g., display error message to the user
      });
  }
}
