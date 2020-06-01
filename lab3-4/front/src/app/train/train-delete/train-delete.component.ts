import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TrainService } from '../../train.service';
import { Train } from '../../train.model';
import './../../types';

@Component({
  selector: 'app-train-delete',
  templateUrl: './train-delete.component.html',
  styleUrls: ['./train-delete.component.scss']
})
export class TrainDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  train: Train;
  trainId: IdType;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private trainService: TrainService) { }

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.trainId = this.router.url.toString().slice(index + 1);
    this.getTrainById();
    this.deleteForm = this.formBuilder.group({
      id: this.train._id
    });
  }

  getTrainById() {
    this.train = new Train();
    this.train._id = this.trainId;
    this.trainService.getTrainById(this.train)
      .subscribe(train => this.train = train);
  }

  // convenience getter for easy access to form fields
  get f() { return this.deleteForm.controls; }

  onSubmit() {
    this.trainService.deleteTrain(this.deleteForm.value)
      .pipe(first())
      .subscribe(
        train => {
          this.train = train;
          this.router.navigate(['/train']);
          // this.onRefresh();
        });
  }
}
