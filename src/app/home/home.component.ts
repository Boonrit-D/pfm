import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ตรวจสอบว่าเคยรีเฟรชหรือยัง
      const hasRefreshed = localStorage.getItem('hasRefreshed');
  
      // ถ้ายังไม่เคยรีเฟรช ให้ทำการรีเฟรชและบันทึกสถานะ
      if (!hasRefreshed) {
        localStorage.setItem('hasRefreshed', 'true'); // บันทึกสถานะว่าเคยรีเฟรชแล้ว
        window.location.reload(); // ทำการรีเฟรช
      }
    }
  }
  

}
