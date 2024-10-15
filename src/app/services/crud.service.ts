/* 
Importing necessary Angular modules for the application:
นำเข้าโมดูล Angular ที่จำเป็นสำหรับแอปพลิเคชัน:

- Injectable: Decorator to define a service that can be injected.
- Inject: Function for injecting dependencies.
- PLATFORM_ID: Token representing the platform the app is running on.
- catchError: Operator for handling errors in observables.
- map: Operator for transforming data in observables.
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
- Observable: คลาสที่แสดงถึงสตรีมของข้อมูล
- throwError: ฟังก์ชันสำหรับสร้าง observable ที่ส่งออกข้อผิดพลาด
- HttpClient: บริการสำหรับทำคำขอ HTTP
- HttpHeaders: คลาสที่แสดงถึง HTTP headers
- HttpErrorResponse: คลาสสำหรับจัดการข้อผิดพลาด HTTP responses
- isPlatformBrowser: ฟังก์ชันยูทิลิตี้เพื่อตรวจสอบว่าแอปกำลังทำงานอยู่ในเบราว์เซอร์หรือไม่
*/
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
export class CrudService {
  // Base URL for the account REST API, used for fetching, creating, or updating account data
  // URL ของ REST API ที่ใช้สำหรับการทำงานเกี่ยวกับข้อมูลบัญชี (เช่น การดึงข้อมูล เพิ่ม ลบ หรือแก้ไขบัญชี)
  REST_API: string = 'http://localhost:8000/accounts';

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
    const API_URL = `${this.REST_API}/create-account`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Method to retrieve all accounts by sending a GET request to the API
  // เมธอดสำหรับดึงข้อมูลบัญชีทั้งหมดโดยการส่งคำขอ GET ไปยัง API
  getAccounts(): Observable<any> {
    const API_URL = `${this.REST_API}`;
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
    let API_URL = `${this.REST_API}/read-account/${accountId}`;
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
  - The 'pipe' method applies the 'catchError' operator to handle any errors during the request.

  - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางการอัปเดตของ REST API
  - ส่งคำขอ HTTP PUT พร้อมข้อมูลบัญชีที่อัปเดตโดยใช้ HttpClient
  - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้น
  */
  updateAccount(accountId: string, data: Account): Observable<any> {
    let API_URL = `${this.REST_API}/update-account/${accountId}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient
      .put(API_URL, data)
      .pipe(catchError(this.handleError));
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
    const API_URL = `${this.REST_API}/delete-account/${accountId}`;
    return this.httpClient.delete(API_URL).pipe(catchError(this.handleError));
  }

  // ►►► Transaction API Methods ◄◄◄
  // ►►► เมธอด API สำหรับจัดการธุรกรรม ◄◄◄

  /*
    Method to create a new transaction for a demo account:
    เมธอดสำหรับสร้างธุรกรรมใหม่สำหรับบัญชีเดโม:

    - This method constructs the API URL by appending the account ID to the create transaction route of the REST API.
    - It uses HttpClient's 'post' method to send transaction data along with the account ID to the server.
    - The 'pipe' method is used to apply the 'catchError' operator, which handles any errors that may occur during the request.

    - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางการสร้างธุรกรรมของ REST API
    - ใช้เมธอด 'post' ของ HttpClient เพื่อส่งข้อมูลธุรกรรมพร้อมกับ ID ของบัญชีไปยังเซิร์ฟเวอร์
    - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  createTransaction(data: Transaction, accountId: string): Observable<any> {
    const API_URL = `${this.REST_API}/create-transaction/${accountId}`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  /*
    Method to retrieve all transactions from all demo accounts:
    เมธอดสำหรับดึงข้อมูลธุรกรรมทั้งหมดจากบัญชีเดโมทั้งหมด:

    - This method first fetches all demo accounts by calling the 'getAccounts' method.
    - It uses the 'map' operator to iterate over the accounts and extract all transactions using the 'flatMap' function.
    - The 'catchError' operator is used to handle any errors that occur during the process.

    - เมธอดนี้ดึงบัญชีเดโมทั้งหมดโดยเรียกใช้เมธอด 'getAccounts'
    - ใช้โอเปอเรเตอร์ 'map' เพื่อวนลูปผ่านบัญชีและดึงข้อมูลธุรกรรมทั้งหมดด้วย 'flatMap'
    - ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการดำเนินการ
  */
  getTransactionsForAccounts(): Observable<Transaction[]> {
    return this.getAccounts().pipe(
      map((accounts: Account[]) =>
        accounts.flatMap((account) => account.transactions)
      ),
      catchError(this.handleError)
    );
  }

  /*
    Method to retrieve transactions for the current demo account by its ID:
    เมธอดสำหรับดึงข้อมูลธุรกรรมของบัญชีเดโมปัจจุบันโดยใช้ ID ของบัญชี:

    - This method constructs the API URL by appending the account ID to the REST API's route for reading account transactions.
    - It uses HttpClient's 'get' method to send an HTTP GET request to the server.
    - The 'map' operator processes the response, ensuring that an empty object is returned if the response is null.
    - The 'catchError' operator handles any errors that may occur during the request.

    - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางของ REST API สำหรับการดึงข้อมูลธุรกรรมของบัญชี
    - ใช้เมธอด 'get' ของ HttpClient เพื่อส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์
    - ใช้โอเปอเรเตอร์ 'map' เพื่อประมวลผลการตอบกลับ และคืนค่าเป็นออบเจ็กต์ว่างหากการตอบกลับเป็นค่าว่าง
    - ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  getTransactionsForCurrentAccount(accountId: string): Observable<any> {
    const API_URL = `${this.REST_API}/read-account-transactions/${accountId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  /*
    Method to retrieve a specific transaction for an account by account ID and transaction ID:
    เมธอดสำหรับดึงข้อมูลธุรกรรมเฉพาะของบัญชีโดยใช้ ID ของบัญชีและ ID ของธุรกรรม:

    - This method constructs the API URL by appending both the account ID and the transaction ID to the REST API's route for reading a specific transaction.
    - It uses HttpClient's 'get' method to send an HTTP GET request to the server.
    - The 'map' operator processes the response, ensuring that an empty object is returned if the response is null.
    - The 'catchError' operator handles any errors that may occur during the request.

    - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีและ ID ของธุรกรรมไปที่เส้นทางของ REST API สำหรับการดึงข้อมูลธุรกรรมเฉพาะ
    - ใช้เมธอด 'get' ของ HttpClient เพื่อส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์
    - ใช้โอเปอเรเตอร์ 'map' เพื่อประมวลผลการตอบกลับ และคืนค่าเป็นออบเจ็กต์ว่างหากการตอบกลับเป็นค่าว่าง
    - ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  getTransactionForAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API}/read-account-transaction/${accountId}/${transactionId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  /*
    Method to update a transaction for a specific account by its ID:
    เมธอดสำหรับอัปเดตธุรกรรมของบัญชีเฉพาะโดยใช้ ID ของธุรกรรมและบัญชี:

    - This method constructs the API URL using both the account ID and transaction ID.
    - It sends an HTTP PUT request to the server with the updated transaction data.
    - The 'catchError' operator is used to handle any errors that occur during the request.

    - เมธอดนี้สร้าง URL ของ API โดยใช้ทั้ง ID ของบัญชีและธุรกรรม
    - ใช้คำสั่ง PUT เพื่อส่งข้อมูลธุรกรรมที่อัปเดตไปยังเซิร์ฟเวอร์
    - ใช้โอเปอเรเตอร์ 'catchError' เพื่อจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  updateTransactionForAccount(
    data: Transaction,
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API}/update-account-transaction/${accountId}/${transactionId}`;

    return this.httpClient
      .put(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  /*
    Method to update the balance of a specific account:
    เมธอดสำหรับอัปเดตยอดคงเหลือของบัญชีเฉพาะ:

    - This method constructs the API URL by appending the account ID to the update balance route.
    - It sends an HTTP PUT request to the server with the new balance in the request body.
    - The response from the server will contain the result of the update operation.

    - เมธอดนี้สร้าง URL ของ API โดยเพิ่ม ID ของบัญชีไปที่เส้นทางอัปเดตยอดคงเหลือ
    - ส่งคำสั่ง PUT พร้อมยอดคงเหลือใหม่ใน body ของคำขอไปยังเซิร์ฟเวอร์
    - การตอบกลับจากเซิร์ฟเวอร์จะมีผลลัพธ์ของการอัปเดต
  */
  updateBalance(accountId: string, balance: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.REST_API}/update-balance/${accountId}`,
      { balance }
    );
  }

  /*
    Method to delete a specific transaction for an account:
    เมธอดสำหรับลบธุรกรรมเฉพาะของบัญชี:

    - This method constructs the API URL by appending both the account ID and transaction ID to the delete route.
    - It sends an HTTP DELETE request to the server to remove the specified transaction.
    - The 'catchError' operator is applied to handle any errors that may occur during the request.

    - เมธอดนี้สร้าง URL ของ API โดยเพิ่มทั้ง ID ของบัญชีและ ID ของธุรกรรมไปที่เส้นทางการลบ
    - ส่งคำขอ HTTP DELETE ไปยังเซิร์ฟเวอร์เพื่อลบธุรกรรมที่ระบุ
    - ใช้โอเปอเรเตอร์ 'catchError' เพื่อจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  deleteTransactionForAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API}/delete-account-transaction/${accountId}/${transactionId}`;

    return this.httpClient.delete(API_URL).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // Method to handle errors from HTTP requests
  // เมธอดสำหรับจัดการข้อผิดพลาดจากคำขอ HTTP
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (isPlatformBrowser(this.platformId)) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      alert(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error('An unknown error occurred.'));
  }
}
