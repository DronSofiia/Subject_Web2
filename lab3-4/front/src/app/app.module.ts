import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './http-errors/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PassengerModule } from './passenger/passenger.module';
import { TrainModule } from './train/train.module';
import { TicketModule } from './ticket/ticket.module';
import { ReportsModule } from './reports/reports.module';
import './types';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PassengerModule,
    TrainModule,
    TicketModule,
    ReportsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
