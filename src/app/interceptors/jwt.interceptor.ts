import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service'; // นำเข้า AuthService

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = null;

    // ตรวจสอบว่าอยู่ในเบราว์เซอร์
    if (isPlatformBrowser(this.platformId)) {
      // Get the token from AuthService
      token = this.authService.getToken(); // ใช้ getToken จาก AuthService
    }

    // Clone the request and set the new header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
