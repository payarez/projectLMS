import { TestBed } from '@angular/core/testing';

import { ForumS } from './forum-s';

describe('ForumS', () => {
  let service: ForumS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
