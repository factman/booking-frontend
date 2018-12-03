import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSelectionComponent } from './bus-selection.component';

describe('BusSelectionComponent', () => {
  let component: BusSelectionComponent;
  let fixture: ComponentFixture<BusSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
