import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

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

  // ฟังก์ชันสำหรับสร้าง HTTP headers
  public createHttpHeaders(includeToken: boolean = false): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (includeToken) {
      const token = this.getToken();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
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
      .post(apiUrl, credentials, {
        headers: this.createHttpHeaders(),
        responseType: 'json', // เปลี่ยนเป็น 'json' ถ้า response มีข้อมูล JSON
      })
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          const token = response.token || response.data.token; // ดึง token ออกมาให้ถูกต้อง
          if (token) {
            this.storeToken(token); // จัดเก็บ token ใน Local Storage
            this.storeUser(credentials.username); // จัดเก็บชื่อผู้ใช้ใน Local Storage
            console.log(token);
          } else {
            console.error('Token is undefined');
          }
        })
      );
  }

  // Functions for PIN login
  // ฟังก์ชันสำหรับการล็อกอินแบบพิน
  loginPin(credentials: any): Observable<any> {
    let apiUrl = `${this.restApi}/loginPin`;
    return this.http
      .post(apiUrl, credentials, {
        headers: this.createHttpHeaders(),
        responseType: 'json', // เปลี่ยนเป็น 'json' ถ้า response มีข้อมูล JSON
      })
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          const token = response.token || response.data.token; // ดึง token ออกมาให้ถูกต้อง
          if (token) {
            this.storeToken(token); // จัดเก็บ token ใน Local Storage
            this.storeUser(credentials.username); // จัดเก็บชื่อผู้ใช้ใน Local Storage
            console.log(token);
          } else {
            console.error('Token is undefined');
          }
        })
      );
  }

  // ฟังก์ชันสำหรับจัดเก็บ JWT ใน Local Storage
  private storeToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  // ฟังก์ชันเพื่อตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('jwt'); // ตรวจสอบว่ามี JWT ใน Local Storage หรือไม่
    }
    return false; // หรือค่าเริ่มต้นอื่น ๆ ตามต้องการ
  }

  // ฟังก์ชันสำหรับออกจากระบบ
  logout(): void {
    localStorage.removeItem('jwt'); // ลบ JWT ออกจาก Local Storage
    localStorage.removeItem('username'); // ลบ JWT ออกจาก Local Storage
    localStorage.removeItem('hasRefreshed');
  }

  // ฟังก์ชันสำหรับดึง JWT จาก Local Storage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt'); // คืนค่า JWT ที่จัดเก็บใน Local Storage
    }
    return null;
  }

  // ฟังก์ชันดึงชื่อผู้ใช้
  getUsername(): string | null {
    return localStorage.getItem('username'); // คืนค่าชื่อผู้ใช้
  }

  private storeUser(user: string) {
    localStorage.setItem('username', user); // จัดเก็บชื่อผู้ใช้
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
