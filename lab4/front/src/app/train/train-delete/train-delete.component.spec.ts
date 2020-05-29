import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDeleteComponent } from './train-delete.component';

describe('TrainDeleteComponent', () => {
  let component: TrainDeleteComponent;
  let fixture: ComponentFixture<TrainDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainDeleteComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
