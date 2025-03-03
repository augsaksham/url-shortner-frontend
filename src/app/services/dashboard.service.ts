import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  shortenUrl(originalUrl: string, expiresInDays: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/urls/shorten`, {
      original_url: originalUrl,
      expires_in_days: expiresInDays
    }, { headers: this.getHeaders() });
  }

  getUrlInfo(shortCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/urls/info/${shortCode}`, 
      { headers: this.getHeaders() });
  }

  getUserUrls(skip: number = 0, limit: number = 100): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/urls/urls/me?skip=${skip}&limit=${limit}`,
      { headers: this.getHeaders() }
    );
  }
}
