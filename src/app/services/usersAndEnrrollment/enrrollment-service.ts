import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnrollmentI } from '../../models/usersAndEnrrollment/enrollment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly _state = new BehaviorSubject<EnrollmentI[]>([
    // example data
    { id: 1, date: new Date('2025-01-10'), studentId: 1, courseId: 1, status: 'ACTIVE' },
    { id: 2, date: new Date('2025-02-15'), studentId: 2, courseId: 2, status: 'INACTIVE' }
  ]);

  readonly enrollments$ = this._state.asObservable();
  private get value(): EnrollmentI[] { return this._state.value; }

  // GET all enrollments
  getEnrollments(): EnrollmentI[] {
    return this.value;
  }

  // ADD a new enrollment
  addEnrollment(enrollment: Omit<EnrollmentI, 'id'>): EnrollmentI {
    const nextId = this.value.length ? Math.max(...this.value.map(e => e.id ?? 0)) + 1 : 1;
    const newEnrollment: EnrollmentI = { id: nextId, ...enrollment };
    this._state.next([...this.value, newEnrollment]);
    return newEnrollment;
  }
}
