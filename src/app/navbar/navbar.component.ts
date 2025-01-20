import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarOpen = false; // Sidebar state

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
