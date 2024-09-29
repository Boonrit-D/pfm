import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add-account-transaction',
  templateUrl: './add-account-transaction.component.html',
  styleUrl: './add-account-transaction.component.css',
})
export class AddAccountTransactionComponent implements OnInit {
  // Define date
  currentDateTime: string;

  // Category
  categories: string[] = ['รายได้', 'รายจ่าย']; // หมวดหมู่เริ่มต้น
  newCategory: string = ''; // ตัวแปรสำหรับเก็บหมวดหมู่ใหม่

  // Account
  account: any = [];
  getId: any;
  transactionForm: FormGroup;

  transactionType: string = ''; // เก็บข้อมูลประเภทของธุรกรรม ('positive' หรือ 'negative')

  constructor(
    private crudService: CrudService,
    private activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    this.crudService.GetAccount(this.getId).subscribe((res) => {
      this.account = res;
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

    //
    this.transactionForm = this.formBuilder.group({
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
        this.transactionForm.patchValue({ amount: '' }); // ใส่ช่องว่างเพื่อให้ผู้ใช้กรอกค่าเอง
      } else if (params['amount'] === 'negative') {
        // ถ้าเป็น "เงินออก" กำหนดให้ amount เป็นค่าลบ
        this.transactionForm.patchValue({ amount: '-' }); // ใส่ - ไว้ล่วงหน้าให้ผู้ใช้กรอก
      }
    });

    this.activatedRouter.queryParams.subscribe(params => {
      const amountType = params['amount']; // ดึงค่าที่ส่งมาจาก queryParams
      if (amountType === 'positive') {
        this.transactionType = '+'; // หากเป็นรายการบวก แสดงเครื่องหมาย "+"
      } else if (amountType === 'negative') {
        this.transactionType = '-'; // หากเป็นรายการลบ แสดงเครื่องหมาย "-"
      }
    });
  }

  onSubmit(): any {
    // ตรวจสอบว่าค่าที่ส่งมาใน amount เป็นค่าลบหรือไม่
    let amountValue = this.transactionForm.value.amount;

    // ถ้าค่า amount ที่ส่งมาจากปุ่ม "เงินออก" และผู้ใช้กรอกค่าที่ไม่ติดลบ
    if (
      this.activatedRouter.snapshot.queryParams['amount'] === 'negative' &&
      amountValue > 0
    ) {
      // ทำให้ amount เป็นค่าลบ
      this.transactionForm.patchValue({ amount: -Math.abs(amountValue) });
    }

    this.crudService
      .AddTransactionOfAccount(this.transactionForm.value, this.getId)
      .subscribe({
        next: () => {
          console.log('data added successfully');
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/account/dashboard/${this.getId}`)
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
