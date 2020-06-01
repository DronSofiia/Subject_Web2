import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TrainService } from '../../train.service';
import { Train } from '../../train.model';

@Component({
  selector: 'app-train-create',
  templateUrl: './train-create.component.html',
  styleUrls: ['./train-create.component.scss']
})
export class TrainCreateComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  train: Train;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private trainService: TrainService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      route: ['', Validators.required],
      number: ['', Validators.required],
      seatsQuantity: ['', Validators.required]
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
    this.trainService.createTrain(this.createForm.value)
      .pipe(first())
      .subscribe(
        train => {
          this.train = train;
          // this.router.navigate(['/train']);
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
