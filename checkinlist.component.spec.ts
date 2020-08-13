import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinlistComponent } from './checkinlist.component';

describe('CheckinlistComponent', () => {
  let component: CheckinlistComponent;
  let fixture: ComponentFixture<CheckinlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
