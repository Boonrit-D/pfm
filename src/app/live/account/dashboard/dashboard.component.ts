import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../services/crud.service';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-demo-dashboard',
  host: { '[attr.data-id]': 'uniqueId' },
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AccountDashboardComponent implements OnInit {
  // Declaring
  getAccountId: any;
  account: any;
  transactionsForCurrentAccount: any;

  // Calculator variables
  totalIncome: number = 0;
  totalExpenses: number = 0;

  // UI and Processing
  isLoading: boolean = true;
  isBrowser: boolean;
  recentTransactions: any;
  showPopover = false;
  mouseX: number = 0;
  mouseY: number = 0;

  // ►►► Constructor ◄◄◄
  constructor(
    private activatedRouter: ActivatedRoute,
    private crudService: CrudService,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Get ID
    this.getAccountId = this.activatedRouter.snapshot.paramMap.get('accountId');
    //
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ►►► Charts ◄◄◄
  //
  // title = 'demo-chart-account';

  //
  public barChartLegend = true;
  public barChartPlugins = [];

  // Bar chart
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
    scales: {
      x: {
        grid: {
          display: false, // เอาเส้นกริดของแกน x ออก
        },
        ticks: {
          font: {
            family: 'Mitr', // ใช้ฟอนต์ Mitr สำหรับแกน y
          },
        },
      },
      y: {
        grid: {
          display: false, // เอาเส้นกริดของแกน y ออก
        },
        ticks: {
          font: {
            family: 'Mitr', // ใช้ฟอนต์ Mitr สำหรับแกน y
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'triangle', // สามารถเปลี่ยนเป็น 'rect', 'cross', 'triangle', 'line', 'star' ได้
          font: {
            family: 'Mitr', // หรือใช้ฟอนต์ที่คุณต้องการ
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Mitr', // ใช้ฟอนต์ Mitr สำหรับ tooltip
        },
      },
    },
  };

  // Pie Chart
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['เงินเข้า +', 'เงินออก -'], // กำหนด label ที่ต้องการ
    datasets: [
      {
        data: [0, 0], // กำหนดข้อมูลที่ต้องการแสดงใน Pie Chart
        backgroundColor: [
          '#3abc3a', // สีสำหรับ 'เงินเข้า'
          '#e21414', // สีสำหรับ 'เงินออก'
        ],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        position: 'left',
        display: true, // แสดงชื่อ
        text: 'ภาพรวมประจำเดือน', // ชื่อที่ต้องการแสดง
        font: {
          family: 'Mitr',
          size: 20, // ขนาดฟอนต์ของชื่อ
          weight: 'bold', // น้ำหนักฟอนต์ (bold, normal, etc.)
        },
        color: 'black', // สีของชื่อ
        padding: {
          top: 0, // ระยะห่างด้านบน
          bottom: 0, // ระยะห่างด้านล่าง
        },
      },
      legend: {
        position: 'bottom', // เลือกตำแหน่งขวา
        labels: {
          usePointStyle: true, // ใช้รูปแบบจุดแทนสี่เหลี่ยม
          font: {
            family: 'Mitr',
            style: 'italic', // รูปแบบตัวเอียง
          },
          // color: 'blue', // เปลี่ยนสีของ labels
        },
      },
    },
  };

  setChartData(income: number, expense: number) {
    this.pieChartData.datasets[0].data = [income, expense];
    this.pieChartData.labels = [
      `เงินเข้า + (${income})`,
      `เงินออก - (${expense})`,
    ];
  }

  // ฟังก์ชันเพื่ออัปเดตข้อมูลกราฟ

  updateChartData() {
    if (this.barChartData.labels) {
      const incomeData = Array(this.barChartData.labels.length).fill(0);
      const expensesData = Array(this.barChartData.labels.length).fill(0);

      this.transactionsForCurrentAccount.forEach((txn: any) => {
        const monthIndex = this.getLastSixMonths().findIndex(
          (month) =>
            month ===
            new Date(txn.date).toLocaleString('default', { month: 'long' })
        );
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

  ngOnInit(): void {
    if (this.isBrowser) {
      // Register Chart.js controllers, elements, and plugins
      Chart.register(...registerables);

      // Get current account
      this.crudService.getAccount(this.getAccountId).subscribe((res) => {
        this.account = res;
        this.title.setTitle(this.account.accountName);
      });

      // Get all transaction of current account
      this.crudService
        .getTransactionsForCurrentAccount(this.getAccountId)
        .subscribe((res) => {
          this.transactionsForCurrentAccount = res;
          console.log(this.transactionsForCurrentAccount);

          // อัปเดต recentTransactions ให้แสดงแค่ 3 รายการล่าสุด
          this.recentTransactions = this.transactionsForCurrentAccount
            .slice(-3)
            .reverse();

          // คำนวณและอัปเดตยอดเงินคงเหลือ
          this.updateBalance();

          // คำนวณยอดรายได้และค่าใช้จ่ายประจำเดือน
          this.calculateTotalIncome();
          this.calculateTotalExpenses();

          // อัปเดตข้อมูลในกราฟหลังจากได้ข้อมูลธุรกรรมแล้ว
          this.updateChartData(); // เรียกใช้ฟังก์ชันนี้เพื่ออัปเดตกราฟ

          // คำนวณเงินเข้าและเงินออกของเดือนนี้
          const { income, expenses } =
            this.calculateCurrentMonthIncomeAndExpenses();
          this.setChartData(income, expenses); // อัปเดตข้อมูลใน Pie Chart

          // ตั้งเวลาให้รอ 2 วินาทีก่อนแสดงกราฟ
          setTimeout(() => {
            this.isLoading = false; // เปลี่ยนสถานะการโหลดเป็น false
          }, 1000); // หน่วงเวลา 2000 มิลลิวินาที หรือ 2 วินาที
        });

        // Listen to mousemove event on the document
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  //
  getLastSixMonths(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const months: string[] = [];
    const currentDate = new Date();

    const isSmallScreen = window.innerWidth < 768;
    const numberOfMonths = isSmallScreen ? 3 : 6;

    for (let i = 0; i < numberOfMonths; i++) {
      const month = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      months.unshift(month.toLocaleString('default', { month: 'long' }));
    }

    return months;
  }

  // Calculate and update balance
  updateBalance() {
    if (this.transactionsForCurrentAccount) {
      // Calculate the total balance from all transactions.
      const totalBalance: number =
        this.transactionsForCurrentAccount.reduce(
          (acc: number, txn: { amount: number }) => acc + txn.amount,
          0
        );
      this.transactionsForCurrentAccount.balance = totalBalance;

      // Update the balance in the database
      this.crudService
        .updateBalance(this.getAccountId, totalBalance)
        .subscribe((res) => {
          console.log('ยอดเงินคงเหลือถูกอัปเดต:', res);
        });
    }
  }

  calculateTotalIncome() {
    this.totalIncome = this.transactionsForCurrentAccount
      .filter((txn: any) => txn.amount > 0)
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.transactionsForCurrentAccount
      .filter((txn: any) => txn.amount < 0)
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);
  }

  // คำนวณเงินเข้าและเงินออกของเดือนนี้
  calculateCurrentMonthIncomeAndExpenses() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const income = this.transactionsForCurrentAccount
      .filter(
        (txn: any) =>
          txn.amount > 0 &&
          new Date(txn.date).getMonth() === currentMonth &&
          new Date(txn.date).getFullYear() === currentYear
      )
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);

    const expenses = this.transactionsForCurrentAccount
      .filter(
        (txn: any) =>
          txn.amount < 0 &&
          new Date(txn.date).getMonth() === currentMonth &&
          new Date(txn.date).getFullYear() === currentYear
      )
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);

    return { income, expenses };
  }

  onMouseMove(event: MouseEvent) {
    if (this.isBrowser) {
      // Update mouseX and mouseY with the current mouse position including the scroll offset
      const offsetX = 10; // ระยะห่างในแนวนอน (สามารถปรับค่าได้ตามต้องการ)
      const offsetY = 10; // ระยะห่างในแนวตั้ง (สามารถปรับค่าได้ตามต้องการ)
      this.mouseX = event.clientX + window.scrollX + offsetX;; // รวมการ scroll แนวนอน
      this.mouseY = event.clientY + window.scrollY + offsetY;; // รวมการ scroll แนวตั้ง
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      // Clean up the event listener when the component is destroyed
      document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }
}
