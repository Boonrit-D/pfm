import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

// Transaction version 1 model
export class Transaction {
  _id!: string;
  title!: string;
  type!: string;
  amount!: string;
}

// Transaction version 2 model
export class TransactionV2 {
  _id!: string;
  date!: string;
  type!: string;
  amount!: string;
  description!: string;
  category!: string;
}

// Account model
export interface Account {
  id: string;
  accountName: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
}

// Transaction of account model
export interface AccountTransaction {
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
  // Node/Express API
  REST_API: string = 'http://localhost:8000/transactionVersion1';
  REST_API_V2: string = 'http://localhost:8000/transactionVersion2';
  REST_API_ACCOUNT: string = 'http://localhost:8000/account';

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Add
  AddTransaction(data: Transaction): Observable<any> {
    let API_URL = `${this.REST_API}/add-transaction`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Get all transactions
  GetTransactions(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single transaction
  GetTransaction(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/read-transaction/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  // Update
  updateTransaction(id: string, data: Transaction): Observable<any> {
    let API_URL = `${this.REST_API}/update-transaction/${id}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        tap((response) => {
          console.log('Response from updateTransaction:', response);
        }),
        catchError(this.handleError)
      );
  }

  // Delete
  deleteTransaction(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/delete-transaction/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Handle error
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
      alert(errorMessage); // แสดง alert
      return throwError(() => new Error(errorMessage));
    }
  
    // Handle server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error('An unknown error occurred.'));
  }
  

  // V2
  //////////////////////////////////////////
  // Add
  AddTransactionV2(data: TransactionV2): Observable<any> {
    let API_URL = `${this.REST_API_V2}/add-transactionV2`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Get all transactions
  GetTransactionsV2(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_V2}`);
  }

  // Get single transaction
  GetTransactionV2(id: string): Observable<any> {
    let API_URL = `${this.REST_API_V2}/read-transactionV2/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  // Update
  updateTransactionV2(id: string, data: TransactionV2): Observable<any> {
    let API_URL = `${this.REST_API_V2}/update-transactionV2/${id}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        tap((response) => {
          console.log('Response from updateTransactionV2:', response);
        }),
        catchError(this.handleError)
      );
  }

  // Delete
  deleteTransactionV2(id: string): Observable<any> {
    let API_URL = `${this.REST_API_V2}/delete-transactionV2/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  //*** Create, Read, Update, Delete of Account ***//

  // Create Account
  AddAccount(data: Account): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/add-account`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Read All Accounts
  // GetAccounts(): Observable<any> {
  //   return this.httpClient.get(`${this.REST_API_ACCOUNT}`, {
  //     headers: this.headers,
  //   });
  // }

  GetAccounts(): Observable<any> {
    let token: string | null = null;

    // ตรวจสอบว่าอยู่ใน browser หรือไม่
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt'); // ดึง token จาก Local Storage
    }

    // ตรวจสอบว่า token มีค่าหรือไม่ ถ้าไม่มีให้แสดง error
    if (!token) {
      console.error('No token provided');
      // return throwError(() => new Error('No token provided'));
    }

    // สร้าง headers โดยแนบ token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    // ส่ง request โดยแนบ headers
    return this.httpClient
      .get(this.REST_API_ACCOUNT)
      .pipe(catchError(this.handleError));
  }

  // Update Account
  updateAccount(id: string, data: Account): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/update-account/${id}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient.put(API_URL, data).pipe(
      tap((response) => {
        console.log('Response from update account:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Read One Account
  GetAccount(id: string): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/read-account/${id}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  // Delete Account
  deleteAccount(id: string): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/delete-account/${id}`;
    return this.httpClient
      .delete(API_URL)
      .pipe(catchError(this.handleError));
  }

  // Transaction of Account
  //////////////////////////////////////////
  AddTransactionOfAccount(
    data: AccountTransaction,
    id: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/add-transaction/${id}`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Get all transactions of account
  GetTransactionOfAccount(id: string): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/read-account-transactions/${id}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  // Get a transaction of account
  GetATransactionOfAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/read-account-transaction/${accountId}/${transactionId}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  // Update transaction of account
  UpdateATransactionOfAccount(
    data: AccountTransaction, // ข้อมูลของ transaction ที่ต้องการอัปเดต
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/update-account-transaction/${accountId}/${transactionId}`;

    // ทำการ PUT โดยส่งข้อมูลของ transaction และ headers ไปยัง API
    return this.httpClient.put(API_URL, data).pipe(
      tap((response) => {
        console.log('Response from update transaction of account:', response);
      }), // ใช้ tap เพื่อตรวจสอบ response ที่ได้รับ
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  deleteATransactionOfAccount(
    accountId: string,
    transactionId: string
  ): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/delete-account-transaction/${accountId}/${transactionId}`;

    // ทำการ DELETE
    return this.httpClient.delete(API_URL).pipe(
      tap((response) => {
        console.log('Deleted transaction of account:', response);
      }), // ใช้ tap เพื่อตรวจสอบ response ที่ได้รับ
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // Update balance
  updateBalance(id: string, balance: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.REST_API_ACCOUNT}/update-balance/${id}`,
      { balance },
      
    );
  }
}
