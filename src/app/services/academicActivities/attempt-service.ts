import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AttemptI } from '../../models/academicActivities/attempt';

@Injectable({ providedIn: 'root' })
export class AttemptService {
  private readonly _state = new BehaviorSubject<AttemptI[]>([
    // example data
    { id: 1, attemptNumber: 1, date: new Date('2025-09-10T09:00:00'), result: 'Passed', lessonId: 1, status: 'ACTIVE' },
    { id: 2, attemptNumber: 2, date: new Date('2025-09-11T14:30:00'), result: 'Failed', lessonId: 1, status: 'INACTIVE' }
  ]);

  readonly attempts$ = this._state.asObservable();
  private get value(): AttemptI[] { return this._state.value; }

  // GET all attempts
  getAttempts(): AttemptI[] {
    return this.value;
  }

  // ADD a new attempt
  addAttempt(attempt: Omit<AttemptI, 'id'>): AttemptI {
    const nextId = this.value.length ? Math.max(...this.value.map(a => a.id ?? 0)) + 1 : 1;
    const newAttempt: AttemptI = { id: nextId, ...attempt };
    this._state.next([...this.value, newAttempt]);
    return newAttempt;
  }
}
