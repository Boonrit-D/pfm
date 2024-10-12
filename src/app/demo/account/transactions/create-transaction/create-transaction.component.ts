import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemoCrudService } from '../../../../services/demo-crud.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateDemoTransactionComponent implements OnInit {

  // Define date
  currentDateTime: string;

  // Category
  categories: string[] = ['รายได้', 'รายจ่าย']; // หมวดหมู่เริ่มต้น
  newCategories: string[] = []; // ตัวแปรสำหรับเก็บหมวดหมู่ใหม่

  // Account
  demoAccount: any = [];
  getAccountId: any;
  demoTransactionForm: FormGroup;

  //
  demoTransactionType: string = ''; // เก็บข้อมูลประเภทของธุรกรรม ('positive' หรือ 'negative')

  constructor(
    private demoCrudService: DemoCrudService,
    private activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {

    // Get ID
    this.getAccountId = this.activatedRouter.snapshot.paramMap.get('accountId');

    this.demoCrudService.getAccount(this.getAccountId).subscribe((res) => {
      this.demoAccount = res;
    });

    // Date
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // รูปแบบสำหรับ datetime-local คือ YYYY-MM-DDTHH:MM
    this.currentDateTime = `${yyyy}-${mm}-${dd}T${hours}:${minutes}:${seconds}`;

    // รูปแบบสำหรับ datetime-local คือ YYYY-MM-DDTHH:MM
    this.currentDateTime = `${yyyy}-${mm}-${dd}T${hours}:${minutes}:${seconds}`;

    //
    this.demoTransactionForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: [, Validators.required],
      description: [''],
      date: [this.currentDateTime],
    });

  }

  ngOnInit(): void {

    // ดึงค่า queryParams ที่ถูกส่งมาจากหน้า dashboard
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['amount'] === 'positive') {
        // ถ้าเป็น "เงินเข้า" กำหนดให้ amount เป็นค่าบวก
        this.demoTransactionForm.patchValue({ amount: null }); // ใส่ null เพื่อให้ผู้ใช้กรอกค่าเอง
      } else if (params['amount'] === 'negative') {
        // ถ้าเป็น "เงินออก" กำหนดให้ amount เป็นค่าลบ
        this.demoTransactionForm.patchValue({ amount: null }); // ใส่ null หรือ 0 เพื่อให้ผู้ใช้กรอกค่า
      }
    });

    // Transaction type
    this.activatedRouter.queryParams.subscribe((params) => {
      const amountType = params['amount']; // ดึงค่าที่ส่งมาจาก queryParams
      if (amountType === 'positive') {
        this.demoTransactionType = 'รายการเงินเข้า'; // หากเป็นรายการบวก แสดงเครื่องหมาย "+"
      } else if (amountType === 'negative') {
        this.demoTransactionType = 'รายการเงินออก'; // หากเป็นรายการลบ แสดงเครื่องหมาย "-"
      }
    });

  }

  onSubmit(): any {
    // ตรวจสอบว่าค่าที่ส่งมาใน amount เป็นค่าลบหรือไม่
    let amountValue = this.demoTransactionForm.value.amount;

    // ถ้าค่า amount ที่ส่งมาจากปุ่ม "เงินออก" และผู้ใช้กรอกค่าที่ไม่ติดลบ
    if (
      this.activatedRouter.snapshot.queryParams['amount'] === 'negative' &&
      amountValue > 0
    ) {
      // ทำให้ amount เป็นค่าลบ
      this.demoTransactionForm.patchValue({ amount: -Math.abs(amountValue) });
    }

    // นำค่าที่ถูกต้องไปส่ง
    this.demoCrudService
      .createTransaction(this.demoTransactionForm.value, this.getAccountId)
      .subscribe({
        next: () => {
          console.log('Transaction created successfully');
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/demo/account/${this.getAccountId}`)
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

}
