// Imports NgModule for defining Angular modules and RouterModule for routing functionality.
// นำเข้า NgModule สำหรับการกำหนดโมดูลใน Angular และ RouterModule สำหรับฟังก์ชันการจัดการเส้นทาง.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ►►► Main components ◄◄◄
// ►►► คอมโพเนนต์หลัก ◄◄◄

// Import main component for the application structure
// นำเข้าคอมโพเนนต์หลักสำหรับโครงสร้างของแอปพลิเคชัน
import { HomeComponent } from './home/home.component';


// ►►► Authentication components ◄◄◄
// ►►► คอมโพเนนต์การยืนยันตัวตนเพื่อใช้งาน ◄◄◄

// Import components for user authentication
// นำเข้าคอมโพเนนต์สำหรับการยืนยันตัวตนผู้ใช้
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

// ►►► Demo version components ◄◄◄
// ►►► คอมโพเนนต์ของเวอร์ชันทดลอง ◄◄◄

// Import Components for the demo version that display overall information
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันเดโมที่แสดงข้อมูลโดยรวม
import { DemoDashboardComponent } from './demo/dashboard/dashboard.component';
import { DemoAccountsComponent } from './demo/account/accounts/accounts.component';
import { DemoTransactionsComponent } from './demo/transactions/transactions.component';

// Import components for the demo version of the specific account dashboard and its transaction lists
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันเดโมของแดชบอร์ดบัญชีที่กำหนดและรายการธุรกรรมของบัญชีนั้น
import { DemoAccountDashboardComponent } from './demo/account/dashboard/dashboard.component';
import { DemoTransactionsForAccountComponent } from './demo/account/transactions/transactions.component';

// Import components for managing demo accounts and demo transactions
// นำเข้าคอมโพเนนต์สำหรับการจัดการบัญชีเดโมและธุรกรรมเดโม
import { CreateDemoAccountComponent } from './demo/account/accounts/create-account/create-account.component';
import { UpdateDemoAccountComponent } from './demo/account/accounts/update-account/update-account.component';
import { CreateDemoTransactionComponent } from './demo/account/transactions/create-transaction/create-transaction.component';
import { UpdateDemoTransactionComponent } from './demo/account/transactions/update-transaction/update-transaction.component';

// ►►► Live version components ◄◄◄
// ►►► คอมโพเนนต์ของเวอร์ชันใช้งานจริง ◄◄◄

// Import components for the live version of dashboards, accounts, and transaction lists
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันใช้งานจริงของแดชบอร์ด บัญชี และรายการธุรกรรม
import { DashboardComponent } from './live/dashboard/dashboard.component';
import { AccountsComponent } from './live/account/accounts/accounts.component';
import { TransactionsComponent } from './live/transactions/transactions.component';

// Import components for the live version of the specific account dashboard and its transaction lists
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันการใช้งานจริงของแดชบอร์ดบัญชีที่กำหนดและรายการธุรกรรมของบัญชีนั้น
import { AccountDashboardComponent } from './live/account/dashboard/dashboard.component';
import { TransactionsForAccountComponent } from './live/account/transactions/transactions.component';

// Import components for managing accounts and transactions
// นำเข้าคอมโพเนนต์สำหรับการจัดการบัญชีและธุรกรรม
import { CreateAccountComponent } from './live/account/accounts/create-account/create-account.component';
import { UpdateAccountComponent } from './live/account/accounts/update-account/update-account.component';
import { CreateTransactionComponent } from './live/account/transactions/create-transaction/create-transaction.component';
import { UpdateTransactionComponent } from './live/account/transactions/update-transaction/update-transaction.component';

// Defines the routes for the application using the Routes interface.
// กำหนดเส้นทางสำหรับแอปพลิเคชันโดยใช้ interface Routes.
const routes: Routes = [
  // ►►► Home Page Path ◄◄◄
  // ►►► เส้นทางหน้าหลัก ◄◄◄
  {
    // Home Page
    // หน้าแรกของเว็บไซต์
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Personal Financial Management',
  },

  // ►►► Authentication Paths ◄◄◄
  // ►►► เส้นทางของการยืนยันตัวตนเพื่อใช้งาน ◄◄◄

  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },

  // ►►► Demo version paths ◄◄◄
  // ►►► เส้นทางของเวอร์ชันทดลอง ◄◄◄

  // Path for the demo version that display overall information
  // เส้นทางสำหรับเวอร์ชันทดลองที่แสดงข้อมูลโดยรวม
  {
    path: 'demo/dashboard',
    component: DemoDashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'demo/accounts',
    component: DemoAccountsComponent,
    title: 'Account',
  },
  {
    path: 'demo/transactions',
    component: DemoTransactionsComponent,
    title: 'Transactions',
  },

  // Path for the demo version of the specific account
  // เส้นทางสำหรับเวอร์ชันทดลองของบัญชีที่กำหนด
  {
    path: 'demo/account/:accountId',
    component: DemoAccountDashboardComponent,
  },
  {
    path: 'demo/account/:accountId/transactions',
    component: DemoTransactionsForAccountComponent,
    title: 'Transactions For Account',
  },

  // Path for the demo managing
  // เส้นทางสำหรับการจัดการเวอร์ชันทดลอง
  {
    path: 'demo/create-account',
    component: CreateDemoAccountComponent,
    title: 'Create Account',
  },
  {
    path: 'demo/update-account/:accountId',
    component: UpdateDemoAccountComponent,
    title: 'Update Account',
  },
  {
    path: 'demo/account/:accountId/create-transaction',
    component: CreateDemoTransactionComponent,
    title: 'Create Transaction',
  },
  {
    path: 'demo/account/:accountId/update-transaction/:transactionId',
    component: UpdateDemoTransactionComponent,
    title: 'Update Transaction',
  },

  // ►►► Live version paths ◄◄◄
  // ►►► เส้นทางของเวอร์ชันใช้งานจริง ◄◄◄

  // Path for the live version that display overall information
  // เส้นทางสำหรับเวอร์ชันช้งานจริงที่แสดงข้อมูลโดยรวม
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    title: 'Accounts',
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'transactions',
  },
  
  // Path for the live version of the specific account
  // เส้นทางสำหรับเวอร์ชันใช้งานจริงของบัญชีที่กำหนด 
  {
    path: 'account/:accountId',
    component: AccountDashboardComponent,
  },
  {
    path: 'account/:accountId/transactions',
    component: TransactionsForAccountComponent,
    title: 'Transactions For Account',
  },

  // Path for the live managing
  // เส้นทางสำหรับการจัดการ
  {
    path: 'create-account',
    component: CreateAccountComponent,
    title: 'Create Account',
  },
  {
    path: 'update-account/:accountId',
    component: UpdateAccountComponent,
    title: 'Update Account',
  },
  {
    path: 'account/:accountId/create-transaction',
    component: CreateTransactionComponent,
    title: 'Create Account',
  },
  {
    path: 'account/:accountId/update-transaction/:transactionId',
    component: UpdateTransactionComponent,
    title: 'Update Transaction',
  },
];

/* 
NgModule for routing configuration
โมดูล Ng ที่ใช้สำหรับการกำหนดค่าเส้นทาง
- imports: นำเข้า RouterModule เพื่อจัดการเส้นทางในแอปพลิเคชัน
- exports: ส่งออก RouterModule สำหรับการใช้งานในโมดูลอื่น ๆ
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
