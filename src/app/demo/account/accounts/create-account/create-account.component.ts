/* 
Importing necessary modules for the component:
นำเข้าโมดูลที่จำเป็นสำหรับคอมโพเนนต์:

ЄпǤ
- Component: Decorator to define an Angular component.
- NgZone: Service for managing Angular's zone-related operations.
- Router: Service for navigating between routes in the application.
- FormGroup: Class for grouping form controls in reactive forms.
- FormBuilder: Service for creating form controls and groups easily.
- Validators: Class for built-in validators to use with form controls.
Գnຍ
- Component: เดคอเรเตอร์สำหรับกำหนดคอมโพเนนต์ของ Angular
- NgZone: บริการสำหรับจัดการการทำงานที่เกี่ยวข้องกับโซนใน Angular
- Router: บริการสำหรับการนำทางระหว่างเส้นทางในแอปพลิเคชัน
- FormGroup: คลาสสำหรับจัดกลุ่มฟอร์มคอนโทรลในฟอร์มเชิงปฏิกิริยา
- FormBuilder: บริการสำหรับสร้างฟอร์มคอนโทรลและกลุ่มอย่างง่าย
- Validators: คลาสสำหรับตัวตรวจสอบที่มีอยู่ในตัวเพื่อใช้กับฟอร์มคอนโทรล
*/
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* 
Importing the DemoCrudService for handling CRUD operations:
นำเข้า DemoCrudService สำหรับจัดการการดำเนินการ CRUD:

- This service contains methods for creating, reading, updating, and deleting accounts.
- บริการนี้มีเมธอดสำหรับการสร้าง อ่าน แก้ไข และลบบัญชี
*/
import { DemoCrudService } from '../../../../services/demo-crud.service';

// Defining the CreateAccount component:
// กำหนดคอมโพเนนต์ CreateAccount:
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateDemoAccountComponent {
  // Account Form variable declare
  // ประกาศตัวแปรฟอร์มสำหรับบัญชี
  demoAccountForm: FormGroup;

  /* 
  English: 
  The constructor of the class is used to inject necessary dependencies.
  - formBuilder: Used to create and manage forms in Reactive Forms.
  - router: Used for navigating between different pages within the application.
  - ngZone: Helps manage tasks that happen outside of Angular's Zone (e.g., tasks not part of Angular's lifecycle).
  - demoCrudService: Used for handling CRUD operations (Create, Read, Update, Delete) that interact with the backend.

  ไทย: 
  คอนสตรัคเตอร์ของคลาส ใช้สำหรับ Inject dependencies ที่จำเป็นในการทำงาน
  - formBuilder: สำหรับสร้างและจัดการฟอร์มในรูปแบบ Reactive Forms
  - router: สำหรับนำทางไปยังหน้าอื่น ๆ ภายในแอปพลิเคชัน
  - ngZone: ช่วยในการจัดการงานที่เกิดขึ้นนอก Angular's Zone (เช่น การทำงานที่ไม่ใช่ Angular lifecycle)
  - demoCrudService: สำหรับการทำงาน CRUD (สร้าง, อ่าน, อัปเดต, ลบ) ที่เชื่อมต่อกับ backend
  */
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private demoCrudService: DemoCrudService
  ) {
    this.demoAccountForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      currency: ['', Validators.required],
      balance: 0,
      description: [''],
    });
  }

  /* 
  Handling the form submission:
  จัดการการส่งแบบฟอร์ม:

  ЄпǤ
  - Invoking the createAccount method from demoCrudService with form values.
  - Subscribing to the observable to handle success and error responses.
  - On successful account creation, logging a success message and navigating to the account page.
  - On error, logging the error to the console.
  Գnຍ
  - เรียกใช้เมธอด createAccount จาก demoCrudService โดยใช้ค่าจากฟอร์ม
  - ลงทะเบียนกับ observable เพื่อตรวจสอบการตอบสนองที่สำเร็จและข้อผิดพลาด
  - เมื่อสร้างบัญชีสำเร็จ จะทำการบันทึกข้อความความสำเร็จและนำทางไปยังหน้าบัญชี
  - หากเกิดข้อผิดพลาด จะทำการบันทึกข้อผิดพลาดลงในคอนโซล
  */
  onSubmit(): any {
    this.demoCrudService.createAccount(this.demoAccountForm.value).subscribe({
      next: () => {
        // Logging a success message to the console when the account is added successfully
        // บันทึกข้อความความสำเร็จลงในคอนโซลเมื่อบัญชีถูกเพิ่มเรียบร้อยแล้ว
        console.log('Account added successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/demo/accounts'));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
