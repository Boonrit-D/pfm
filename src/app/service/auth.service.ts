import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private restApi = 'http://localhost:8000/auth'; // URL ของ API

  /*
  English: 
  Set HTTP headers for the request by setting 'Content-Type' to 'application/json'
  to inform the server that the data being sent is in JSON format.

  ภาษาไทย:
  กำหนด HTTP headers สำหรับคำขอ โดยตั้งค่า 'Content-Type' เป็น 'application/json'
  เพื่อบอกให้ server รู้ว่าข้อมูลที่ส่งไปเป็นรูปแบบ JSON
  */
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  // Functions for registration
  // ฟังก์ชันสำหรับการลงทะเบียน
  register(user: User): Observable<any> {
    let apiUrl = `${this.restApi}/register`;
    return this.http
      .post(apiUrl, user, { headers: this.httpHeaders, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }
  // Functions for login
  // ฟังก์ชันสำหรับการล็อกอิน
  login(credentials: any): Observable<any> {
    let apiUrl = `${this.restApi}/login`;
    return this.http
    .post(apiUrl, credentials, { headers: this.httpHeaders, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Function to handle errors that occur during API calls
  // ฟังก์ชันสำหรับจัดการข้อผิดพลาดที่เกิดขึ้นจากการเรียก API
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      // ข้อผิดพลาดจากฝั่งผู้ใช้
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      // ข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Return the error message to the caller
    // ส่งข้อผิดพลาดกลับไปยังผู้เรียกใช้
    return throwError(() => new Error(errorMessage));
  }
}
