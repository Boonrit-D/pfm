import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';

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
  transactionsOfAccount: any;
  getTransactionId: any;
  totalIncome: number = 0;
  totalExpenses: number = 0;

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

    // Get all transaction of current account
    this.crudService
      .GetTransactionOfAccount(this.getAccountId)
      .subscribe((res) => {
        this.transactionsOfAccount = res;
        console.log(this.transactionsOfAccount);

        // คำนวณและอัปเดตยอดเงินคงเหลือ
        this.updateBalance();

        // คำนวณยอดรายได้และค่าใช้จ่ายประจำเดือน
        this.calculateTotalIncome();
        this.calculateTotalExpenses();
      });

    // ดึงค่า queryParams ที่ถูกส่งมาจากหน้า transaction
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['amount'] === 'positive') {
        // ถ้าเป็น "เงินเข้า" กำหนดให้ amount เป็นค่าบวก แต่ไม่ต้องใส่ค่าเริ่มต้น
        this.transactionForm.patchValue({ amount: '' });
      } else if (params['amount'] === 'negative') {
        // ถ้าเป็น "เงินออก" กำหนดให้ amount เป็นค่าลบ (แต่ไม่ใส่ "-" ล่วงหน้า)
        this.transactionForm.patchValue({ amount: '' });
      }
    });

    // Transaction type
    this.activatedRouter.queryParams.subscribe((params) => {
      const amountType = params['amount'];
      if (amountType === 'positive') {
        this.transactionType = '(เงินเข้า)';
      } else if (amountType === 'negative') {
        this.transactionType = '(เงินออก)';
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
      .UpdateATransactionOfAccount(
        this.transactionForm.value,
        this.getAccountId,
        this.getTransactionId
      )
      .subscribe({
        next: () => {
          console.log('Updated transaction successfully');
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/account/dashboard/${this.getAccountId}`)
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  delete(): any {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบธุรกรรมนี้?')) {
      this.crudService
        .deleteATransactionOfAccount(this.getAccountId, this.getTransactionId)
        .subscribe({
          next: () => {
            console.log('Deleted transaction successfully');
            this.ngZone.run(() =>
              this.router.navigateByUrl(
                `/account/dashboard/${this.getAccountId}`
              )
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // Calculate and update balance
  updateBalance() {
    if (this.transactionsOfAccount) {
      // Calculate the total balance from all transactions.
      const totalBalance: number = this.transactionsOfAccount.reduce(
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
    }
  }

  calculateTotalIncome() {
    this.totalIncome = this.transactionsOfAccount
      .filter((txn: any) => txn.amount > 0)
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.transactionsOfAccount
      .filter((txn: any) => txn.amount < 0)
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);
  }
}
