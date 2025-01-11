import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodCategoryService {
  private baseUrl = 'https://bandobasta.onrender.com/bandobasta/api/v1/food/category';

  constructor(private http: HttpClient) {}

  addFoodCategories(venueId: number, categories: any[]): Observable<any> {
    const url = `${this.baseUrl}/venue/${venueId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, categories, { headers });
  }
}
