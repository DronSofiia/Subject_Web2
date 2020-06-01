import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TicketService } from '../../ticket.service';
import { Ticket } from '../../ticket.model';
import {Passenger} from '../../passenger.model';
import {Train} from '../../train.model';
import {PassengerService} from '../../passenger.service';
import {TrainService} from '../../train.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss']
})
export class TicketCreateComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  ticket: Ticket;
  passengers: Passenger[];
  trains: Train[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ticketService: TicketService,
              private passengerService: PassengerService,
              private trainService: TrainService) { }

  ngOnInit() {
    this.getPassengers();
    this.getTrains();
    this.createForm = this.formBuilder.group({
      number: ['', Validators.required],
      price: ['', Validators.required],
      passenger_id: ['', Validators.required],
      train_id: ['', Validators.required],
      seatNumber: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    this.ticketService.createTicket(this.createForm.value)
      .pipe(first())
      .subscribe(
        ticket => {
          this.ticket = ticket;
          // this.router.navigate(['/ticket']);
          this.onRefresh();
        },
        error => {
          this.loading = false;
        });
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  getPassengers() {
    this.passengerService.getPassengers()
      .subscribe(passengers => this.passengers = passengers);
  }

  getTrains() {
    this.trainService.getTrains()
      .subscribe(trains => this.trains = trains);
  }
}
