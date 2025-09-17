import { TestBed } from '@angular/core/testing';

import { TagS } from './tag-s';

describe('TagS', () => {
  let service: TagS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
