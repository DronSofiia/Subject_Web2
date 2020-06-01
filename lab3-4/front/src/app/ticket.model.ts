import {Passenger} from './passenger.model';
import {Train} from './train.model';

export class Ticket {
  _id: IdType;
  number: number;
  price: number;
  passenger: Passenger;
  train: Train;
  seatNumber: number;
  date: Date;
}
