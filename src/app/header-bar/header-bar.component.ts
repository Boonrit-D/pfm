import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent {
  menuVisible = false;

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
}
