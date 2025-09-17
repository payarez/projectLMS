import { TestBed } from '@angular/core/testing';

import { CourseTagS } from './course-tag-s';

describe('CourseTagS', () => {
  let service: CourseTagS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTagS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
