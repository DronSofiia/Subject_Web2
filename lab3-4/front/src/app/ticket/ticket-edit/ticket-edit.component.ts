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
import './../../types';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  submitted = false;
  ticket: Ticket;
  passengers: Passenger[];
  trains: Train[];
  ticketId: IdType;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ticketService: TicketService,
              private passengerService: PassengerService,
              private trainService: TrainService) { }

  ngOnInit() {
    this.getPassengers();
    this.getTrains();
    const index = this.router.url.lastIndexOf('/');
    this.ticketId = this.router.url.toString().slice(index + 1);
    this.ticketId = this.ticketId.slice(0, this.ticketId.length - 3);
    this.getTicketById();
    this.editForm = this.formBuilder.group({
      id: this.ticket._id,
      number: [this.ticket.number, Validators.required],
      price: [this.ticket.price, Validators.required],
      passenger_id: [this.ticket.passenger, Validators.required],
      train_id: [this.ticket.train, Validators.required],
      seatNumber: [this.ticket.seatNumber, Validators.required],
      date: [this.ticket.date, Validators.required]
    });
  }

  getTicketById() {
    this.ticket = new Ticket();
    this.ticket._id = this.ticketId;
    this.ticketService.getTicketById(this.ticket)
      .subscribe(ticket => this.ticket = ticket);
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
    this.ticketService.editTicket(this.editForm.value)
      .pipe(first())
      .subscribe(
        ticket => {
          this.ticket = ticket;
          this.router.navigate(['/ticket']);
          // this.onRefresh();
        },
        error => {
          this.loading = false;
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
