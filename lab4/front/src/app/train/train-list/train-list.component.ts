import { Component, OnInit } from '@angular/core';
import { TrainService } from '../../train.service';
import { Train } from '../../train.model';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit {
  trains: Train[];

  constructor(private trainService: TrainService) { }

  ngOnInit() {
    this.getTrains();
  }

  getTrains() {
    this.trainService.getTrains()
      .subscribe(trains => this.trains = trains);
  }
}
