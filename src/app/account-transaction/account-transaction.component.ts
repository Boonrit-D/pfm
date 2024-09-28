import { Component, OnInit, NgZone, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrl: './account-transaction.component.css'
})
export class AccountTransactionComponent {

  getId: any;
  transactionsOfAccount: any;
  currentDate = new Date();

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService
  ){
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    // Get all transaction of current account
    this.crudService.GetTransactionOfAccount(this.getId).subscribe((res) => {
      this.transactionsOfAccount = res.reverse();
      console.log(this.transactionsOfAccount);
    });

  }
  delete(id:any, i:any): void{

  }

}
