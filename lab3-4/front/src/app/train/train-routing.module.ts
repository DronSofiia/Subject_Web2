import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainComponent } from './train.component';
import { TrainEditComponent } from './train-edit/train-edit.component';
import { TrainDeleteComponent } from './train-delete/train-delete.component';

const routes: Routes = [
  {
    path: 'train',
    component: TrainComponent
  },
  {
    path: 'train/edit/:id',
    component: TrainEditComponent
  },
  {
    path: 'train/remove/:id',
    component: TrainDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainRoutingModule { }
