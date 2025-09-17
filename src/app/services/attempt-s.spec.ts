import { TestBed } from '@angular/core/testing';

import { AttemptS } from './attempt-s';

describe('AttemptS', () => {
  let service: AttemptS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
