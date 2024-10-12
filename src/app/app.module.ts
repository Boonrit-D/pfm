/* 
English:
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
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';

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
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

// Import components for dashboards, accounts, and transaction lists
// นำเข้าส่วนประกอบสำหรับแดชบอร์ด บัญชี และรายการธุรกรรม
import { DemoDashboardComponent } from './demo/dashboard/dashboard.component';
import { DemoAccountsComponent } from './demo/account/accounts/accounts.component';
import { DemoTransactionsComponent } from './demo/transactions/transactions.component';
//
import { DemoAccountDashboardComponent } from './demo/account/dashboard/dashboard.component';
import { DemoTransactionsForAccountComponent } from './demo/account/transactions/transactions.component';

// Import components for managing accounts and transactions
// นำเข้าส่วนประกอบสำหรับการจัดการบัญชีและธุรกรรม
import { CreateDemoAccountComponent } from './demo/account/accounts/create-account/create-account.component';
import { UpdateDemoAccountComponent } from './demo/account/accounts/update-account/update-account.component';
import { CreateDemoTransactionComponent } from './demo/account/transactions/create-transaction/create-transaction.component';
import { UpdateTransactionComponent } from './demo/account/transactions/update-transaction/update-transaction.component';

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
    RegisterComponent,
    LoginComponent,
    
    // ►►► Demo ◄◄◄
    // All
    DemoDashboardComponent,
    DemoAccountsComponent,
    // Single
    DemoAccountDashboardComponent,
    DemoTransactionsForAccountComponent,
    // Managing
    CreateDemoAccountComponent,
    UpdateDemoAccountComponent,
    CreateDemoTransactionComponent,
    UpdateTransactionComponent,
    DemoTransactionsComponent,
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
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideCharts(withDefaultRegisterables()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, 
      multi: true,
    },    
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
