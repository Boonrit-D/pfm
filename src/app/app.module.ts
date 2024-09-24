import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

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

// Custom pipe
import { HtmlPipe } from './pipes/html.pipe';

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
    EditTransactionV2Component
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],

})
export class AppModule {
}
