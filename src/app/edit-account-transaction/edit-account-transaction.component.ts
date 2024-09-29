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
          amount: res['amount'],
          description: res['description'],
          date: formattedDate,
        });
      });

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

    // this.crudService
    //   .AddTransactionOfAccount(this.transactionForm.value, this.getId)
    //   .subscribe({
    //     next: () => {
    //       console.log('data added successfully');
    //       this.ngZone.run(() =>
    //         this.router.navigateByUrl(`/account/dashboard/${this.getId}`)
    //       );
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //     complete: () => {},
    //   });
  }
}
