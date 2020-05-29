import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassengerComponent } from './passenger.component';
import { PassengerEditComponent } from './passenger-edit/passenger-edit.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';

const routes: Routes = [
  {
    path: 'passenger',
    component: PassengerComponent
  },
  {
    path: 'passenger/edit/:id',
    component: PassengerEditComponent
  },
  {
    path: 'passenger/remove/:id',
    component: PassengerDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
