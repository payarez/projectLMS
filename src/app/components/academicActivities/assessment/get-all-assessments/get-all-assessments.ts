import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { AssessmentI } from '../../../../models/academicActivities/assessment';
import { SubmissionI } from '../../../../models/academicActivities/submission';

import { AssessmentService } from '../../../../services/academicActivities/assessment-service';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';

@Component({
  selector: 'app-get-all-assessments',standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-assessments.html',
  styleUrl: './get-all-assessments.css', 
  encapsulation: ViewEncapsulation.None
})
export class GetAllAssessments {
  assessments: AssessmentI[] = [];
  submissions: Record<number, SubmissionI> = {};

  constructor(
    private assessmentService: AssessmentService,
    private submissionService: SubmissionService
  ) {
    // cargar evaluaciones
    this.assessmentService.assessments$.subscribe(list => this.assessments = list);

    // mapa de entregas
    this.submissionService.submissions$.subscribe(list => {
      this.submissions = Object.fromEntries(list.map(s => [s.id!, s]));
    });
  }

  submissionLabel(id: number): string {
    return this.submissions[id] ? `Submission #${id}` : `#${id}`;
  }

  submissionContent(id: number): string {
    return this.submissions[id]?.content || 'No submission';
  }
}
