import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AttemptI } from '../models/academicActivities/attempt';

@Injectable({
  providedIn: 'root'
})
export class AttemptS {
  private attemptsService = new BehaviorSubject<AttemptI[]>([
    {
      id: 1,
      lessonId: 1,
      studentId: 101,
      attemptNumber: 1,
      score: 85,
      attemptedAt: new Date(2024, 6, 15),
      status: 'ACTIVE'
    },
    {
      id: 2,
      lessonId: 2,
      studentId: 102,
      attemptNumber: 2,
      score: 90,
      attemptedAt: new Date(2024, 7, 10),
      status: 'INACTIVE'
    }
  ]);
  attempts$ = this.attemptsService.asObservable();

  getAttempts() {
    return this.attemptsService.value;
  }

  addAttempt(attempt: AttemptI) {
    const attempts = this.attemptsService.value;
    attempt.id = attempts.length ? Math.max(...attempts.map(a => a.id ?? 0)) + 1 : 1;
    this.attemptsService.next([...attempts, attempt]);
  }
}
