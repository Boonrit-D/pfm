import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements OnInit {
  // ใช้เพื่อควบคุมการแสดงผล
  menuVisible = false;
  menuBarVisible = false;
  isDropdownOpen = false;
  showPopover = false;
  showPinLogin = false;

  pinCode: string = ''; // เก็บรหัส PIN ที่ผู้ใช้ป้อน
  pinDisplay: string[] = ['', '', '', '']; // แสดง PIN ที่กรอก
  numbers: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '*',
    '0',
    '#',
  ]; // ตัวเลขบนแป้นกด

  credentialsForm: FormGroup;

  // ประกาศตัวแปร authService
  constructor(
    public authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone
  ) {
    // สร้างฟอร์มพร้อมกำหนดค่าเริ่มต้นให้ username
    this.credentialsForm = this.formBuilder.group({
      username: ['B', Validators.required], // กำหนดค่าเริ่มต้นที่นี่
      pin: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  ngOnInit(): void {}

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
      // อัปเดตค่า PIN ในฟอร์มก่อนทำการ submit
      this.credentialsForm.patchValue({
        pin: this.pinCode,
      });

      // ตรวจสอบฟอร์มและทำการ submit
      if (this.credentialsForm.valid) {
        const formData = this.credentialsForm.value;
        console.log('Form Data:', formData);
        // การส่งข้อมูลไปยัง API
        this.authService.loginPin(this.credentialsForm.value).subscribe({
          next: () => {
            console.log('User logged in');
            this.ngZone.run(() => this.router.navigateByUrl('/'));
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.closePinLogin(); // ปิด popover หลังจากเข้าสู่ระบบสำเร็จ
      } else {
        alert('Form is not valid');
      }
    } else {
      alert('Please enter a 4-digit PIN');
    }
  }
}
