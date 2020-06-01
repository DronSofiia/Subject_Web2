import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { PassengerCreateComponent } from './passenger-create/passenger-create.component';
import { PassengerEditComponent } from './passenger-edit/passenger-edit.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';

@NgModule({
  declarations: [
    PassengerComponent,
    PassengerListComponent,
    PassengerCreateComponent,
    PassengerEditComponent,
    PassengerDeleteComponent
  ],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PassengerModule { }
