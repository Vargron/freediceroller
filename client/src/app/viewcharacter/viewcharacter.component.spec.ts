import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcharacterComponent } from './viewcharacter.component';

describe('ViewcharacterComponent', () => {
  let component: ViewcharacterComponent;
  let fixture: ComponentFixture<ViewcharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
