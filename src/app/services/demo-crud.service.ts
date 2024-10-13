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

  // Method to retrieve all accounts by sending a GET request to the API
  // เมธอดสำหรับดึงข้อมูลบัญชีทั้งหมดโดยการส่งคำขอ GET ไปยัง API
  getAccounts(): Observable<any> {
    const API_URL = `${this.REST_API_DEMO_ACCOUNT}`;
    return this.httpClient.get(API_URL).pipe(catchError(this.handleError));
  }

  /*
  Method to retrieve a demo account by its ID:
  เมธอดสำหรับดึงข้อมูลบัญชีเดโมโดยใช้ ID ของบัญชี:

  - This method constructs the API URL by appending the account ID to the REST API's read route.
  - It uses HttpClient's 'get' method to send an HTTP GET request to the server.
  - The 'pipe' method is used to transform the response with the 'map' operator, ensuring an empty object is returned if no data is found.
  - The 'catchError' operator handles any errors that may occur during the request.

  - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางการดึงข้อมูลของ REST API
  - ใช้เมธอด 'get' ของ HttpClient เพื่อส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์
  - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'map' ในการแปลงข้อมูล และคืนค่าเป็นวัตถุว่างเปล่าในกรณีที่ไม่พบข้อมูล
  - ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  getAccount(accountId: string): Observable<any> {
    let API_URL = `${this.REST_API_DEMO_ACCOUNT}/read-account/${accountId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  /*
  Method to update a demo account by its ID:
  เมธอดสำหรับอัปเดตบัญชีเดโมโดยใช้ ID ของบัญชี:

  - This method constructs the API URL by appending the account ID to the REST API's update route.
  - It sends an HTTP PUT request with the updated account data using HttpClient.
  - The 'tap' operator is used to log the server's response.
  - The 'pipe' method applies the 'catchError' operator to handle any errors during the request.

  - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางการอัปเดตของ REST API
  - ส่งคำขอ HTTP PUT พร้อมข้อมูลบัญชีที่อัปเดตโดยใช้ HttpClient
  - ใช้โอเปอเรเตอร์ 'tap' ในการบันทึกการตอบกลับจากเซิร์ฟเวอร์
  - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้น
  */
  updateAccount(accountId: string, data: Account): Observable<any> {
    let API_URL = `${this.REST_API_DEMO_ACCOUNT}/update-account/${accountId}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient.put(API_URL, data).pipe(
      tap((response) => {
        console.log('Response from update account:', response);
      }),
      catchError(this.handleError)
    );
  }

  /*
  Method to delete a demo account by its ID:
  เมธอดสำหรับลบบัญชีเดโมโดยใช้ ID ของบัญชี:

  - This method constructs the API URL by appending the account ID to the REST API's delete route.
  - It uses HttpClient's 'delete' method to send an HTTP DELETE request to the server.
  - The 'pipe' method is used to apply the 'catchError' operator, which handles any errors that may occur during the request.

  - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางการลบบัญชีของ REST API
  - ใช้เมธอด 'delete' ของ HttpClient เพื่อส่งคำขอ HTTP DELETE ไปยังเซิร์ฟเวอร์
  - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  deleteAccount(accountId: string): Observable<any> {
    const API_URL = `${this.REST_API_DEMO_ACCOUNT}/delete-account/${accountId}`;
    return this.httpClient.delete(API_URL).pipe(catchError(this.handleError));
  }

  // ►►► Transaction API Methods ◄◄◄
  // ►►► เมธอด API สำหรับจัดการธุรกรรม ◄◄◄

  createTransaction(data: Transaction, accountId: string): Observable<any> {
    const API_URL = `${this.REST_API_DEMO_ACCOUNT}/create-transaction/${accountId}`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  //
  getTransactionsForAccounts(): Observable<Transaction[]> {
    return this.getAccounts().pipe(
      map((accounts: Account[]) =>
        accounts.flatMap((account) => account.transactions)
      ),
      catchError(this.handleError)
    );
  }

  //
  getTransactionsForCurrentAccount(accountId: string): Observable<any> {
    const API_URL = `${this.REST_API_DEMO_ACCOUNT}/read-account-transactions/${accountId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  getTransactionForAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_DEMO_ACCOUNT}/read-account-transaction/${accountId}/${transactionId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  updateTransactionForAccount(
    data: Transaction,
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_DEMO_ACCOUNT}/update-account-transaction/${accountId}/${transactionId}`;

    // ทำการ PUT โดยส่งข้อมูลของ transaction และ headers ไปยัง API
    return this.httpClient.put(API_URL, data).pipe(
      tap((response) => {
        console.log('Response from update transaction of account:', response);
      }), // ใช้ tap เพื่อตรวจสอบ response ที่ได้รับ
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // Update balance
  updateBalance(accountId: string, balance: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.REST_API_DEMO_ACCOUNT}/update-balance/${accountId}`,
      { balance }
    );
  }

  //Delete transaction for account
  deleteTransactionForAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_DEMO_ACCOUNT}/delete-account-transaction/${accountId}/${transactionId}`;

    // ทำการ DELETE
    return this.httpClient.delete(API_URL).pipe(
      tap((response) => {
        console.log('Deleted transaction of account:', response);
      }), // ใช้ tap เพื่อตรวจสอบ response ที่ได้รับ
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
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
