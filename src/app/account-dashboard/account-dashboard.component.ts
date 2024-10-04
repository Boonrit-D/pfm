import { Component, OnInit, NgZone, Inject, PLATFORM_ID  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BarController, Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css',
})
export class AccountDashboardComponent implements OnInit {
  getId: any;
  account: any;
  transactionsOfAccount: any;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  isLoading: boolean = true;
  isBrowser: boolean;
  recentTransactions: any;

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.getLastSixMonths(),
    datasets: [
      { 
        data: [], 
        label: 'เงินเข้า +',
        backgroundColor: 'rgb(34 197 94)',
        borderSkipped: 'bottom',
        borderWidth: 1,
        borderRadius: 2,
      },
      { 
        data: [], 
        label: 'เงินออก -',
        backgroundColor: 'rgb(239 68 68)',
        borderWidth: 1,
        borderRadius: 3,
      },
        
    ],
    
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Get ID
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    
    this.isBrowser = isPlatformBrowser(this.platformId);
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

      // อัปเดต recentTransactions ให้แสดงแค่ 3 รายการล่าสุด
      this.recentTransactions = this.transactionsOfAccount.slice(-3).reverse();
      
      // คำนวณและอัปเดตยอดเงินคงเหลือ
      this.updateBalance();   

      // คำนวณยอดรายได้และค่าใช้จ่ายประจำเดือน
      this.calculateTotalIncome();
      this.calculateTotalExpenses();

      // อัปเดตข้อมูลในกราฟหลังจากได้ข้อมูลธุรกรรมแล้ว
      this.updateChartData(); // เรียกใช้ฟังก์ชันนี้เพื่ออัปเดตกราฟ

      // ตั้งเวลาให้รอ 2 วินาทีก่อนแสดงกราฟ
      setTimeout(() => {
        this.isLoading = false; // เปลี่ยนสถานะการโหลดเป็น false
      }, 1000); // หน่วงเวลา 2000 มิลลิวินาที หรือ 2 วินาที
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

  // ฟังก์ชันเพื่อสร้าง labels สำหรับกราฟ
  getLastSixMonths(): string[] {
    if (typeof window === 'undefined') {
      return []; // หรือจัดการกรณีที่ไม่ใช่เบราว์เซอร์ 
    }
    const months: string[] = [];
    const currentDate = new Date();

    // ตรวจสอบขนาดหน้าจอ
    const isSmallScreen = window.innerWidth < 768; // ถ้าขนาดจอน้อยกว่า 768px (สามารถปรับได้ตามต้องการ)
    const numberOfMonths = isSmallScreen ? 3 : 6; // กำหนดจำนวนเดือนที่จะแสดง
    
    for (let i = 0; i < numberOfMonths; i++) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.unshift(month.toLocaleString('default', { month: 'long' })); // ชื่อเดือนในรูปแบบยาว
    }
    
    return months;
  }

  // ฟังก์ชันเพื่ออัปเดตข้อมูลกราฟ
  
  updateChartData() {
    if (this.barChartData.labels) {
      const incomeData = Array(this.barChartData.labels.length).fill(0);
      const expensesData = Array(this.barChartData.labels.length).fill(0);

      this.transactionsOfAccount.forEach((txn: any) => {
        const monthIndex = this.getLastSixMonths().findIndex(month => month === new Date(txn.date).toLocaleString('default', { month: 'long' }));
        if (monthIndex >= 0) {
          if (txn.amount > 0) {
            incomeData[monthIndex] += txn.amount; // เพิ่มข้อมูลที่เป็นบวกลงในเงินเข้า
          } else {
            expensesData[monthIndex] += Math.abs(txn.amount); // เพิ่มข้อมูลที่เป็นลบลงในเงินออก
          }
        }
      });

      this.barChartData.datasets[0].data = incomeData; // อัปเดตข้อมูลเงินเข้า
      this.barChartData.datasets[1].data = expensesData; // อัปเดตข้อมูลเงินออก
    }
  }

}
