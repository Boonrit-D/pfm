import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
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
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
// Demo
import { DemoDashboardComponent } from './demo/dashboard/dashboard.component';
import { DemoAccountsComponent } from './demo/account/accounts/accounts.component';
import { CreateDemoAccountComponent } from './demo/account/accounts/create-account/create-account.component';
import { UpdateDemoAccountComponent } from './demo/account/accounts/update-account/update-account.component';

const routes: Routes = [

  // Home Page Path
  // เส้นทางหน้าหลัก
  {
    // Home Page
    // หน้าแรกของเว็บไซต์
    path: '', component: HomeComponent, pathMatch: 'full', title: 'Personal Financial Management'  
  },

  // Dashboard Path
  // เส้นทางของภาพรวม
  {
    // Dashboard Page
    // หน้าภาพรวม
    path: 'dashboard', component: DashboardComponent, title: 'Dashboard' 
  },

  // Transaction version 1
  {
    path: 'add-transaction', component: AddTransactionComponent, title: 'Add Transaction'  // หน้าสำหรับเพิ่ม Transaction
  },
  {
    path: 'add-transactionV2', component: AddTransactionV2Component, title: 'Add TransactionV2'  // หน้าสำหรับเพิ่ม Transaction Version 2
  },

  // Transaction version 2
  {
    path: 'edit-transaction/:id', component: EditTransactionComponent, title: 'Edit Transaction' // หน้าสำหรับแก้ไข Transaction
  },
  {
    path: 'edit-transactionV2/:id', component: EditTransactionV2Component, title: 'Edit TransactionV2' // หน้าสำหรับเพิ่ม Transaction Version 2
  },

  // Account Path
  // เส้นทางของบัญชี
  {
    // Account Page
    // หน้าบัญชี
    path: 'account', component: AccountComponent, title: 'Account' 
  },
  {
    // Add Account Page
    // หน้าเพิ่มบัญชี
    path: 'add-account', component: AddAccountComponent, title: 'Add account' 
  },
  {
    // Edit Account Page
    // หน้าแก้ไขบัญชี
    path: 'edit-account/:id', component: EditAccountComponent, title: 'Edit account' 
  },
  {
    // Account Dashboard Page
    // หน้าภาพรวมของบัญชี
    path: 'account/dashboard/:id', component: AccountDashboardComponent, title: 'Account dashboard' 
  },

  // Account Transaction Path
  // เส้นทางของการทำธุรกรรมของบัญชี
  {
    // Page For Adding Account Transactions
    // หน้าเพิ่มรายการธุรกรรมของบัญชี
    path: 'account/add-transaction/:id', component: AddAccountTransactionComponent, title: 'Add transaction\'s account' 
  },
  {
    // Account Transaction Page
    // หน้ารายการธุรกรรมของบัญชี
    path: 'account/transaction/:id', component: AccountTransactionComponent, title: 'transaction\'s account' 
  },
  {
    // Page For Editing Account Transactions
    // หน้าแก้ไขรายการธุรกรรมของบัญชี
    path: 'account/edit-transaction/:accountId/:transactionId', component: EditAccountTransactionComponent, title: 'edit transaction\'s account' 
  },

  // Authentication route
  {
    // Register Page
    // หน้าสมัครสมาชิก
    path: 'register', component: RegisterComponent, title: 'Register' 
  },  
  {
    // Login Page
    // หน้าเข้าสู่ระบบ
    path: 'login', component: LoginComponent, title: 'Login' 
  }, 

  // Demo
  // Dashboard
  {
    path: 'demo/dashboard', component: DemoDashboardComponent, title: 'Dashboard'
  },
  // Accounts
  {
    path: 'demo/accounts', component: DemoAccountsComponent, title: 'Account'
  },
  {
    path: 'demo/create-account', component: CreateDemoAccountComponent, title: 'Create Account'
  },
  {
    path: 'demo/update-account/:accountId', component: UpdateDemoAccountComponent, title: 'Update Account'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
