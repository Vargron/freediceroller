import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonLoggedinComponent } from './non-loggedin.component';

describe('NonLoggedinComponent', () => {
  let component: NonLoggedinComponent;
  let fixture: ComponentFixture<NonLoggedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonLoggedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
