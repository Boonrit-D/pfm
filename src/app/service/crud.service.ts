import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Transaction model
export class Transaction {
  _id!: string;
  title!: string;
  type!: string;
  amount!: string;
}

// TransactionV2 model 
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
  id            : string          ;
  accountName   : string          ;
  currency      : string          ;
  balance       : number          ;
  transactions  : Transaction []  ;
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
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';
  REST_API_V2: string = 'http://localhost:8000/apiV2';
  REST_API_ACCOUNT: string = 'http://localhost:8000/account';

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddTransaction(data: Transaction): Observable<any> {
    let API_URL = `${this.REST_API}/add-transaction`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all transactions
  GetTransactions(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single transaction
  GetTransaction(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/read-transaction/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.handleError)
      );
  }

  // Update
  updateTransaction(id: string, data: Transaction): Observable<any> {
    let API_URL = `${this.REST_API}/update-transaction/${id}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        tap(response => {
          console.log('Response from updateTransaction:', response);
        }),
        catchError(this.handleError)
      );
  }

  // Delete
  deleteTransaction(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/delete-transaction/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return (errorMessage);
  }

  // V2
  //////////////////////////////////////////
  // Add
  AddTransactionV2(data: TransactionV2): Observable<any> {
    let API_URL = `${this.REST_API_V2}/add-transactionV2`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all transactions
  GetTransactionsV2(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_V2}`);
  }

  // Get single transaction
  GetTransactionV2(id: string): Observable<any> {
    let API_URL = `${this.REST_API_V2}/read-transactionV2/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.handleError)
      );
  }

  // Update
  updateTransactionV2(id: string, data: TransactionV2): Observable<any> {
    let API_URL = `${this.REST_API_V2}/update-transactionV2/${id}`;
    console.log(`API URL: ${API_URL}`);

    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        tap(response => {
          console.log('Response from updateTransactionV2:', response);
        }),
        catchError(this.handleError)
      );
  }

  // Delete
  deleteTransactionV2(id: string): Observable<any> {
    let API_URL = `${this.REST_API_V2}/delete-transactionV2/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Account
  //////////////////////////////////////////
  AddAccount(data: Account): Observable<any> {
    let API_URL = `${this.REST_API_ACCOUNT}/add-account`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all transactions
  GetAccounts(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_ACCOUNT}`);
  }
}
