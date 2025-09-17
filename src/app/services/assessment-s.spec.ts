import { TestBed } from '@angular/core/testing';

import { AssessmentS } from './assessment-s';

describe('AssessmentS', () => {
  let service: AssessmentS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
