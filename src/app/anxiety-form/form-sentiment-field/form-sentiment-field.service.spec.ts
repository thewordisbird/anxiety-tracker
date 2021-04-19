import { TestBed } from '@angular/core/testing';

import { FormSentimentFieldService } from './form-sentiment-field.service';

describe('FormSentimentFieldService', () => {
  let service: FormSentimentFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSentimentFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
