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
  totalIncome: number = 0;
  

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ) {
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // Get current account
    this.crudService.GetAccount(this.getId).subscribe((res) => {
      this.account = res;
      this.updateBalance(); // คำนวณและอัปเดตยอดเงินคงเหลือ
    });

    // Get all transaction of current account
    this.crudService.GetTransactionOfAccount(this.getId).subscribe((res) => {
      this.transactionsOfAccount = res;
      console.log(this.transactionsOfAccount);
      
      // คำนวณและอัปเดตยอดเงินคงเหลือ
      this.updateBalance(); 

      // คำนวณยอดรายได้ประจำเดือน
      this.calculateTotalIncome();
    });
  }

  // Calculate and update balance
  updateBalance() {
    if (this.transactionsOfAccount) {
        // Calculate the total balance from all transactions.
        const totalBalance: number = this.transactionsOfAccount.reduce((acc: number, txn: { amount: number }) => acc + txn.amount, 0);
        this.account.balance = totalBalance;

        // Update the balance in the database
        this.crudService.updateBalance(this.getId, totalBalance).subscribe((res) => {
            console.log('ยอดเงินคงเหลือถูกอัปเดต:', res);
        });
    }
  }

  calculateTotalIncome() {
    this.totalIncome = this.transactionsOfAccount
      .filter((txn: any) => txn.amount > 0)
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);
  }

}
