/*
  English: 
  Import necessary Angular modules and classes for HTTP requests, 
  handling HTTP events, and implementing an interceptor to modify requests 
  and responses in the application's HTTP pipeline.

  ภาษาไทย:
  นำเข้าโมดูลและคลาสที่จำเป็นของ Angular สำหรับการทำคำขอ HTTP,
  การจัดการเหตุการณ์ HTTP, และการใช้ interceptor เพื่อปรับเปลี่ยนคำขอ 
  และการตอบกลับใน HTTP pipeline ของแอปพลิเคชัน
*/
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

/*
  English: 
  Implement an HTTP interceptor that allows modifying HTTP requests 
  before they are sent to the server. This interceptor can be used 
  to add authentication tokens or handle request-specific logic.

  ภาษาไทย:
  ใช้ interceptor ของ HTTP ที่อนุญาตให้ปรับเปลี่ยนคำขอ HTTP 
  ก่อนที่จะถูกส่งไปยังเซิร์ฟเวอร์ โดยสามารถใช้ interceptor นี้ 
  เพื่อเพิ่มโทเค็นการตรวจสอบสิทธิ์หรือจัดการกับตรรกะที่เฉพาะเจาะจง 
  ต่อคำขอ
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /*
    Constructor to initialize the AuthInterceptor:
    คอนสตรัคเตอร์สำหรับการเริ่มต้น AuthInterceptor:

    - This constructor injects the PLATFORM_ID to determine the execution context 
    (e.g., browser or server) and an instance of AuthService to access authentication 
    functionalities within the interceptor.
    - The injected AuthService will be used to retrieve tokens or perform authentication-related tasks.

    - คอนสตรัคเตอร์นี้ทำการฉีด PLATFORM_ID เพื่อกำหนดบริบทการทำงาน 
    (เช่น บนเบราว์เซอร์หรือเซิร์ฟเวอร์) และอินสแตนซ์ของ AuthService 
    เพื่อเข้าถึงฟังก์ชันการตรวจสอบสิทธิ์ภายใน interceptor
    - AuthService ที่ถูกฉีดจะถูกใช้เพื่อดึง token หรือทำงานที่เกี่ยวข้อง 
    กับการตรวจสอบสิทธิ์
  */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  /*
    Method to intercept HTTP requests and add authentication token:
    เมธอดสำหรับแทรกคำขอ HTTP และแนบ token การตรวจสอบสิทธิ์:

    - This method checks if the execution context is in the browser and if the user is logged in 
    by calling the 'isLoggedIn' method from the AuthService.
    - If both conditions are met, it retrieves the JWT from Local Storage.
    - If a token is found, it clones the original request and adds an 'Authorization' header 
    with the 'Bearer' scheme, which includes the retrieved token.
    - Finally, the method forwards the modified request to the next handler in the chain.

    - เมธอดนี้ตรวจสอบว่าบริบทการทำงานอยู่ในเบราว์เซอร์และผู้ใช้ล็อกอินอยู่หรือไม่ 
    โดยเรียกใช้เมธอด 'isLoggedIn' จาก AuthService
    - หากทั้งสองเงื่อนไขเป็นจริง มันจะดึง JWT จาก Local Storage
    - หากพบ token มันจะคัดลอกคำขอเดิมและเพิ่ม header 'Authorization' 
    พร้อมกับสตริง 'Bearer' ซึ่งรวมถึง token ที่ดึงมา
    - สุดท้าย เมธอดจะส่งคำขอที่แก้ไขไปยังผู้จัดการถัดไปในลำดับ
  */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId) && this.authService.isLoggedIn()) {
      token = localStorage.getItem('jwt');
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
