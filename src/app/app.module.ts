import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HtmlPipe } from './pipes/html.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTransactionV2Component } from './add-transaction-v2/add-transaction-v2.component';
import { EditTransactionV2Component } from './edit-transaction-v2/edit-transaction-v2.component';
import { AccountComponent } from './account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { AddAccountTransactionComponent } from './add-account-transaction/add-account-transaction.component';

import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, 
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
    AddAccountTransactionComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BaseChartDirective
  ],

  providers: [
    provideClientHydration(), 
    provideAnimationsAsync(),
  ],

  bootstrap: [
    AppComponent,
  ],

})
export class AppModule {
}
