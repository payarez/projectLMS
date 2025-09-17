import { TestBed } from '@angular/core/testing';

import { EnrollmentS } from './enrollment-s';

describe('EnrollmentS', () => {
  let service: EnrollmentS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
