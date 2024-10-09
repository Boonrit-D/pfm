import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor called');
    
    let token: string | null = null; // ประกาศตัวแปร token

    // ตรวจสอบว่าอยู่ในบริบทของเบราว์เซอร์
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt'); // ดึง token จาก Local Storage ถ้าอยู่ในเบราว์เซอร์
    }
    
    console.log(token);

    // ตรวจสอบว่ามี token หรือไม่ ถ้ามีให้แนบไปใน headers
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
