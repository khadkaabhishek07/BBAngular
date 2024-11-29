import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  code: string;
  message: string;
  data: {
    username: string;
    id: string;
    type: string;
    accessToken: string;
    roles: string[]; // Added roles
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private tokenKey = 'jwt_token';
  private rolesKey = 'user_roles';
  private user = 'user_name';
  private userIdKey = 'user_id'; // Key to store user ID locally


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `https://bandobasta.onrender.com/bandobasta/api/v1/user/authenticate/login`;
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    return this.http.post<LoginResponse>(url, body, { headers }).pipe(
      tap(response => {
        if (response.data && response.data.accessToken) {
          localStorage.setItem(this.tokenKey, response.data.accessToken);
        }
        if (response.data && response.data.roles) {
          localStorage.setItem(this.rolesKey, JSON.stringify(response.data.roles));
        }
        if (response.data && response.data.id) {
          localStorage.setItem(this.userIdKey, response.data.id); // Store user ID
        }
        if (response.data && response.data.username) {
          localStorage.setItem(this.user, response.data.username); // Store user name
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.user);
  }

  getRoles(): string[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }

  isOwner(): boolean {
    return this.getRoles().includes('ROLE_OWNER');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    localStorage.removeItem(this.userIdKey);
  }
}
