import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private baseUrl = 'https://bandobasta.onrender.com/bandobasta/api/v1/venue';
  //private baseUrl = '/bandobasta/api/v1/venue';

  constructor(private http: HttpClient) {}

  // Fetch paginated venues
  getVenues(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      
    return this.http.get<any>(`${this.baseUrl}/findAll`, { params });
  }
}
