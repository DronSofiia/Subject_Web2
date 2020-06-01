import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../passenger.service';
import { Passenger } from '../../passenger.model';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  passengers: Passenger[];

  constructor(private passengerService: PassengerService) { }

  ngOnInit() {
    this.getPassengers();
  }

  getPassengers() {
    this.passengerService.getPassengers()
      .subscribe(passengers => this.passengers = passengers);
  }
}
