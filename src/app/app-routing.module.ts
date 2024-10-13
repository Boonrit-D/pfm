// Imports NgModule for defining Angular modules and RouterModule for routing functionality.
// นำเข้า NgModule สำหรับการกำหนดโมดูลใน Angular และ RouterModule สำหรับฟังก์ชันการจัดการเส้นทาง.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ►►► Main components ◄◄◄
// ►►► คอมโพเนนต์หลัก ◄◄◄

// Import main component for the application structure
// นำเข้าคอมโพเนนต์หลักสำหรับโครงสร้างของแอปพลิเคชัน
import { HomeComponent } from './home/home.component';

// ส่วนตัวอย่าง || ส่วนที่จะถูกแก้ไข || ส่วนที่จะถูนำออกในเวอร์ชันใช้งานจริง
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { AddTransactionV2Component } from './add-transaction-v2/add-transaction-v2.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { EditTransactionV2Component } from './edit-transaction-v2/edit-transaction-v2.component';
import { AccountComponent } from './account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { AddAccountTransactionComponent } from './add-account-transaction/add-account-transaction.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import { EditAccountTransactionComponent } from './edit-account-transaction/edit-account-transaction.component';

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

  // ส่วนตัวอย่าง || ส่วนที่จะถูกแก้ไข || ส่วนที่จะถูนำออกในเวอร์ชันใช้งานจริง
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },

  // Transaction version 1
  {
    path: 'add-transaction',
    component: AddTransactionComponent,
    title: 'Add Transaction', // หน้าสำหรับเพิ่ม Transaction
  },
  {
    path: 'add-transactionV2',
    component: AddTransactionV2Component,
    title: 'Add TransactionV2', // หน้าสำหรับเพิ่ม Transaction Version 2
  },

  // Transaction version 2
  {
    path: 'edit-transaction/:id',
    component: EditTransactionComponent,
    title: 'Edit Transaction', // หน้าสำหรับแก้ไข Transaction
  },
  {
    path: 'edit-transactionV2/:id',
    component: EditTransactionV2Component,
    title: 'Edit TransactionV2', // หน้าสำหรับเพิ่ม Transaction Version 2
  },

  // Account Path
  // เส้นทางของบัญชี
  {
    // Account Page
    // หน้าบัญชี
    path: 'account',
    component: AccountComponent,
    title: 'Account',
  },
  {
    // Add Account Page
    // หน้าเพิ่มบัญชี
    path: 'add-account',
    component: AddAccountComponent,
    title: 'Add account',
  },
  {
    // Edit Account Page
    // หน้าแก้ไขบัญชี
    path: 'edit-account/:id',
    component: EditAccountComponent,
    title: 'Edit account',
  },
  {
    // Account Dashboard Page
    // หน้าภาพรวมของบัญชี
    path: 'account/dashboard/:id',
    component: AccountDashboardComponent,
    title: 'Account dashboard',
  },

  // Account Transaction Path
  // เส้นทางของการทำธุรกรรมของบัญชี
  {
    // Page For Adding Account Transactions
    // หน้าเพิ่มรายการธุรกรรมของบัญชี
    path: 'account/add-transaction/:id',
    component: AddAccountTransactionComponent,
    title: "Add transaction's account",
  },
  {
    // Account Transaction Page
    // หน้ารายการธุรกรรมของบัญชี
    path: 'account/transaction/:id',
    component: AccountTransactionComponent,
    title: "transaction's account",
  },
  {
    // Page For Editing Account Transactions
    // หน้าแก้ไขรายการธุรกรรมของบัญชี
    path: 'account/edit-transaction/:accountId/:transactionId',
    component: EditAccountTransactionComponent,
    title: "edit transaction's account",
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
