import { Component, OnInit, NgZone, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrl: './account-transaction.component.css'
})
export class AccountTransactionComponent {

  getId: any;
  getTransactionsId: any;
  getAccountId: any;
  transactionsOfAccount: any;
  currentDate = new Date();
  account: any;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ){
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    // this.getAccountId = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    // Get all transaction of current account
    this.crudService.GetTransactionOfAccount(this.getId).subscribe((res) => {
      this.transactionsOfAccount = res.reverse();
      console.log(this.transactionsOfAccount);
    });

    // Get current account
    this.crudService.GetAccount(this.getId).subscribe((res) => {
      this.account = res;
      console.log(this.account);
    });

  }
  delete(id: any): void {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบธุรกรรมนี้?')) {
      this.crudService
        .deleteATransactionOfAccount(this.getId, id)
        .subscribe({
          next: () => {
            console.log('Deleted transaction successfully');
            this.ngZone.run(() =>
              this.router.navigateByUrl(
                `/account/dashboard/${this.getId}`
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
