import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubmissionI } from '../../models/academicActivities/submission';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private readonly _state = new BehaviorSubject<SubmissionI[]>([
    // example data
    { id: 1, content: 'Answer document uploaded', submittedAt: new Date('2025-09-01T10:00:00'), studentId: 1, lessonId: 1, status: 'ACTIVE' },
    { id: 2, content: 'Project PDF uploaded', submittedAt: new Date('2025-09-02T15:30:00'), studentId: 2, lessonId: 1, status: 'INACTIVE' }
  ]);

  readonly submissions$ = this._state.asObservable();
  private get value(): SubmissionI[] { return this._state.value; }

  // GET all submissions
  getSubmissions(): SubmissionI[] {
    return this.value;
  }

  // ADD a new submission
  addSubmission(submission: Omit<SubmissionI, 'id'>): SubmissionI {
    const nextId = this.value.length ? Math.max(...this.value.map(s => s.id ?? 0)) + 1 : 1;
    const newSubmission: SubmissionI = { id: nextId, ...submission };
    this._state.next([...this.value, newSubmission]);
    return newSubmission;
  }
}
