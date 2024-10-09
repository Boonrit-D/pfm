import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class DemoAccountsComponent implements OnInit  {

  // รายการ URL รูปภาพ
  images: string[] = [
    'https://cdn-icons-png.flaticon.com/128/6418/6418361.png',
    'https://cdn-icons-png.flaticon.com/512/5107/5107412.png',
    'https://cdn-icons-png.flaticon.com/128/3141/3141855.png',
    'https://cdn-icons-png.flaticon.com/128/1771/1771198.png',
    'https://cdn-icons-png.flaticon.com/512/8346/8346204.png'
  ];
  // รายการสีที่ต้องการสุ่ม
  backgroundColors: string[] = ['bg-purple-200', 'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200'];

  // ตัวแปรเก็บ URL ของรูปที่ถูกสุ่ม
  currentImage: string = '';
  // ตัวแปรเก็บ class ของสีพื้นหลัง
  currentBackgroundColor: string = '';

  // 
  // dropdownOpen: boolean[] = [];
  dropdownOpen = false;
  //
  isHovered = false;

  //
  constructor() {
    // สุ่มรูปเมื่อเริ่มต้นแอป
    this.setRandomImage();
  }

  //
  ngOnInit(): void {
    // สุ่ม
    this.setRandomImage();
    this.setRandomBackgroundColor();
  }

  // ฟังก์ชันสำหรับสุ่มรูปภาพ
  setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = this.images[randomIndex];
  }

  // ฟังก์ชันสำหรับสุ่มสีพื้นหลัง
  setRandomBackgroundColor(): void {
    const randomIndex = Math.floor(Math.random() * this.backgroundColors.length);
    this.currentBackgroundColor = this.backgroundColors[randomIndex];
  }

  // 
  // toggleDropdown(index: number) {
  toggleDropdown (  ) {
    // this.dropdownOpen[index] = !this.dropdownOpen[index];
    this.dropdownOpen = !this.dropdownOpen;
  }

}
