import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TrainService } from '../../train.service';
import { Train } from '../../train.model';
import './../../types';

@Component({
  selector: 'app-train-edit',
  templateUrl: './train-edit.component.html',
  styleUrls: ['./train-edit.component.scss']
})
export class TrainEditComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  submitted = false;
  train: Train;
  trainId: IdType;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private trainService: TrainService) { }

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.trainId = this.router.url.toString().slice(index + 1);
    this.trainId = this.trainId.slice(0, this.trainId.length - 3);
    this.getTrainById();
    this.editForm = this.formBuilder.group({
      id: this.train._id,
      name: [this.train.name, Validators.required],
      route: [this.train.route, Validators.required],
      number: [this.train.number, Validators.required],
      seatsQuantity: [this.train.seatsQuantity, Validators.required]
    });
  }

  getTrainById() {
    this.train = new Train();
    this.train._id = this.trainId;
    this.trainService.getTrainById(this.train)
      .subscribe(train => this.train = train);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.trainService.editTrain(this.editForm.value)
      .pipe(first())
      .subscribe(
        train => {
          this.train = train;
          this.router.navigate(['/train']);
          // this.onRefresh();
        },
        error => {
          this.loading = false;
        });
  }
}
