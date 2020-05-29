import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainRoutingModule } from './train-routing.module';
import { TrainComponent } from './train.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainListComponent } from './train-list/train-list.component';
import { TrainCreateComponent } from './train-create/train-create.component';
import { TrainEditComponent } from './train-edit/train-edit.component';
import { TrainDeleteComponent } from './train-delete/train-delete.component';

@NgModule({
  declarations: [
    TrainComponent,
    TrainListComponent,
    TrainCreateComponent,
    TrainEditComponent,
    TrainDeleteComponent
  ],
  imports: [
    CommonModule,
    TrainRoutingModule,
    ReactiveFormsModule
  ]
})
export class TrainModule { }
