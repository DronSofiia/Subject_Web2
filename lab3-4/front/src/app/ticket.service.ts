import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/ticket';
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched tickets')),
        catchError(this.handleError<Ticket[]>('getTickets', []))
      );
  }

  getTicketById(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/list`, ticket)
      .pipe(
        tap(_ => this.log('fetched ticket')),
        catchError(this.handleError<Ticket>('getTicketById', undefined))
      );
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/add`, ticket)
      .pipe(
        tap(_ => this.log('created ticket')),
        catchError(this.handleError<Ticket>('createTicket', undefined))
      );
  }

  editTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/edit/${ticket._id}`, ticket)
      .pipe(
        tap(_ => this.log('edited ticket')),
        catchError(this.handleError<Ticket>('editTicket', undefined))
      );
  }

  deleteTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/remove/${ticket._id}`, ticket)
      .pipe(
        tap(_ => this.log('deleted ticket')),
        catchError(this.handleError<Ticket>('deleteTicket', undefined))
      );
  }
}
