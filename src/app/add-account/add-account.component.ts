import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css',
})
export class AddAccountComponent {
  // Account Form variable declare
  // ประกาศตัวแปรฟอร์มสำหรับบัญชี
  accountForm: FormGroup;

  /* 
  English: 
  The constructor of the class is used to inject necessary dependencies.
  - formBuilder: Used to create and manage forms in Reactive Forms.
  - router: Used for navigating between different pages within the application.
  - ngZone: Helps manage tasks that happen outside of Angular's Zone (e.g., tasks not part of Angular's lifecycle).
  - crudService: Used for handling CRUD operations (Create, Read, Update, Delete) that interact with the backend.

  ไทย: 
  คอนสตรัคเตอร์ของคลาส ใช้สำหรับ Inject dependencies ที่จำเป็นในการทำงาน
  - formBuilder: สำหรับสร้างและจัดการฟอร์มในรูปแบบ Reactive Forms
  - router: สำหรับนำทางไปยังหน้าอื่น ๆ ภายในแอปพลิเคชัน
  - ngZone: ช่วยในการจัดการงานที่เกิดขึ้นนอก Angular's Zone (เช่น การทำงานที่ไม่ใช่ Angular lifecycle)
  - crudService: สำหรับการทำงาน CRUD (สร้าง, อ่าน, อัปเดต, ลบ) ที่เชื่อมต่อกับ backend
  */
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.accountForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      currency: ['', Validators.required],
      balance: 0,
      description: [''],
    });
  }

  onSubmit(): any {
    this.crudService.AddAccount(this.accountForm.value).subscribe({
      next: () => {
        console.log('Account added successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/account'));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
