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

const routes: Routes = [

  // Main
  {
    path: '', component: HomeComponent, pathMatch: 'full', title: 'Personal Financial Management'  // หน้าแรก
  },
  {
    path: 'dashboard', component: DashboardComponent, title: 'Dashboard' // หน้า Dashboard
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

  // Account
  {
    path: 'account', component: AccountComponent, title: 'Account' // หน้าบัญชี
  },
  {
    path: 'add-account', component: AddAccountComponent, title: 'Add account' // เพิ่มบัญชี
  },
  {
    path: 'edit-account/:id', component: EditAccountComponent, title: 'Edit account' // หน้าแก้ไขบัญชี
  },
  {
    path: 'account/dashboard/:id', component: AccountDashboardComponent, title: 'Account dashboard' // หน้าแดชบอร์ดของบัญชี
  },

  // Account transaction
  {
    path: 'account/add-transaction/:id', component: AddAccountTransactionComponent, title: 'Add transaction\'s account' // หน้าเพิ่มรายการธุรกรรมของบัญชี
  },
  {
    path: 'account/transaction/:id', component: AccountTransactionComponent, title: 'transaction\'s account' // รายการธุรกรรมของบัญชี
  },
  {
    path: 'account/edit-transaction/:accountId/:transactionId', component: EditAccountTransactionComponent, title: 'edit transaction\'s account' // หน้าแก้ไขรายการธุรกรรมของบัญชี
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
