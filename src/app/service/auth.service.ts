import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth'; // URL ของ API

  constructor(private http: HttpClient) { }

  // ฟังก์ชันสำหรับการลงทะเบียน
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ฟังก์ชันสำหรับการล็อกอิน
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
