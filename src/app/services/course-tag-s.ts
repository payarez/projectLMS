import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CourseTagI } from '../models/forumsAndCommunity/courseTag';

@Injectable({
  providedIn: 'root'
})
export class CourseTagS {
  private courseTagsService = new BehaviorSubject<CourseTagI[]>([
    { id: 1, courseId: 101, tagId: 1, status: 'ACTIVE' },
    { id: 2, courseId: 101, tagId: 2, status: 'INACTIVE' },
    { id: 3, courseId: 102, tagId: 1, status: 'ACTIVE' }
  ]);

  courseTags$ = this.courseTagsService.asObservable();

  getCourseTags() {
    return this.courseTagsService.value;
  }

  addCourseTag(courseTag: CourseTagI) {
    const courseTags = this.courseTagsService.value;
    courseTag.id = courseTags.length ? Math.max(...courseTags.map(c => c.id ?? 0)) + 1 : 1;
    this.courseTagsService.next([...courseTags, courseTag]);
  }
}
