/* 
Importing necessary modules for the component's lifecycle management:
นำเข้าโมดูลที่จำเป็นสำหรับการจัดการวงจรชีวิตของคอมโพเนนต์:

ЄпǤ
- Component: Decorator to define an Angular component.
- OnInit: Lifecycle hook that is called after the component's initialization.
Գnຍ
- Component: เดคอเรเตอร์สำหรับกำหนดคอมโพเนนต์ของ Angular
- OnInit: ฮุควงจรชีวิตที่ถูกเรียกหลังจากการเริ่มต้นคอมโพเนนต์
*/
import { Component, OnInit } from '@angular/core';
/* 
Importing the DemoCrudService for handling CRUD operations:
นำเข้า DemoCrudService สำหรับจัดการการดำเนินการ CRUD:

- This service contains methods for creating, reading, updating, and deleting accounts.
- บริการนี้มีเมธอดสำหรับการสร้าง อ่าน แก้ไข และลบบัญชี
*/
import { CrudService } from '../../../services/crud.service';

// Defining the CreateAccount component:
// กำหนดคอมโพเนนต์ CreateAccount:
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  /* 
  Variables for managing UI state and demo data:
  ตัวแปรสำหรับจัดการสถานะของ UI และข้อมูลตัวอย่าง:

  ЄпǤ
  - currentImage: Holds the URL of the currently selected image.
  - currentBackgroundColor: Stores the class name for the currently selected background color.
  - dropdownOpen: Boolean flag to track whether the dropdown is open or closed.
  - isHovered: Boolean flag to check if an element is being hovered.
  - demoAccounts: Array to store demo account data.
  Գnຍ
  - currentImage: เก็บ URL ของรูปภาพที่ถูกเลือกในปัจจุบัน
  - currentBackgroundColor: เก็บชื่อคลาสสำหรับสีพื้นหลังที่ถูกเลือกในปัจจุบัน
  - dropdownOpen: ตัวแปรบูลีนที่ใช้ติดตามว่าดรอปดาวน์ถูกเปิดหรือปิดอยู่
  - isHovered: ตัวแปรบูลีนที่ใช้ตรวจสอบว่าองค์ประกอบกำลังถูกชี้หรือไม่
  - demoAccounts: อาร์เรย์สำหรับเก็บข้อมูลบัญชีตัวอย่าง
  */
  accountImages: string[] = [];
  accountBackgroundColors: string[] = [];
  dropdownOpen: boolean[] = [];
  hoveredIndexes: boolean[] = [];
  accounts: any = [];

  /* 
  Array of image URLs for icon display:
  อาร์เรย์ของ URL รูปภาพสำหรับแสดงไอคอน:

  ЄпǤ
  - Each string represents the URL to an icon image from an external source.
  - These icons can be used for various UI elements in the application.
  Գnຍ
  - สตริงแต่ละรายการแทน URL ของรูปภาพไอคอนจากแหล่งภายนอก
  - ไอคอนเหล่านี้สามารถใช้สำหรับองค์ประกอบ UI ต่าง ๆ ในแอปพลิเคชัน
  */
  images: string[] = [
    'https://cdn-icons-png.flaticon.com/128/6418/6418361.png',
    'https://cdn-icons-png.flaticon.com/512/5107/5107412.png',
    'https://cdn-icons-png.flaticon.com/128/3141/3141855.png',
    'https://cdn-icons-png.flaticon.com/128/1771/1771198.png',
    'https://cdn-icons-png.flaticon.com/512/8346/8346204.png',
  ];

  /* 
  Array of CSS classes for background gradient colors:
  อาร์เรย์ของคลาส CSS สำหรับสีพื้นหลังแบบไล่เฉด:

  ЄпǤ
  - Each string represents a Tailwind CSS gradient class for background styling.
  - These gradients can be applied to various UI components to enhance visual appeal.
  Գnຍ
  - สตริงแต่ละรายการแทนคลาสไล่เฉดสีของ Tailwind CSS สำหรับการจัดแต่งพื้นหลัง
  - ไล่เฉดสีเหล่านี้สามารถนำไปใช้กับองค์ประกอบ UI ต่าง ๆ เพื่อเพิ่มความสวยงาม
  */
  backgroundColors: string[] = [
    'bg-gradient-to-r from-rose-100 to-red-500',
    'bg-gradient-to-l from-teal-100 to-blue-500',
    'bg-gradient-to-r from-amber-100 to-amber-500',
    'bg-gradient-to-l from-yellow-100 to-yellow-700',
    'bg-gradient-to-r from-lime-100 to-lime-500',
    'bg-gradient-to-l from-emerald-100 to-emerald-500',
    'bg-gradient-to-r from-indigo-100 to-indigo-500',
  ];

  /* 
  Constructor for injecting DemoCrudService:
  คอนสตรัคเตอร์สำหรับฉีด DemoCrudService:

  - demoCrudService: Service injected to handle CRUD operations for demo accounts.
  - demoCrudService: เซอร์วิสที่ถูกฉีดเข้ามาเพื่อจัดการการทำงาน CRUD สำหรับบัญชีตัวอย่าง
  */
  constructor(private crudService: CrudService) {}

  /* 
  Lifecycle hook that is called after the component has been initialized:
  ฮุควงจรชีวิตที่ถูกเรียกหลังจากคอมโพเนนต์ถูกเริ่มต้น:

  - This method can be used to perform initialization tasks, such as fetching data or setting up default values.

  - เมธอดนี้สามารถใช้สำหรับทำงานเริ่มต้น เช่น การดึงข้อมูลหรือการตั้งค่าค่าเริ่มต้น
  */
  ngOnInit(): void {
    this.hoveredIndexes = new Array(this.accounts.length).fill(false);

    this.crudService.getAccounts().subscribe((res) => {
      this.accounts = res;
      this.setRandomImagesAndBackgroundColors();
    });
  }

  setRandomImagesAndBackgroundColors(): void {
    const shuffledImages = [...this.images].sort(() => 0.5 - Math.random());
    const shuffledColors = [...this.backgroundColors].sort(
      () => 0.5 - Math.random()
    );

    this.accounts.forEach((account: any, index: number) => {
      this.accountImages[index] = shuffledImages[index % shuffledImages.length];
      this.accountBackgroundColors[index] =
        shuffledColors[index % shuffledColors.length];
    });
  }

  toggleDropdown(index: number) {
    this.dropdownOpen[index] = !this.dropdownOpen[index];
  }

  deleteAccount(id: any, i: any) {
    if (window.confirm('คุณต้องการดำเนินการลบใช่หรือไม่?')) {
      this.crudService.deleteAccount(id).subscribe((res) => {
        this.accounts.splice(i, 1);
      });
    }
  }
}
