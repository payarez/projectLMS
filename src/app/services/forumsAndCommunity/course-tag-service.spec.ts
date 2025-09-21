import { TestBed } from '@angular/core/testing';

import { CourseTagService } from './course-tag-service';

describe('CourseTagService', () => {
  let service: CourseTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
