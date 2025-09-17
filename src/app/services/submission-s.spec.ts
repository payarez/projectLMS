import { TestBed } from '@angular/core/testing';

import { SubmissionS } from './submission-s';

describe('SubmissionS', () => {
  let service: SubmissionS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
