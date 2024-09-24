import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
//
export class DashboardComponent {
  Transactions: any = [];
  TransactionsV2: any = [];
  currentDate = new Date();

  constructor(private CrudService: CrudService) {}

  ngOnInit(): void {
    // V1
    this.CrudService.GetTransactions().subscribe((res) => {
      console.log(res);
      this.Transactions = res;
    });

    // V2
    this.CrudService.GetTransactionsV2().subscribe((res) => {
      console.log(res);
      this.TransactionsV2 = res;
    });
  }

  // V1
  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.CrudService.deleteTransaction(id).subscribe((res) => {
        this.Transactions.splice(i, 1);
      });
    }
  }

  // V2
  deleteV2(id:any, i:any) {
    console.log(id);
    if ( window.confirm('Do you want to go ahead?') ) {
      this.CrudService.deleteTransactionV2(id).subscribe((res) => {
        this.TransactionsV2.splice(i, 1);
      })
    }
  }
}
