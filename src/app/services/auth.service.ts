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
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private tokenKey = 'jwt_token';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    //const url = `${this.baseUrl}/user/authenticate/login`;
    
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
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
