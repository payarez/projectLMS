import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SubmissionI } from '../models/academicActivities/submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionS {
  private submissionsService = new BehaviorSubject<SubmissionI[]>([
    {
      id: 1,
      lessonId: 1,
      studentId: 1,
      fileUrl: 'https://example.com/file1.pdf',
      submittedAt: new Date(2023, 4, 15),
      grade: 95,
      status: 'ACTIVE'
    },
    {
      id: 2,
      lessonId: 2,
      studentId: 2,
      fileUrl: 'https://example.com/file2.pdf',
      submittedAt: new Date(2023, 4, 20),
      grade: 88,
      status: 'INACTIVE'
    }
  ]);

  submissions$ = this.submissionsService.asObservable();

  getSubmissions() {
    return this.submissionsService.value;
  }

  addSubmission(submission: SubmissionI) {
    const submissions = this.submissionsService.value;
    submission.id = submissions.length ? Math.max(...submissions.map(s => s.id ?? 0)) + 1 : 1;
    submission.submittedAt = new Date();
    this.submissionsService.next([...submissions, submission]);
  }
}
