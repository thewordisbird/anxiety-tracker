import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSentimentFieldComponent } from './form-sentiment-field.component';

describe('FormSentimentFieldComponent', () => {
  let component: FormSentimentFieldComponent;
  let fixture: ComponentFixture<FormSentimentFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSentimentFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSentimentFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
