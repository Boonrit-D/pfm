import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BarController, Chart, registerables } from 'chart.js';


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
  totalExpenses: number = 0;

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

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
    // Register Chart.js controllers, elements, and plugins
    Chart.register(...registerables);

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

      // คำนวณยอดรายได้และค่าใช้จ่ายประจำเดือน
      this.calculateTotalIncome();
      this.calculateTotalExpenses();
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

  calculateTotalExpenses() {
    this.totalExpenses = this.transactionsOfAccount
      .filter((txn: any) => txn.amount < 0) 
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);
  }

}
