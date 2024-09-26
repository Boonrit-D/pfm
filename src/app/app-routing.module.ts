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

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full', title: 'Personal Financial Management'  // หน้าแรก
  },
  {
    path: 'dashboard', component: DashboardComponent, title: 'Dashboard' // หน้า Dashboard
  },
  {
    path: 'add-transaction', component: AddTransactionComponent, title: 'Add Transaction'  // หน้าสำหรับเพิ่ม Transaction
  },
  {
    path: 'add-transactionV2', component: AddTransactionV2Component, title: 'Add TransactionV2'  // หน้าสำหรับเพิ่ม Transaction Version 2
  },
  {
    path: 'edit-transaction/:id', component: EditTransactionComponent, title: 'Edit Transaction' // หน้าสำหรับแก้ไข Transaction
  },
  {
    path: 'edit-transactionV2/:id', component: EditTransactionV2Component, title: 'Edit TransactionV2' // หน้าสำหรับเพิ่ม Transaction Version 2
  },
  {
    path: 'account', component: AccountComponent, title: 'Account' // หน้าบัญชี
  },
  {
    path: 'add-account', component: AddAccountComponent, title: 'Add account' // เพิ่มบัญชี
  },
  {
    path: 'edit-account/:id', component: EditAccountComponent, title: 'Edit account' // หน้าแก้ไขบัญชี
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
