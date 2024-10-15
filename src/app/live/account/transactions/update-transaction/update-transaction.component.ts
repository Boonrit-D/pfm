import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../../../services/crud.service';

@Component({
  selector: 'app-update-transaction',
  host: { '[attr.data-id]': 'uniqueId' },
  templateUrl: './update-transaction.component.html',
  styleUrl: './update-transaction.component.css',
})
export class UpdateTransactionComponent implements OnInit {
  // Define date
  currentDateTime: string;

  // Category
  categories: string[] = ['รายได้', 'รายจ่าย']; // หมวดหมู่เริ่มต้น
  newCategories: string[] = []; // ตัวแปรสำหรับเก็บหมวดหมู่ใหม่

  // Account
  account: any = [];
  getAccountId: any;
  getTransactionId: any;
  transactionForm: FormGroup;

  //
  transactionForAccount: any;

  //
  demoTransactionType: string = ''; // เก็บข้อมูลประเภทของธุรกรรม ('positive' หรือ 'negative')
  constructor(
    private crudService: CrudService,
    private activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    // Get ID
    this.getAccountId = this.activatedRouter.snapshot.paramMap.get('accountId');
    this.getTransactionId =
      this.activatedRouter.snapshot.paramMap.get('transactionId');

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
    this.transactionForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: [, Validators.required],
      description: [''],
      date: [this.currentDateTime],
    });
  }
  ngOnInit(): void {
    this.crudService.getAccount(this.getAccountId).subscribe((res) => {
      this.account = res;
    });

    this.crudService
      .getTransactionForAccount(this.getAccountId, this.getTransactionId)
      .subscribe((res) => {
        this.transactionForAccount = res;
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

    // ดึงค่า queryParams ที่ถูกส่งมาจากหน้า dashboard
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['amount'] === 'positive') {
        // ถ้าเป็น "เงินเข้า" กำหนดให้ amount เป็นค่าบวก
        this.transactionForm.patchValue({ amount: null }); // ใส่ null เพื่อให้ผู้ใช้กรอกค่าเอง
      } else if (params['amount'] === 'negative') {
        // ถ้าเป็น "เงินออก" กำหนดให้ amount เป็นค่าลบ
        this.transactionForm.patchValue({ amount: null }); // ใส่ null หรือ 0 เพื่อให้ผู้ใช้กรอกค่า
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
    if (this.transactionForm.invalid) {
      return; // ไม่ทำงานต่อถ้าฟอร์มไม่ถูกต้อง
    }

    let amountValue = this.transactionForm.value.amount;

    // ตั้งค่าให้ติดลบหรือบวกตามประเภท
    if (this.activatedRouter.snapshot.queryParams['amount'] === 'negative') {
      if (amountValue > 0) {
        amountValue = -Math.abs(amountValue); // ถ้าเป็น "เงินออก" ให้ติดลบ
      }
    } else if (
      this.activatedRouter.snapshot.queryParams['amount'] === 'positive'
    ) {
      amountValue = Math.abs(amountValue); // ถ้าเป็น "เงินเข้า" ให้เป็นบวก
    }

    // อัปเดตค่าในฟอร์ม
    this.transactionForm.patchValue({ amount: amountValue });

    // ส่งข้อมูลไปอัปเดต
    this.crudService
      .updateTransactionForAccount(
        this.transactionForm.value,
        this.getAccountId,
        this.getTransactionId
      )
      .subscribe({
        next: () => {
          console.log('Updated transaction successfully');
          // อัปเดตยอดเงินคงเหลือ
          this.updateBalance();
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/demo/account/${this.getAccountId}`)
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Calculate and update balance
  updateBalance() {
    this.crudService
      .getTransactionsForCurrentAccount(this.getAccountId)
      .subscribe((transactions) => {
        this.transactionForAccount = transactions;

        // Calculate the total balance from all transactions.
        const totalBalance: number = this.transactionForAccount.reduce(
          (acc: number, txn: { amount: number }) => acc + txn.amount,
          0
        );
        this.account.balance = totalBalance;

        // Update the balance in the database
        this.crudService
          .updateBalance(this.getAccountId, totalBalance)
          .subscribe((res) => {
            console.log('ยอดเงินคงเหลือถูกอัปเดต:', res);
          });
      });
  }

  delete(): any {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบธุรกรรมนี้?')) {
      this.crudService
        .deleteTransactionForAccount(this.getAccountId, this.getTransactionId)
        .subscribe({
          next: () => {
            console.log('Deleted transaction successfully');
            this.updateBalance();
            this.ngZone.run(() =>
              this.router.navigateByUrl(
                `/demo/account/${this.getAccountId}`
              )
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
