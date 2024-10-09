import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../services/crud.service';
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

  // 
  currentDate = new Date();
  // 
  isLoading: boolean = true;
  // 
  isBrowser: boolean;

  // Chart
  title = 'dashboard-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    // labels: this.getLastSixMonths(),
    labels: ['เงิน'],
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

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private CrudService: CrudService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Register Chart.js controllers, elements, and plugins
    Chart.register(...registerables);

    setTimeout(() => {
      this.isLoading = false; // เปลี่ยนสถานะการโหลดเป็น false
    }, 1000); // หน่วงเวลา 2000 มิลลิวินาที หรือ 2 วินาที
  }
}
