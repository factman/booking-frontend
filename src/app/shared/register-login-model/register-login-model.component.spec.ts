import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginModelComponent } from './register-login-model.component';

describe('RegisterLoginModelComponent', () => {
  let component: RegisterLoginModelComponent;
  let fixture: ComponentFixture<RegisterLoginModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLoginModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLoginModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
