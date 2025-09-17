import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssessmentI } from '../models/academicActivities/assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentS {
  private assessmentsService = new BehaviorSubject<AssessmentI[]>([
    {
      id: 1,
      score: 85,
      feedback: 'Buen trabajo',
      evaluatedAt: new Date(2024, 6, 15),
      status: 'ACTIVE'
    },
    {
      id: 2,
      score: 92,
      feedback: 'Excelente progreso',
      evaluatedAt: new Date(2024, 7, 10),
      status: 'INACTIVE'
    }
  ]);

  assessments$ = this.assessmentsService.asObservable();

  getAssessments() {
    return this.assessmentsService.value;
  }

  addAssessment(assessment: AssessmentI) {
    const assessments = this.assessmentsService.value;
    assessment.id = assessments.length ? Math.max(...assessments.map(a => a.id ?? 0)) + 1 : 1;
    assessment.evaluatedAt = new Date();
    this.assessmentsService.next([...assessments, assessment]);
  }
}
