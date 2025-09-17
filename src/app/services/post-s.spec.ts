import { TestBed } from '@angular/core/testing';

import { PostS } from './post-s';

describe('PostS', () => {
  let service: PostS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
