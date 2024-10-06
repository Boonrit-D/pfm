import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent {

  // ใช้เพื่อควบคุมการแสดงผล
  menuVisible = false;
  menuBarVisible = false;
  isDropdownOpen = false;
  showPopover = false;
  showPinLogin = false;
  
  pinCode: string = ''; // เก็บรหัส PIN ที่ผู้ใช้ป้อน
  pinDisplay: string[] = ['', '', '', '']; // แสดง PIN ที่กรอก
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']; // ตัวเลขบนแป้นกด

  // ประกาศตัวแปร authService
  constructor(public authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  closeMenu() {
    this.menuVisible = false;
  }

  checkLoginStatus() {
    if (this.authService.isLoggedIn()) {
      const username = this.authService.getUsername();
      console.log(`User is logged in: ${username}`);
    } else {
      console.log('User is not logged in');
    }
  }

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน logout จาก AuthService
    this.router.navigate(['/login']); // นำทางไปยังหน้า login
  }

  toggleMenuBar() {
    this.menuBarVisible = !this.menuBarVisible; // เปลี่ยนค่าเมื่อคลิก
  }

  closePinLogin() {
    this.showPinLogin = false;
    this.pinCode = '';
    this.pinDisplay = ['', '', '', ''];
  }

  enterPin(number: string) {
    if (this.pinCode.length < 4) {
      this.pinCode += number;
      this.pinDisplay[this.pinCode.length - 1] = number;
    }
  }

  deletePin() {
    if (this.pinCode.length > 0) {
      this.pinDisplay[this.pinCode.length - 1] = '';
      this.pinCode = this.pinCode.slice(0, -1);
    }
  }

  loginWithPin() {
    if (this.pinCode.length === 4) {
      // ทำการเข้าสู่ระบบด้วยรหัส PIN
      console.log('PIN:', this.pinCode);
      this.closePinLogin(); // ปิด popover หลังจากเข้าสู่ระบบสำเร็จ
    } else {
      alert('Please enter a 4-digit PIN');
    }
  }
}
