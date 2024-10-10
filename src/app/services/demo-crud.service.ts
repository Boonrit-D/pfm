/* 
Importing necessary Angular modules for the application:
นำเข้าโมดูล Angular ที่จำเป็นสำหรับแอปพลิเคชัน:

- Injectable: Decorator to define a service that can be injected.
- Inject: Function for injecting dependencies.
- PLATFORM_ID: Token representing the platform the app is running on.
- catchError: Operator for handling errors in observables.
- map: Operator for transforming data in observables.
- tap: Operator for performing side effects in observables.
- Observable: Class representing a stream of data.
- throwError: Function for creating an observable that emits an error.
- HttpClient: Service for making HTTP requests.
- HttpHeaders: Class representing HTTP headers.
- HttpErrorResponse: Class for handling HTTP error responses.
- isPlatformBrowser: Utility function to check if the app is running in a browser.

- Injectable: เดคอเรเตอร์สำหรับกำหนดบริการที่สามารถถูกฉีดเข้าไป
- Inject: ฟังก์ชันสำหรับการฉีดพึ่งพา
- PLATFORM_ID: โทเคนที่แสดงถึงแพลตฟอร์มที่แอปกำลังทำงานอยู่
- catchError: โอเปอเรเตอร์สำหรับจัดการข้อผิดพลาดใน observable
- map: โอเปอเรเตอร์สำหรับแปลงข้อมูลใน observable
- tap: โอเปอเรเตอร์สำหรับทำผลข้างเคียงใน observable
- Observable: คลาสที่แสดงถึงสตรีมของข้อมูล
- throwError: ฟังก์ชันสำหรับสร้าง observable ที่ส่งออกข้อผิดพลาด
- HttpClient: บริการสำหรับทำคำขอ HTTP
- HttpHeaders: คลาสที่แสดงถึง HTTP headers
- HttpErrorResponse: คลาสสำหรับจัดการข้อผิดพลาด HTTP responses
- isPlatformBrowser: ฟังก์ชันยูทิลิตี้เพื่อตรวจสอบว่าแอปกำลังทำงานอยู่ในเบราว์เซอร์หรือไม่
*/
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

// Interface representing a user account with details such as account name, currency, balance, and associated transactions.
// อินเทอร์เฟซที่แสดงบัญชีผู้ใช้พร้อมรายละเอียดเช่น ชื่อบัญชี สกุลเงิน ยอดคงเหลือ และธุรกรรมที่เกี่ยวข้อง
export interface Account {
  id: string;
  accountName: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
}
// Interface representing an account transaction with details such as transaction ID, category, amount, description, and date.
// อินเทอร์เฟซที่แสดงธุรกรรมบัญชีพร้อมรายละเอียด เช่น รหัสธุรกรรม หมวดหมู่ จำนวนเงิน คำอธิบาย และวันที่
export interface Transaction {
  transactionId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DemoCrudService {
  // Base URL for the account REST API, used for fetching, creating, or updating account data
  // URL ของ REST API ที่ใช้สำหรับการทำงานเกี่ยวกับข้อมูลบัญชี (เช่น การดึงข้อมูล เพิ่ม ลบ หรือแก้ไขบัญชี)
  REST_API_DEMO_ACCOUNT: string = 'http://localhost:8000/demo';

  // Creating HTTP headers with 'Content-Type' set to 'application/json'
  // การสร้างส่วนหลักของการร้องขอและการตอบกลับโดยกำหนดรูปแบบของเนื้อหาเป็นแบบเจสัน
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // Constructor for the class, injecting HttpClient for making HTTP requests 
  // คอนสตรักเตอร์สำหรับคลาสนี้ใช้ในการฉีด HttpClient เพื่อทำการส่งคำขอ HTTP
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ►►► Account API Methods ◄◄◄
  // ►►► เมธอด API สำหรับจัดการบัญชี ◄◄◄

  // Method to create a new account by sending a POST request to the API
  // เมธอดสำหรับสร้างบัญชีใหม่โดยการส่งคำขอ POST ไปยัง API
  createAccount(data: Account): Observable<any> {
    const API_URL = `${this.REST_API_DEMO_ACCOUNT}/create-account`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Method to handle errors from HTTP requests
  // เมธอดสำหรับจัดการข้อผิดพลาดจากคำขอ HTTP
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
  
    if (isPlatformBrowser(this.platformId)) {
      if (error.error instanceof ErrorEvent) {
        // Handle client error
        errorMessage = error.error.message;
      } else {
        // Handle server error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      alert(errorMessage); // alert
      return throwError(() => new Error(errorMessage));
    }
  
    // Handle server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error('An unknown error occurred.'));
  }
}
