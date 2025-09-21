import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssessmentI } from '../../models/academicActivities/assessment';

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private readonly _state = new BehaviorSubject<AssessmentI[]>([
    // example data
    { id: 1, grade: 95, feedback: 'Excellent work!', date: new Date('2025-09-15T10:00:00'), submissionId: 1, status: 'ACTIVE' },
    { id: 2, grade: 70, feedback: 'Needs improvement.', date: new Date('2025-09-16T14:00:00'), submissionId: 2, status: 'INACTIVE' }
  ]);

  readonly assessments$ = this._state.asObservable();
  private get value(): AssessmentI[] { return this._state.value; }

  // GET all assessments
  getAssessments(): AssessmentI[] {
    return this.value;
  }

  // ADD a new assessment
  addAssessment(assessment: Omit<AssessmentI, 'id'>): AssessmentI {
    const nextId = this.value.length ? Math.max(...this.value.map(a => a.id ?? 0)) + 1 : 1;
    const newAssessment: AssessmentI = { id: nextId, ...assessment };
    this._state.next([...this.value, newAssessment]);
    return newAssessment;
  }
}
