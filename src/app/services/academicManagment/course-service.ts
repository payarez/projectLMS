import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseI } from '../../models/academicManagment/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly _state = new BehaviorSubject<CourseI[]>([
    // example data
    { id: 1, title: 'Web Development', description: 'Learn the fundamentals of web development.', startDate: new Date('2025-01-01'), endDate: new Date('2025-06-30'), teacherId: 1, status: 'ACTIVE' },
    { id: 2, title: 'Databases 101', description: 'Introduction to relational databases.', startDate: new Date('2025-02-01'), endDate: new Date('2025-07-15'), teacherId: 2, status: 'INACTIVE' }
  ]);

  readonly courses$ = this._state.asObservable();
  private get value(): CourseI[] { return this._state.value; }

  // GET all courses
  getCourses(): CourseI[] {
    return this.value;
  }

  // ADD a new course
  addCourse(course: Omit<CourseI, 'id'>): CourseI {
    const nextId = this.value.length ? Math.max(...this.value.map(c => c.id ?? 0)) + 1 : 1;
    const newCourse: CourseI = { id: nextId, ...course };
    this._state.next([...this.value, newCourse]);
    return newCourse;
  }
}
