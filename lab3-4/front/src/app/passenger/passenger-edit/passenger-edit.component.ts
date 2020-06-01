import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PassengerService } from '../../passenger.service';
import { Passenger } from '../../passenger.model';
import './../../types';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.scss']
})
export class PassengerEditComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  submitted = false;
  passenger: Passenger;
  passengerId: IdType;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private passengerService: PassengerService) { }

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.passengerId = this.router.url.toString().slice(index + 1);
    this.passengerId = this.passengerId.slice(0, this.passengerId.length - 3);
    this.getPassengerById();
    this.editForm = this.formBuilder.group({
      id: this.passenger._id,
      name: [this.passenger.name, Validators.required],
      surName: [this.passenger.surName, Validators.required],
      passportID: [this.passenger.passportID, Validators.required]
    });
  }

  getPassengerById() {
    this.passenger = new Passenger();
    this.passenger._id = this.passengerId;
    this.passengerService.getPassengerById(this.passenger)
      .subscribe(passenger => this.passenger = passenger);
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
    this.passengerService.editPassenger(this.editForm.value)
      .pipe(first())
      .subscribe(
        passenger => {
          this.passenger = passenger;
          this.router.navigate(['/passenger']);
          // this.onRefresh();
        },
        error => {
          this.loading = false;
        });
  }
}
