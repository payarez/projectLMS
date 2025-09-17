import { TestBed } from '@angular/core/testing';

import { StudentS } from './student-s';

describe('StudentS', () => {
  let service: StudentS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
