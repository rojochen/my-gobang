import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerboardComponent } from './checkerboard.component';

describe('CheckerboardComponent', () => {
  let component: CheckerboardComponent;
  let fixture: ComponentFixture<CheckerboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
