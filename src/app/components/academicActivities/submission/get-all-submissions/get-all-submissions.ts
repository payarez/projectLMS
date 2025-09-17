// get-all-submissions.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SubmissionS } from '../../../../services/submission-s';
import { SubmissionI } from '../../../../models/academicActivities/submission';

@Component({
  selector: 'app-get-all-submissions',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-submissions.html',
  styleUrl: './get-all-submissions.css'
})
export class GetAllSubmissions {
  submissions: SubmissionI[] = [];

  constructor(private submissionService: SubmissionS) {
    this.submissionService.submissions$.subscribe(submissions => {
      this.submissions = submissions;
    });
  }
}
