import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { WithoutTicketsReport } from './withoutTicketsReport.model';
import { MostProfitableReport } from './mostProfitableReport.model';
import { MostPopularReport } from './mostPopularReport.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/reports';
  }

  getMostPopularReport(): Observable<MostPopularReport[]> {
    return this.http.get<MostPopularReport[]>(`${this.apiUrl}/popular`)
      .pipe(
        tap(_ => this.log('fetched most popular routes report')),
        catchError(this.handleError<MostPopularReport[]>('getMostPopularReport', []))
      );
  }

  getMostProfitableReport(): Observable<MostProfitableReport[]> {
    return this.http.get<MostProfitableReport[]>(`${this.apiUrl}/profitable`)
      .pipe(
        tap(_ => this.log('fetched most profitable routes report')),
        catchError(this.handleError<MostProfitableReport[]>('getMostProfitableReport', []))
      );
  }

  getWithoutTicketsReport(): Observable<WithoutTicketsReport[]> {
    return this.http.get<WithoutTicketsReport[]>(`${this.apiUrl}/without`)
      .pipe(
        tap(_ => this.log('fetched routes without sold tickets report')),
        catchError(this.handleError<WithoutTicketsReport[]>('getWithoutTicketsReport', []))
      );
  }
}
