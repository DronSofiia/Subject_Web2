import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { Passenger } from './passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/passenger';
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched passengers')),
        catchError(this.handleError<Passenger[]>('getPassengers', []))
      );
  }

  getPassengerById(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.apiUrl}/list`, passenger)
      .pipe(
        tap(_ => this.log('fetched passenger')),
        catchError(this.handleError<Passenger>('getPassengerById', undefined))
      );
  }

  createPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.apiUrl}/add`, passenger)
      .pipe(
        tap(_ => this.log('created passenger')),
        catchError(this.handleError<Passenger>('createPassenger', undefined))
      );
  }

  editPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.apiUrl}/edit/${passenger._id}`, passenger)
      .pipe(
        tap(_ => this.log('edited passenger')),
        catchError(this.handleError<Passenger>('editPassenger', undefined))
      );
  }

  deletePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.apiUrl}/remove/${passenger._id}`, passenger)
      .pipe(
        tap(_ => this.log('deleted passenger')),
        catchError(this.handleError<Passenger>('deletePassenger', undefined))
      );
  }
}
