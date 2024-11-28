import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private baseUrl = 'https://bandobasta.onrender.com/bandobasta/api/v1/hall';

  constructor(private http: HttpClient) {}

  getHallsByVenue(venueId: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('venueId', venueId)
      .set('page', page.toString());

    return this.http.get<any>(`${this.baseUrl}/findAll`, { params });
  }
}
