import { TestBed } from '@angular/core/testing';

import { AnxietyFormService } from './anxiety-form.service';

describe('AnxietyFormService', () => {
  let service: AnxietyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnxietyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
