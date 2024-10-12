import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DemoCrudService } from '../../services/demo-crud.service';
import { FormBuilder } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
//
export class DemoDashboardComponent implements OnInit {
  // Declaring
  demoTransactionsForAccounts: any;
  demoAccounts: any;
  // Calculator variables
  totalIncome: number = 0;
  totalExpenses: number = 0;
  totalBalance: number = 0;
  //
  currentDate = new Date();
  //
  isLoading: boolean = true;
  //
  isBrowser: boolean;
  //
  recentTransactions: any[] = [];
  allTransaction: any[] = [];

  // Chart
  title = 'dashboard-charts-demo';

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

      this.demoTransactionsForAccounts.forEach((txn: any) => {
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

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private demoCrudService: DemoCrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Register Chart.js controllers, elements, and plugins
      Chart.register(...registerables);

      this.demoCrudService.getAccounts().subscribe((res) => {
        this.demoAccounts = res;

        // เรียกใช้ฟังก์ชันเพื่อดึงธุรกรรมล่าสุด
        this.getRecentTransactions();
      });

      // Get all transactions of all accounts
      this.demoCrudService.getTransactionsForAccounts().subscribe((res) => {
        this.demoTransactionsForAccounts = res;

        // คำนวณยอดรายได้และค่าใช้จ่ายประจำเดือน
        this.calculateTotalIncome();
        this.calculateTotalExpenses();
        this.calculateTotalBalance();

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
    }
  }

  calculateTotalIncome() {
    this.totalIncome = this.demoTransactionsForAccounts
      .filter((txn: any) => txn.amount > 0)
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.demoTransactionsForAccounts
      .filter((txn: any) => txn.amount < 0)
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);
  }

  calculateTotalBalance() {
    this.calculateTotalIncome(); // คำนวณยอดรวมรายได้
    this.calculateTotalExpenses(); // คำนวณยอดรวมค่าใช้จ่าย

    // คำนวณยอดคงเหลือ
    this.totalBalance = this.totalIncome - this.totalExpenses;
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

  // คำนวณเงินเข้าและเงินออกของเดือนนี้
  calculateCurrentMonthIncomeAndExpenses() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const income = this.demoTransactionsForAccounts
      .filter(
        (txn: any) =>
          txn.amount > 0 &&
          new Date(txn.date).getMonth() === currentMonth &&
          new Date(txn.date).getFullYear() === currentYear
      )
      .reduce((acc: number, txn: any) => acc + txn.amount, 0);

    const expenses = this.demoTransactionsForAccounts
      .filter(
        (txn: any) =>
          txn.amount < 0 &&
          new Date(txn.date).getMonth() === currentMonth &&
          new Date(txn.date).getFullYear() === currentYear
      )
      .reduce((acc: number, txn: any) => acc + Math.abs(txn.amount), 0);

    return { income, expenses };
  }

  getRecentTransactions() {
    const transactions: any[] = [];

    // วนลูปเพื่อดึงธุรกรรมจากแต่ละบัญชีและเพิ่มชื่อบัญชีเข้าไปในแต่ละรายการ
    this.demoAccounts.forEach((account: any) => {
      if (account.transactions && account.transactions.length > 0) {
        account.transactions.forEach((transaction: any) => {
          // เพิ่ม accountName เข้าไปใน transaction
          transactions.push({
            ...transaction,
            accountName: account.accountName,
          });
        });
      }
    });

    // เรียงลำดับธุรกรรมจากใหม่ไปเก่า
    this.recentTransactions = transactions
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 3); // ตัดให้แสดงแค่ 3 รายการล่าสุด

    // // เรียงลำดับธุรกรรมจากใหม่ไปเก่า
    // this.allTransaction = transactions.sort((a, b) => {
    //   return new Date(b.date).getTime() - new Date(a.date).getTime();
    // });
  }
}
