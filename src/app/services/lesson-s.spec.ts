import { TestBed } from '@angular/core/testing';

import { LessonS } from './lesson-s';

describe('LessonS', () => {
  let service: LessonS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
