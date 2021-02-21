import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnratedSurveysComponent } from './unrated-surveys.component';

describe('UnratedSurveysComponent', () => {
  let component: UnratedSurveysComponent;
  let fixture: ComponentFixture<UnratedSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnratedSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnratedSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
