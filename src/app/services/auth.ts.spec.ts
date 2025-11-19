import { TestBed } from '@angular/core/testing';

import { AuthTs } from './auth.ts';

describe('AuthTs', () => {
  let service: AuthTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
