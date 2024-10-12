import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DemoCrudService } from '../../../services/demo-crud.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class DemoTransactionsForAccountComponent implements OnInit {
  // Declaring
  getAccountId: any;
  currentDate = new Date();
  demoTransactionForAccount: any;
  demoAccount: any;

  isBrowser: boolean;

  constructor(
    // public formBuilder: FormBuilder,
    // private router: Router,
    // private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private demoCrudService: DemoCrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Get ID
    this.getAccountId = this.activatedRouter.snapshot.paramMap.get('accountId');
    //
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // ดึงข้อมูลธุรกรรมทั้งหมด
      this.demoCrudService
        .getTransactionsForCurrentAccount(this.getAccountId)
        .subscribe((res) => {
          this.demoTransactionForAccount = res.reverse();
        });
      //
      this.demoCrudService.getAccount(this.getAccountId).subscribe((res) => {
        this.demoAccount = res;
      });
    }
  }
}
