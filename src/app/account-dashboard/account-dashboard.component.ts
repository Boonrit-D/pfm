import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css',
})
export class AccountDashboardComponent {
  getId: any;
  account: any;
  transactionsOfAccount: any;

  

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ) {
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    // Get current account
    this.crudService.GetAccount(this.getId).subscribe((res) => {
      this.account = res;
    });

    

    // Idea
    // ธุรกรรมทั้งหมด
    const transactions = [
      { amount: 5000, category: 'เงินเดือน', date: '2024-09-01' },
      { amount: -1500, category: 'ค่าอาหาร', date: '2024-09-10' },
      { amount: -800, category: 'ค่ารถโดยสาร', date: '2024-09-15' },
    ];

    // คำนวณยอดเงินคงเหลือทั้งหมด
    const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);

    // คำนวณรายได้รายเดือน (เฉพาะ amount ที่เป็นบวก)
    const totalIncome = transactions
      .filter((txn) => txn.amount > 0)
      .reduce((acc, txn) => acc + txn.amount, 0);

    // คำนวณค่าใช้จ่ายรายเดือน (เฉพาะ amount ที่เป็นลบ แล้วเอาไปคำนวณแบบบวก)
    const totalExpenses = transactions
      .filter((txn) => txn.amount < 0)
      .reduce((acc, txn) => acc + Math.abs(txn.amount), 0);

    // แสดงผล
    console.log(`ยอดเงินคงเหลือ: ${totalBalance} บาท`);
    console.log(`รายได้รายเดือน: ${totalIncome} บาท`);
    console.log(`ค่าใช้จ่ายรายเดือน: ${totalExpenses} บาท`);
  }

  ngOnInit(): void {
    // Get all transaction of current account
    this.crudService.GetTransactionOfAccount(this.getId).subscribe((res) => {
      this.transactionsOfAccount = res;
      console.log(this.transactionsOfAccount); // เช็คว่าข้อมูลถูกต้องหรือไม่
    });
  }

}
