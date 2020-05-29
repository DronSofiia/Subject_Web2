import { Component, OnInit } from '@angular/core';
import {MostPopularReport} from '../mostPopularReport.model';
import {MostProfitableReport} from '../mostProfitableReport.model';
import {WithoutTicketsReport} from '../withoutTicketsReport.model';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  mostPopular: MostPopularReport[];
  mostProfitable: MostProfitableReport[];
  withoutTickets: WithoutTicketsReport[];

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getMostPopular();
    this.getMostProfitable();
    this.getWithoutTickets();
  }

  getMostPopular() {
    this.reportsService.getMostPopularReport()
      .subscribe(mostPopular => this.mostPopular = mostPopular);
  }

  getMostProfitable() {
    this.reportsService.getMostProfitableReport()
      .subscribe(mostProfitable => this.mostProfitable = mostProfitable);
  }

  getWithoutTickets() {
    this.reportsService.getWithoutTicketsReport()
      .subscribe(withoutTickets => this.withoutTickets = withoutTickets);
  }
}
