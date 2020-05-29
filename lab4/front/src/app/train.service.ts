import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { Train } from './train.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/train';
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(`${this.apiUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched trains')),
        catchError(this.handleError<Train[]>('getTrains', []))
      );
  }

  getTrainById(train: Train): Observable<Train> {
    return this.http.post<Train>(`${this.apiUrl}/list`, train)
      .pipe(
        tap(_ => this.log('fetched train')),
        catchError(this.handleError<Train>('getTrainById', undefined))
      );
  }

  createTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(`${this.apiUrl}/add`, train)
      .pipe(
        tap(_ => this.log('created train')),
        catchError(this.handleError<Train>('createTrain', undefined))
      );
  }

  editTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(`${this.apiUrl}/edit/${train._id}`, train)
      .pipe(
        tap(_ => this.log('edited train')),
        catchError(this.handleError<Train>('editTrain', undefined))
      );
  }

  deleteTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(`${this.apiUrl}/remove/${train._id}`, train)
      .pipe(
        tap(_ => this.log('deleted train')),
        catchError(this.handleError<Train>('deleteTrain', undefined))
      );
  }
}
