import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketDeleteComponent } from './ticket-delete/ticket-delete.component';

const routes: Routes = [
  {
    path: 'ticket',
    component: TicketComponent
  },
  {
    path: 'ticket/edit/:id',
    component: TicketEditComponent
  },
  {
    path: 'ticket/remove/:id',
    component: TicketDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
