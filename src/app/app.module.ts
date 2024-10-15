/* 
English:
Main module imports for the Angular application
This module includes necessary imports for the application to function properly
- AppRoutingModule: for managing application routes
- AuthInterceptor: for managing authentication tokens in HTTP requests
- BaseChartDirective: for creating charts using ng2-charts
- BrowserModule: essential module for running the application in a browser
- provideAnimationsAsync: for handling animations asynchronously
- provideCharts: to provide chart services and dependencies
- provideClientHydration: for hydration of server-rendered applications
- provideHttpClient: for HTTP client services
- FormsModule: for creating template-driven forms
- ReactiveFormsModule: for creating reactive forms
- HTML_INTERCEPTORS: to manage HTTP request interception
- withDefaultRegisterables: to register default chart components
- withFetch: for using fetch requests in the HTTP client
- withInterceptorsFromDi: for adding interceptors from the dependency injection
- HtmlPipe: a custom pipe for handling HTML content in the application
- JwtInterceptor: for handling JWT authentication tokens
- NgModule: decorator that defines a module in Angular

ไทย:
การนำเข้าสำหรับโมดูลหลักของแอปพลิเคชัน Angular
โมดูลนี้รวมถึงการนำเข้าสำคัญที่จำเป็นสำหรับการทำงานของแอปพลิเคชัน
- AppRoutingModule: สำหรับการจัดการเส้นทางของแอปพลิเคชัน
- AuthInterceptor: สำหรับจัดการ token การตรวจสอบตัวตนใน HTTP requests
- BaseChartDirective: สำหรับการสร้างกราฟโดยใช้ ng2-charts
- BrowserModule: โมดูลที่จำเป็นสำหรับการทำงานของแอปพลิเคชันในเบราว์เซอร์
- provideAnimationsAsync: สำหรับจัดการอนิเมชันแบบอะซิงโครนัส
- provideCharts: สำหรับจัดหาบริการและ dependencies ของกราฟ
- provideClientHydration: สำหรับการทำให้แอปพลิเคชันที่เรนเดอร์จากเซิร์ฟเวอร์ทำงานได้
- provideHttpClient: สำหรับบริการ HTTP client
- FormsModule: สำหรับการสร้างฟอร์มแบบ Template-driven
- ReactiveFormsModule: สำหรับการสร้างฟอร์มแบบ Reactive
- HTML_INTERCEPTORS: สำหรับจัดการการแทรกซ้อนของ HTTP requests
- withDefaultRegisterables: สำหรับลงทะเบียนคอมโพเนนต์กราฟเริ่มต้น
- withFetch: สำหรับการใช้ fetch requests ใน HTTP client
- withInterceptorsFromDi: สำหรับเพิ่ม interceptors จากการจัดการ dependency injection
- HtmlPipe: Pipe ที่กำหนดเองเพื่อจัดการกับ HTML content ในแอปพลิเคชัน
- JwtInterceptor: สำหรับจัดการ JWT authentication tokens
- NgModule: decorator ที่กำหนดโมดูลใน Angular
 */
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HtmlPipe } from './pipes/html.pipe';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgModule } from '@angular/core';

// ►►► Main components ◄◄◄
// ►►► คอมโพเนนต์หลัก ◄◄◄

// Import main components for the application structure
// นำเข้าคอมโพเนนต์หลักสำหรับโครงสร้างของแอปพลิเคชัน
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

// ►►► Authentication components ◄◄◄
// ►►► คอมโพเนนต์การยืนยันตัวตนเพื่อใช้งาน ◄◄◄

// Import components for user authentication
// นำเข้าคอมโพเนนต์สำหรับการยืนยันตัวตนผู้ใช้
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

// ►►► Demo version components ◄◄◄
// ►►► คอมโพเนนต์ของเวอร์ชันทดลอง ◄◄◄

// Import components for the demo version of dashboards, accounts, and transaction lists
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันเดโมของแดชบอร์ด บัญชี และรายการธุรกรรม
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

// Import components for the demo version of the specific account dashboard and its transaction lists
// นำเข้าคอมโพเนนต์สำหรับเวอร์ชันเดโมของแดชบอร์ดบัญชีที่กำหนดและรายการธุรกรรมของบัญชีนั้น
import { AccountDashboardComponent } from './live/account/dashboard/dashboard.component';
import { TransactionsForAccountComponent } from './live/account/transactions/transactions.component';

// Import components for managing accounts and demo transactions
// นำเข้าคอมโพเนนต์สำหรับการจัดการบัญชีและธุรกรรม
import { CreateAccountComponent } from './live/account/accounts/create-account/create-account.component';
import { UpdateAccountComponent } from './live/account/accounts/update-account/update-account.component';
import { CreateTransactionComponent } from './live/account/transactions/create-transaction/create-transaction.component';
import { UpdateTransactionComponent } from './live/account/transactions/update-transaction/update-transaction.component';

/* 
NgModule Decorator
The main module of the application that defines necessary components, features, and services.
- declarations: List of components used in the application
- imports: Modules imported for use in the application
- providers: Services and interceptors used in the application
- bootstrap: The main component used to start the application

ตัวตกแต่ง NgModule
โมดูลหลักของแอปพลิเคชันที่กำหนดคอมโพเนนต์, ฟีเจอร์ และบริการที่จำเป็น
- declarations: รายการคอมโพเนนต์ที่ใช้ในแอปพลิเคชัน
- imports: โมดูลที่นำเข้าเพื่อใช้งานในแอปพลิเคชัน
- providers: บริการและ interceptor ที่ใช้ในแอปพลิเคชัน
- bootstrap: คอมโพเนนต์หลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน
*/
@NgModule({
  declarations: [
    // ►►► Main components ◄◄◄
    // ►►► คอมโพเนนต์หลัก ◄◄◄

    // Components for the application structure
    // คอมโพเนนต์หลักสำหรับโครงสร้างของแอปพลิเคชัน
    AppComponent,
    HeaderBarComponent,
    HomeComponent,
    FooterComponent,

    // HtmlPipe: Custom pipe for handling and sanitizing HTML content in the application
    // HtmlPipe: Pipe ที่กำหนดเองสำหรับจัดการและทำความสะอาดเนื้อหา HTML ในแอปพลิเคชัน
    HtmlPipe,

    // ส่วนตัวอย่าง || ส่วนที่จะถูกแก้ไข || ส่วนที่จะถูนำออกในเวอร์ชันใช้งานจริง

    // ►►► Authentication components ◄◄◄
    // ►►► ส่วนประกอบการยืนยันตัวตนเพื่อใช้งาน ◄◄◄

    // Components for user authentication
    // คอมโพเนนต์สำหรับการยืนยันตัวตนผู้ใช้
    RegisterComponent,
    LoginComponent,

    // ►►► Demo version components ◄◄◄
    // ►►► ส่วนประกอบของเวอร์ชันทดลอง ◄◄◄

    // Components for the demo version that display overall information
    // คอมโพเนนต์สำหรับเวอร์ชันเดโมที่แสดงข้อมูลโดยรวม
    DemoDashboardComponent,
    DemoAccountsComponent,
    DemoTransactionsComponent,
    // Components for the demo version of the specific account
    // คอมโพเนนต์สำหรับเวอร์ชันเดโมของบัญชีที่กำหนด
    DemoAccountDashboardComponent,
    DemoTransactionsForAccountComponent,
    // Components for managing
    // คอมโพเนนต์สำหรับการจัดการ
    CreateDemoAccountComponent,
    UpdateDemoAccountComponent,
    CreateDemoTransactionComponent,
    UpdateDemoTransactionComponent,

    // ►►► Live version components ◄◄◄
    // ►►► คอมโพเนนต์ของเวอร์ชันใช้งานจริง ◄◄◄

    // Import components for the live version of dashboards, accounts, and transaction lists
    // นำเข้าคอมโพเนนต์สำหรับเวอร์ชันใช้งานจริงของแดชบอร์ด บัญชี และรายการธุรกรรม
    DashboardComponent,
    AccountsComponent,
    TransactionsComponent,
    // Components for the live version of the specific account
    // คอมโพเนนต์สำหรับเวอร์ชันใช้งานจริงของบัญชีที่กำหนด
    AccountDashboardComponent,
    TransactionsForAccountComponent,
    // Components for managing
    // คอมโพเนนต์สำหรับการจัดการ
    CreateAccountComponent,
    UpdateAccountComponent,
    CreateTransactionComponent,
    UpdateTransactionComponent,
  ],

  imports: [
    /* 
    English:
    Modules required for the Angular application
    - BrowserModule: essential module for running the application in a web browser
    - AppRoutingModule: for managing navigation and routing within the application
    - FormsModule: for building template-driven forms
    - ReactiveFormsModule: for building reactive forms with Angular
    - BaseChartDirective: directive for creating charts using ng2-charts

    ไทย:
    โมดูลที่จำเป็นสำหรับแอปพลิเคชัน Angular
    - BrowserModule: โมดูลที่จำเป็นสำหรับการทำงานของแอปพลิเคชันในเว็บเบราว์เซอร์
    - AppRoutingModule: สำหรับการจัดการการนำทางและเส้นทางในแอปพลิเคชัน
    - FormsModule: สำหรับการสร้างฟอร์มแบบ Template-driven
    - ReactiveFormsModule: สำหรับการสร้างฟอร์มแบบ Reactive ใน Angular
    - BaseChartDirective: directive สำหรับการสร้างกราฟโดยใช้ ng2-charts
    */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
  ],

  /* 
  English:
  Providers for application services and interceptors
  - provideClientHydration: for hydration of server-rendered applications
  - provideAnimationsAsync: for handling animations asynchronously
  - provideHttpClient: to configure HTTP client services with interceptors and fetch support
  - provideCharts: to provide chart services and default registerables
  - HTTP_INTERCEPTORS: for configuring interceptors for handling authentication tokens
    - AuthInterceptor: interceptor for managing authentication tokens in HTTP requests
    - JwtInterceptor: interceptor for managing JWT authentication tokens in HTTP requests

  ไทย:
  ผู้ให้บริการสำหรับบริการและ interceptor ของแอปพลิเคชัน
  - provideClientHydration: สำหรับการทำให้แอปพลิเคชันที่เรนเดอร์จากเซิร์ฟเวอร์ทำงานได้
  - provideAnimationsAsync: สำหรับจัดการอนิเมชันแบบอะซิงโครนัส
  - provideHttpClient: สำหรับกำหนดบริการ HTTP client พร้อมการสนับสนุน interceptor และ fetch
  - provideCharts: สำหรับจัดหาบริการกราฟและการลงทะเบียนเริ่มต้น
  - HTTP_INTERCEPTORS: สำหรับกำหนดค่า interceptors เพื่อจัดการกับ token การตรวจสอบตัวตน
    - AuthInterceptor: interceptor สำหรับจัดการ token การตรวจสอบตัวตนใน HTTP requests
    - JwtInterceptor: interceptor สำหรับจัดการ JWT authentication tokens ใน HTTP requests
  */
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideCharts(withDefaultRegisterables()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],

  // Bootstrap component for the Angular application
  // - AppComponent: the main component that initializes and runs the application
  // คอมโพเนนต์หลักสำหรับการเริ่มต้นแอปพลิเคชัน Angular
  // - AppComponent: คอมโพเนนต์หลักที่ใช้ในการเริ่มต้นและรันแอปพลิเคชัน
  bootstrap: [AppComponent],
})

// AppModule: Main module class for the Angular application.
// AppModule: คลาสโมดูลหลักสำหรับแอปพลิเคชัน Angular.
export class AppModule {}
