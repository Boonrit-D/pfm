import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { AddTransactionV2Component } from './add-transaction-v2/add-transaction-v2.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
