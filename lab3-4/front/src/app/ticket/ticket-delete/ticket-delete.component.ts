import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TicketService } from '../../ticket.service';
import { Ticket } from '../../ticket.model';
import './../../types';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrls: ['./ticket-delete.component.scss']
})
export class TicketDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  ticket: Ticket;
  ticketId: IdType;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ticketService: TicketService) { }

  ngOnInit() {
    const index = this.router.url.lastIndexOf('/');
    this.ticketId = this.router.url.toString().slice(index + 1);
    this.getTicketById();
    this.deleteForm = this.formBuilder.group({
      id: this.ticket._id
    });
  }

  getTicketById() {
    this.ticket = new Ticket();
    this.ticket._id = this.ticketId;
    this.ticketService.getTicketById(this.ticket)
      .subscribe(ticket => this.ticket = ticket);
  }

  // convenience getter for easy access to form fields
  get f() { return this.deleteForm.controls; }

  onSubmit() {
    this.ticketService.deleteTicket(this.deleteForm.value)
      .pipe(first())
      .subscribe(
        ticket => {
          this.ticket = ticket;
          this.router.navigate(['/ticket']);
          // this.onRefresh();
        });
  }
}
