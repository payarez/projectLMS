// get-all-assessments.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AssessmentI } from '../../../../models/academicActivities/assessment';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AssessmentS } from '../../../../services/assessment-s';

@Component({
  selector: 'app-get-all-assessments',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-assessments.html',
  styleUrl: './get-all-assessments.css'
})
export class GetAllAssessments {
  assessments: AssessmentI[] = [];

  constructor(private assessmentService: AssessmentS) {
    this.assessmentService.assessments$.subscribe(assessments => {
      this.assessments = assessments;
    });
  }
}
