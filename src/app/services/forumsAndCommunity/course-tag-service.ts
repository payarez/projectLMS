import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseTagI } from '../../models/forumsAndCommunity/courseTag';


@Injectable({ providedIn: 'root' })
export class CourseTagService {
  private readonly _state = new BehaviorSubject<CourseTagI[]>([
    // example data
    { id: 1, courseId: 1, tagId: 1, status: 'ACTIVE' },
    { id: 2, courseId: 1, tagId: 2, status: 'INACTIVE' }
  ]);

  readonly courseTags$ = this._state.asObservable();
  private get value(): CourseTagI[] { return this._state.value; }

  // GET all course-tags
  getCourseTags(): CourseTagI[] {
    return this.value;
  }

  // ADD a new course-tag relation
  addCourseTag(courseTag: Omit<CourseTagI, 'id'>): CourseTagI {
    const nextId = this.value.length ? Math.max(...this.value.map(ct => ct.id ?? 0)) + 1 : 1;
    const newCourseTag: CourseTagI = { id: nextId, ...courseTag };
    this._state.next([...this.value, newCourseTag]);
    return newCourseTag;
  }
}
