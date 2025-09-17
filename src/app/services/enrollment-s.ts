import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EnrollmentI } from '../models/usersAndEnrollment/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentS {
  private enrollmentsService = new BehaviorSubject<EnrollmentI[]>([
    {
      id: 1,
      studentId: 1,
      courseId: 101,
      enrolledAt: new Date(2023, 4, 15), // 15 mayo 2023
      state: 'active',
      status: 'ACTIVE'
    },
    {
      id: 2,
      studentId: 2,
      courseId: 102,
      enrolledAt: new Date(2022, 9, 7), // 7 octubre 2022
      state: 'completed',
      status: 'INACTIVE'
    }
  ]);

  enrollments$ = this.enrollmentsService.asObservable();

  getEnrollments() {
    return this.enrollmentsService.value;
  }

  addEnrollment(enrollment: EnrollmentI) {
    const enrollments = this.enrollmentsService.value;
    enrollment.id = enrollments.length ? Math.max(...enrollments.map(e => e.id ?? 0)) + 1 : 1;
    this.enrollmentsService.next([...enrollments, enrollment]);
  }
}
