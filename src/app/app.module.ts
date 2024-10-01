/* 
EN:
Main module of the Angular application
Includes the import of necessary modules for the application to function
- BrowserModule: for running in the browser
- AppRoutingModule: for managing routes in the application
- FormsModule: for creating template-driven forms
- ReactiveFormsModule: for creating reactive forms
- HttpClientModule: for working with HTTP requests
- Animation Module: for managing animations
- BaseChartDirective: for creating charts using ng2-charts
- HtmlPipe: a custom pipe for handling HTML content in the application

ไทย:
โมดูลหลักของแอปพลิเคชัน Angular
รวมถึงการนำเข้าโมดูลที่จำเป็นสำหรับการทำงานของแอปพลิเคชัน
- BrowserModule: สำหรับการทำงานในเบราว์เซอร์
- AppRoutingModule: สำหรับการจัดการเส้นทางในแอปพลิเคชัน
- FormsModule: สำหรับการสร้างฟอร์มแบบ Template-driven
- ReactiveFormsModule: สำหรับการสร้างฟอร์มแบบ Reactive
- HttpClientModule: สำหรับการทำงานกับ HTTP requests
- Animation Module: สำหรับการจัดการอนิเมชัน
- BaseChartDirective: สำหรับการสร้างกราฟโดยใช้ ng2-charts
- HtmlPipe: Pipe ที่กำหนดเองเพื่อจัดการกับ HTML content ในแอปพลิเคชัน
 */
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HtmlPipe } from './pipes/html.pipe';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

// Component Imports
// นำเข้าคอมโพเนนต์ที่ใช้ในแอปพลิเคชัน
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { AddTransactionV2Component } from './add-transaction-v2/add-transaction-v2.component';
import { EditTransactionV2Component } from './edit-transaction-v2/edit-transaction-v2.component';
import { AccountComponent } from './account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { AddAccountTransactionComponent } from './add-account-transaction/add-account-transaction.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import { EditAccountTransactionComponent } from './edit-account-transaction/edit-account-transaction.component';

// NgModule Decorator
// โมดูลหลักของแอปพลิเคชันที่กำหนดคอมโพเนนต์, ฟีเจอร์ และบริการที่จำเป็น
@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    HomeComponent,
    FooterComponent,
    HtmlPipe,
    DashboardComponent,
    AddTransactionComponent,
    EditTransactionComponent,
    AddTransactionV2Component,
    EditTransactionV2Component,
    AccountComponent,
    AddAccountComponent,
    EditAccountComponent,
    AccountDashboardComponent,
    AddAccountTransactionComponent,
    AccountTransactionComponent,
    EditAccountTransactionComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
  ],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
