import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCreateComponent } from './passenger-create.component';

describe('PassengerCreateComponent', () => {
  let component: PassengerCreateComponent;
  let fixture: ComponentFixture<PassengerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
