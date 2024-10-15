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
  currentDate = new Date();
  demoTransactionForAccount: any;
  demoAccount: any;

  isBrowser: boolean;
  showPopover = false;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(
    // public formBuilder: FormBuilder,
    // private router: Router,
    // private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private demoCrudService: DemoCrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    //
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.demoCrudService.getAccounts().subscribe((accounts) => {
        this.demoAccount = accounts;
        if (this.demoAccount && this.demoAccount.length > 0) {
          const currentAccount = this.demoAccount[0];
          this.demoCrudService
            .getTransactionsForCurrentAccount(currentAccount._id)
            .subscribe((transactions) => {
              this.demoTransactionForAccount = transactions.reverse();
            });
        } else {
          console.error('No accounts found.');
        }
      });

      // Listen to mousemove event on the document
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isBrowser) {
      // Update mouseX and mouseY with the current mouse position including the scroll offset
      const offsetX = 10; // ระยะห่างในแนวนอน (สามารถปรับค่าได้ตามต้องการ)
      const offsetY = 10; // ระยะห่างในแนวตั้ง (สามารถปรับค่าได้ตามต้องการ)
      this.mouseX = event.clientX + window.scrollX + offsetX; // รวมการ scroll แนวนอน
      this.mouseY = event.clientY + window.scrollY + offsetY; // รวมการ scroll แนวตั้ง
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      // Clean up the event listener when the component is destroyed
      document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }
}
