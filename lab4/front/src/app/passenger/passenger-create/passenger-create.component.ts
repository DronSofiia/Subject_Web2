import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PassengerService } from '../../passenger.service';
import { Passenger } from '../../passenger.model';

@Component({
  selector: 'app-passenger-create',
  templateUrl: './passenger-create.component.html',
  styleUrls: ['./passenger-create.component.scss']
})
export class PassengerCreateComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  passenger: Passenger;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private passengerService: PassengerService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      passportID: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    this.passengerService.createPassenger(this.createForm.value)
      .pipe(first())
      .subscribe(
        passenger => {
          this.passenger = passenger;
          // this.router.navigate(['/passenger']);
          this.onRefresh();
        },
        error => {
          this.loading = false;
        });
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}
