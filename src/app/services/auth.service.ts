/* 
Importing necessary Angular modules for the application:
นำเข้าโมดูล Angular ที่จำเป็นสำหรับแอปพลิเคชัน:

- Injectable: Decorator to define a service that can be injected.
- catchError: Operator for handling errors in observables.
- map: Operator for transforming data in observables.
- Observable: Class representing a stream of data.
- throwError: Function for creating an observable that emits an error.
- HttpClient: Service for making HTTP requests.
- HttpHeaders: Class representing HTTP headers.
- HttpErrorResponse: Class for handling HTTP error responses.
- isPlatformBrowser: Utility function to check if the app is running in a browser.

- Injectable: เดคอเรเตอร์สำหรับกำหนดบริการที่สามารถถูกฉีดเข้าไป
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
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

/* 
Defining the User interface for the application:
กำหนดอินเทอร์เฟซ User สำหรับแอปพลิเคชัน:

- username: The name of the user, which is a string.
- password: The password of the user, which is a string.

- username: ชื่อของผู้ใช้ ซึ่งเป็นประเภทข้อมูลสตริง
- password: รหัสผ่านของผู้ใช้ ซึ่งเป็นประเภทข้อมูลสตริง
*/
export interface User {
  username: string;
  password: string;
}

/*
English: 
The AuthService class is marked as injectable, allowing it to be provided in the 
root injector of the application. This service can be injected into other components 
or services throughout the app.

ภาษาไทย:
คลาส AuthService ถูกทำเครื่องหมายว่าเป็น injectable ซึ่งอนุญาตให้ให้บริการใน 
root injector ของแอปพลิเคชัน ทำให้บริการนี้สามารถถูกนำไปใช้ในคอมโพเนนต์ 
หรือบริการอื่น ๆ ได้ทั่วทั้งแอป
*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // A private property that stores the base URL for the authentication API.
  // คุณสมบัติส่วนตัวที่เก็บ URL หลักสำหรับ API การเข้าสู่ระบบ
  private restApi = 'http://localhost:8000/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /*
  English: 
  Set HTTP headers for the request by setting 'Content-Type' to 'application/json'
  to inform the server that the data being sent is in JSON format.

  ภาษาไทย:
  กำหนด HTTP headers สำหรับคำขอ โดยตั้งค่า 'Content-Type' เป็น 'application/json'
  เพื่อบอกให้ server รู้ว่าข้อมูลที่ส่งไปเป็นรูปแบบ JSON
  */
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  /*
  Method to create HTTP headers for requests:
  เมธอดสำหรับสร้าง HTTP headers สำหรับคำขอ:

  - This method initializes an HttpHeaders object and sets the 'Content-Type' header to 'application/json'
  to indicate that the request body will be in JSON format.
  - If the 'includeToken' parameter is true, it retrieves the authentication token using the 'getToken' method.
  - If a token is found, it adds the 'Authorization' header with the 'Bearer' scheme to the headers.
  - The method returns the constructed HttpHeaders object for use in HTTP requests.

  - เมธอดนี้เริ่มต้นวัตถุ HttpHeaders และตั้งค่า header 'Content-Type' เป็น 'application/json'
  เพื่อระบุว่าข้อมูลในคำขอจะอยู่ในรูปแบบ JSON
  - หากพารามิเตอร์ 'includeToken' เป็นจริง มันจะดึง token การพิสูจน์ตัวตนโดยใช้เมธอด 'getToken'
  - หากพบ token มันจะเพิ่ม header 'Authorization' พร้อมกับสตริง 'Bearer' เข้าไปใน headers
  - เมธอดจะส่งกลับวัตถุ HttpHeaders ที่สร้างขึ้นสำหรับการใช้งานในคำขอ HTTP
  */
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

  /*
  Method to register a new user:
  เมธอดสำหรับลงทะเบียนผู้ใช้ใหม่:

  - This method constructs the API URL for the registration endpoint by appending '/register' to the base authentication API URL.
  - It uses HttpClient's 'post' method to send an HTTP POST request to the server with the user data.
  - The request includes custom headers defined in 'httpHeaders' and specifies that the response type should be 'text'.
  - The 'pipe' method is used to apply the 'catchError' operator to handle any errors that may occur during the request.

  - เมธอดนี้สร้าง URL ของ API สำหรับจุดลงทะเบียนโดยการเพิ่ม '/register' ไปที่ URL หลักของ API การพิสูจน์ตัวตน
  - ใช้เมธอด 'post' ของ HttpClient เพื่อส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์พร้อมข้อมูลผู้ใช้
  - คำขอรวมถึง headers ที่กำหนดเองที่อยู่ใน 'httpHeaders' และระบุว่าประเภทของการตอบกลับจะเป็น 'text'
  - ใช้เมธอด 'pipe' เพื่อประยุกต์ใช้โอเปอเรเตอร์ 'catchError' ในการจัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการส่งคำขอ
  */
  register(user: User): Observable<any> {
    let apiUrl = `${this.restApi}/register`;
    return this.http
      .post(apiUrl, user, { headers: this.httpHeaders, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  /*
  Method to log in a user and retrieve authentication token:
  เมธอดสำหรับล็อกอินผู้ใช้และดึง token การพิสูจน์ตัวตน:

  - This method constructs the API URL for the login endpoint by appending '/login' to the base REST API URL.
  - It sends an HTTP POST request to the server with user credentials as the request body.
  - The 'createHttpHeaders' method is called to set the necessary headers, including 'Content-Type'.
  - The 'responseType' is set to 'json' to expect a JSON response from the server.
  - The 'pipe' method is used to handle errors with 'catchError' and to perform additional operations using 'tap'.
  - Within 'tap', the token is extracted from the response, and if available, it is stored in Local Storage along with the username.

  - เมธอดนี้สร้าง URL ของ API สำหรับจุดสิ้นสุดการล็อกอินโดยการเพิ่ม '/login' ไปที่ URL ของ REST API หลัก
  - มันส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์พร้อมข้อมูลการล็อกอินของผู้ใช้ในเนื้อหาของคำขอ
  - เมธอด 'createHttpHeaders' ถูกเรียกเพื่อกำหนด headers ที่จำเป็น รวมถึง 'Content-Type'
  - 'responseType' ถูกตั้งค่าเป็น 'json' เพื่อคาดหวังการตอบกลับเป็น JSON จากเซิร์ฟเวอร์
  - เมธอด 'pipe' ถูกใช้ในการจัดการข้อผิดพลาดด้วย 'catchError' และดำเนินการเพิ่มเติมด้วย 'tap'
  - ภายใน 'tap' token จะถูกดึงออกจากการตอบกลับ และถ้าพบ จะถูกจัดเก็บใน Local Storage พร้อมกับชื่อผู้ใช้
  */
  login(credentials: any): Observable<any> {
    let apiUrl = `${this.restApi}/login`;
    return this.http
      .post(apiUrl, credentials, {
        headers: this.createHttpHeaders(),
        responseType: 'json',
      })
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          const token = response.token || response.data.token;
          if (token) {
            this.storeToken(token);
            this.storeUser(credentials.username);
          } else {
            console.error('Token is undefined');
          }
        })
      );
  }

  /*
  Method to log in a user using a PIN for authentication:
  เมธอดสำหรับล็อกอินผู้ใช้โดยใช้ PIN เพื่อการพิสูจน์ตัวตน:

  - This method constructs the API URL for the PIN login endpoint by appending '/loginPin' to the base REST API URL.
  - It sends an HTTP POST request to the server with the user's credentials as the request body.
  - The 'createHttpHeaders' method is called to set the necessary headers, including 'Content-Type'.
  - The 'responseType' is set to 'json' to expect a JSON response from the server.
  - The 'pipe' method is used to handle errors with 'catchError' and to perform additional operations using 'tap'.
  - Within 'tap', the token is extracted from the response, and if available, it is stored in Local Storage along with the username.

  - เมธอดนี้สร้าง URL ของ API สำหรับจุดสิ้นสุดการล็อกอินด้วย PIN โดยการเพิ่ม '/loginPin' ไปที่ URL ของ REST API หลัก
  - มันส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์พร้อมข้อมูลการล็อกอินของผู้ใช้ในเนื้อหาของคำขอ
  - เมธอด 'createHttpHeaders' ถูกเรียกเพื่อกำหนด headers ที่จำเป็น รวมถึง 'Content-Type'
  - 'responseType' ถูกตั้งค่าเป็น 'json' เพื่อคาดหวังการตอบกลับเป็น JSON จากเซิร์ฟเวอร์
  - เมธอด 'pipe' ถูกใช้ในการจัดการข้อผิดพลาดด้วย 'catchError' และดำเนินการเพิ่มเติมด้วย 'tap'
  - ภายใน 'tap' token จะถูกดึงออกจากการตอบกลับ และถ้าพบ จะถูกจัดเก็บใน Local Storage พร้อมกับชื่อผู้ใช้
  */
  loginPin(credentials: any): Observable<any> {
    let apiUrl = `${this.restApi}/loginPin`;
    return this.http
      .post(apiUrl, credentials, {
        headers: this.createHttpHeaders(),
        responseType: 'json',
      })
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          const token = response.token || response.data.token;
          if (token) {
            this.storeToken(token);
            this.storeUser(credentials.username);
          } else {
            console.error('Token is undefined');
          }
        })
      );
  }

  /*
  Method to store the JWT token in Local Storage:
  เมธอดสำหรับจัดเก็บ JWT token ใน Local Storage:

  - This method takes a token as an argument and stores it in Local Storage under the key 'jwt'.
  - By using Local Storage, the token persists even after the browser is closed and can be retrieved later for authentication purposes.

  - เมธอดนี้รับ token เป็นอาร์กิวเมนต์และจัดเก็บมันใน Local Storage โดยใช้คีย์ว่า 'jwt'
  - โดยการใช้ Local Storage token จะคงอยู่แม้หลังจากปิดเบราว์เซอร์ และสามารถเรียกคืนได้ในภายหลังเพื่อวัตถุประสงค์ในการพิสูจน์ตัวตน
  */
  private storeToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  /*
  Method to check if the user is logged in:
  เมธอดสำหรับตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่:

  - This method checks if the application is running in the browser environment using the isPlatformBrowser function.
  - If in the browser, it verifies the existence of a JWT in Local Storage.
  - It returns true if a JWT is found, indicating the user is logged in, or false otherwise.

  - เมธอดนี้ตรวจสอบว่าการทำงานของแอปพลิเคชันอยู่ในสภาพแวดล้อมของเบราว์เซอร์โดยใช้ฟังก์ชัน isPlatformBrowser
  - หากอยู่ในเบราว์เซอร์ จะตรวจสอบว่ามี JWT ใน Local Storage หรือไม่
  - คืนค่า true หากพบ JWT ซึ่งแสดงว่าผู้ใช้ล็อกอินอยู่ หรือ false ในกรณีอื่น
  */
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('jwt');
    }
    return false;
  }

  /*
  Method to log out the user:
  เมธอดสำหรับออกจากระบบผู้ใช้:

  - This method removes the JWT, username, and refresh status from Local Storage.
  - By doing so, it effectively logs the user out of the application.

  - เมธอดนี้ลบ JWT, ชื่อผู้ใช้ และสถานะการรีเฟรชออกจาก Local Storage
  - ด้วยการทำเช่นนี้ จะทำให้ผู้ใช้ออกจากระบบแอปพลิเคชันอย่างมีประสิทธิภาพ
  */
  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('hasRefreshed');
  }

  /*
  Method to retrieve the JWT token from Local Storage:
  เมธอดสำหรับดึง JWT token ออกจาก Local Storage:

  - This method checks if the code is running in a browser platform.
  - If so, it retrieves the JWT stored in Local Storage and returns it.
  - If not, it returns null.

  - เมธอดนี้ตรวจสอบว่ารหัสกำลังทำงานในแพลตฟอร์มเบราว์เซอร์หรือไม่
  - หากใช่ จะดึง JWT ที่จัดเก็บใน Local Storage และคืนค่า
  - หากไม่ใช่ จะคืนค่า null
  */
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  /*
  Method to retrieve the username from Local Storage:
  เมธอดสำหรับดึงชื่อผู้ใช้จาก Local Storage:

  - This method retrieves the username stored in Local Storage.
  - It returns the username as a string, or null if it doesn't exist.

  - เมธอดนี้ดึงชื่อผู้ใช้ที่จัดเก็บใน Local Storage
  - จะคืนค่าเป็นสตริงของชื่อผู้ใช้ หรือ null หากไม่มีอยู่
  */
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /*
  Method to store the username in Local Storage:
  เมธอดสำหรับจัดเก็บชื่อผู้ใช้ใน Local Storage:

  - This method saves the provided username in Local Storage under the key 'username'.
  - It can be used to maintain the user's session across different parts of the application.

  - เมธอดนี้จัดเก็บชื่อผู้ใช้ที่ให้มาใน Local Storage โดยใช้คีย์ 'username'
  - สามารถใช้เพื่อรักษาสถานะการเข้าสู่ระบบของผู้ใช้ในส่วนต่าง ๆ ของแอปพลิเคชัน
  */
  private storeUser(user: string) {
    localStorage.setItem('username', user);
  }

  /*
  Method to handle HTTP errors:
  เมธอดสำหรับจัดการข้อผิดพลาด HTTP:

  - This method processes the error response received from HTTP requests.
  - It checks if the error is an instance of ErrorEvent for client-side errors and constructs an appropriate error message.
  - For server-side errors, it retrieves the status code and error message from the response.
  - Finally, it throws an observable error with the constructed message.

  - เมธอดนี้ประมวลผลข้อผิดพลาดที่ได้รับจากคำขอ HTTP
  - มันตรวจสอบว่าข้อผิดพลาดเป็นตัวอย่างของ ErrorEvent สำหรับข้อผิดพลาดด้านคลินต์ และสร้างข้อความข้อผิดพลาดที่เหมาะสม
  - สำหรับข้อผิดพลาดด้านเซิร์ฟเวอร์ มันดึงสถานะและข้อความข้อผิดพลาดจากการตอบกลับ
  - สุดท้าย มันจะโยนข้อผิดพลาด observable พร้อมข้อความที่สร้างขึ้น
  */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
