import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        this.message = 'Success! Logged in as ' + response.data.username;
        // Redirect to a new page
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.message = 'Login failed. Please check your credentials.';
      }
    });
  }
}
