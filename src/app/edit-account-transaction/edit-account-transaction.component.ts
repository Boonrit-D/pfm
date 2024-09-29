import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-edit-account-transaction',
  templateUrl: './edit-account-transaction.component.html',
  styleUrl: './edit-account-transaction.component.css',
})
export class EditAccountTransactionComponent implements OnInit {
  // Category
  categories: string[] = ['รายได้', 'รายจ่าย']; // หมวดหมู่เริ่มต้น
  newCategory: string = ''; // ตัวแปรสำหรับเก็บหมวดหมู่ใหม่

  // Account
  account: any;
  getAccountId: any;
  transactionForm: FormGroup;
  aTransactionsOfAccount: any;
  getTransactionId: any;

  transactionType: string = ''; // เก็บข้อมูลประเภทของธุรกรรม ('positive' หรือ 'negative')

  constructor(
    private crudService: CrudService,
    private activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    //
    this.transactionForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: [, Validators.required],
      description: [''],
      date: [''],
    });
  }

  ngOnInit(): void {
    // Get ID from route
    this.getAccountId = this.activatedRouter.snapshot.paramMap.get('accountId');
    this.getTransactionId =
      this.activatedRouter.snapshot.paramMap.get('transactionId');

    // Get current account
    this.crudService.GetAccount(this.getAccountId).subscribe((res) => {
      this.account = res;
      // console.log(res);
    });

    this.crudService
      .GetATransactionOfAccount(this.getAccountId, this.getTransactionId)
      .subscribe((res) => {
        this.aTransactionsOfAccount = res;
        console.log(res);

        // Convert date to yyyy-MM-ddThh:mm format
        const transactionDate = new Date(res['date']);
        const formattedDate = transactionDate.toISOString().slice(0, 16); // yyyy-MM-ddThh:mm

        this.transactionForm.setValue({
          category: res['category'],
          amount: Math.abs(res['amount']),
          description: res['description'],
          date: formattedDate,
        });
      });

    // ดึงค่า queryParams ที่ถูกส่งมาจากหน้า transaction
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['amount'] === 'positive') {
        // ถ้าเป็น "เงินเข้า" กำหนดให้ amount เป็นค่าบวก
        this.transactionForm.patchValue({ amount: '' }); // ใส่ช่องว่างเพื่อให้ผู้ใช้กรอกค่าเอง
      } else if (params['amount'] === 'negative') {
        // ถ้าเป็น "เงินออก" กำหนดให้ amount เป็นค่าลบ
        this.transactionForm.patchValue({ amount: '-' }); // ใส่ "-" ไว้ล่วงหน้าให้ผู้ใช้กรอก
      }
    });

    // Transaction type
    this.activatedRouter.queryParams.subscribe((params) => {
      const amountType = params['amount']; // ดึงค่าที่ส่งมาจาก queryParams
      if (amountType === 'positive') {
        this.transactionType = '(เงินเข้า)'; // หากเป็นรายการบวก แสดงเครื่องหมาย "+"
      } else if (amountType === 'negative') {
        this.transactionType = '(เงินออก)'; // หากเป็นรายการลบ แสดงเครื่องหมาย "-"
      }
    });
  }

  onSubmit(): any {
    let amountValue = this.transactionForm.value.amount;

  // ตรวจสอบและตั้งค่าค่าลบสำหรับ "เงินออก"
  if (this.activatedRouter.snapshot.queryParams['amount'] === 'negative') {
    if (amountValue > 0) {
      // หากเป็น "เงินออก" และค่า amount ไม่ติดลบ ให้ตั้งค่าให้ติดลบ
      amountValue = -Math.abs(amountValue);
    }
  } else if (this.activatedRouter.snapshot.queryParams['amount'] === 'positive') {
    // สำหรับ "เงินเข้า" ให้ตั้งค่าให้เป็นค่าบวกแน่นอน
    amountValue = Math.abs(amountValue);
  }

  // อัปเดตค่าในฟอร์ม
  this.transactionForm.patchValue({ amount: amountValue });

  // ส่งข้อมูลไปอัปเดต
  this.crudService
    .UpdateATransactionOfAccount(
      this.transactionForm.value, // ข้อมูลที่ได้จากฟอร์ม
      this.getAccountId, // ID ของบัญชี
      this.getTransactionId // ID ของ transaction ที่จะอัปเดต
    )
    .subscribe({
      next: () => {
        console.log('Updated transaction successfully');
        this.ngZone.run(
          () => this.router.navigateByUrl(`/account/dashboard/${this.getAccountId}`)
        );
      },
      error: (err) => {
        console.log(err); // แสดง error ในกรณีที่มีปัญหาในการอัปเดต
      },
    });
  }
}
