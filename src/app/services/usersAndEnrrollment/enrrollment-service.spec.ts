import { TestBed } from '@angular/core/testing';

import { EnrrollmentService } from './enrrollment-service';

describe('EnrrollmentService', () => {
  let service: EnrrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
