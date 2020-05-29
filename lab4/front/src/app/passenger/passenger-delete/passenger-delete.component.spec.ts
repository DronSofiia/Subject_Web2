import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDeleteComponent } from './passenger-delete.component';

describe('PassengerDeleteComponent', () => {
  let component: PassengerDeleteComponent;
  let fixture: ComponentFixture<PassengerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerDeleteComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
