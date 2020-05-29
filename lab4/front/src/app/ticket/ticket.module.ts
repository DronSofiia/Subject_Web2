import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketDeleteComponent } from './ticket-delete/ticket-delete.component';

@NgModule({
  declarations: [
    TicketComponent,
    TicketListComponent,
    TicketCreateComponent,
    TicketEditComponent,
    TicketDeleteComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule
  ]
})
export class TicketModule { }
