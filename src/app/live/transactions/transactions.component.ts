import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-transactions',
  host: { '[attr.data-id]': 'uniqueId' },
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  currentDate = new Date();
  accounts: any;
  allTransaction: any[] = [];

  showPopover = false;
  mouseX: number = 0;
  mouseY: number = 0;
  isBrowser: boolean;

  constructor(
    // public formBuilder: FormBuilder,
    // private router: Router,
    // private ngZone: NgZone,
    // private activatedRouter: ActivatedRoute,
    private crudService: CrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.crudService.getAccounts().subscribe((res) => {
        this.accounts = res;

        // เรียกใช้ฟังก์ชันเพื่อดึงธุรกรรมล่าสุด
        this.getRecentTransactions();
        // Listen to mousemove event on the document
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
      });
    }
  }

  getRecentTransactions() {
    const transactions: any[] = [];

    // วนลูปเพื่อดึงธุรกรรมจากแต่ละบัญชีและเพิ่มชื่อบัญชีเข้าไปในแต่ละรายการ
    this.accounts.forEach((account: any) => {
      if (account.transactions && account.transactions.length > 0) {
        account.transactions.forEach((transaction: any) => {
          // เพิ่ม accountName เข้าไปใน transaction
          transactions.push({
            ...transaction,
            accountName: account.accountName,
            accountId: account._id,
          });
        });
      }
    });

    // // เรียงลำดับธุรกรรมจากใหม่ไปเก่า
    this.allTransaction = transactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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
