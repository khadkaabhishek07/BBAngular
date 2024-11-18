import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const excludedUrls = [
      '/bandobasta/api/v1/user/authenticate/login', // Login API endpoint
    ];

    // Check if the request URL matches any of the excluded URLs
    if (excludedUrls.some(url => request.url.includes(url))) {
      // Skip adding the Authorization header
      return next.handle(request);
    }

    // Add Authorization header for other requests
    if (token) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
