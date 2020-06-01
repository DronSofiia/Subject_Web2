import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { Ticket } from '../../ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }
}
