import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PassengerService } from '../../passenger.service';
import { Passenger } from '../../passenger.model';
import './../../types';

@Component({
  selector: 'app-passenger-delete',
  templateUrl: './passenger-delete.component.html',
  styleUrls: ['./passenger-delete.component.scss']
})
export class PassengerDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  passenger: Passenger;
  passengerId: IdType;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private passengerService: PassengerService) { }

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.passengerId = this.router.url.toString().slice(index + 1);
    this.getPassengerById();
    this.deleteForm = this.formBuilder.group({
      id: this.passenger._id
    });
  }

  getPassengerById() {
    this.passenger = new Passenger();
    this.passenger._id = this.passengerId;
    this.passengerService.getPassengerById(this.passenger)
      .subscribe(passenger => this.passenger = passenger);
  }

  // convenience getter for easy access to form fields
  get f() { return this.deleteForm.controls; }

  onSubmit() {
    this.passengerService.deletePassenger(this.deleteForm.value)
      .pipe(first())
      .subscribe(
        passenger => {
          this.passenger = passenger;
          this.router.navigate(['/passenger']);
          // this.onRefresh();
        });
  }
}
