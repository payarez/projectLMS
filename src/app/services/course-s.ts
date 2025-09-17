// course-s.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CourseI } from '../models/academicManagment/course';

@Injectable({
  providedIn: 'root'
})
export class CourseS {
  private coursesService = new BehaviorSubject<CourseI[]>([
    {
      id: 1,
      title: 'Curso Angular Básico',
      description: 'Aprende los fundamentos de Angular',
      createdAt: new Date(2023, 4, 10),
      updatedAt: new Date(2023, 4, 10),
      status: 'ACTIVE',
      moduleIds: [1, 2],
      enrollmentIds: [1, 2],
      courseTagIds: [1]
    },
    {
      id: 2,
      title: 'Curso TypeScript Avanzado',
      description: 'Profundiza en TypeScript y buenas prácticas',
      createdAt: new Date(2023, 5, 5),
      updatedAt: new Date(2023, 5, 5),
      status: 'INACTIVE',
      moduleIds: [3],
      enrollmentIds: [],
      courseTagIds: [2]
    }
  ]);

  courses$ = this.coursesService.asObservable();

  getCourses() {
    return this.coursesService.value;
  }

  addCourse(course: CourseI) {
    const courses = this.coursesService.value;
    course.id = courses.length ? Math.max(...courses.map(c => c.id ?? 0)) + 1 : 1;
    course.createdAt = new Date();
    course.updatedAt = new Date();
    this.coursesService.next([...courses, course]);
  }
}
