// get-all-enrollments.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { EnrollmentI } from '../../../../models/usersAndEnrollment/enrollment';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { EnrollmentS } from '../../../../services/enrollment-s';

@Component({
  selector: 'app-get-all-enrollments',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-enrollments.html',
  styleUrl: './get-all-enrollments.css'
})
export class GetAllEnrollments {
  enrollments: EnrollmentI[] = [];

  constructor(private enrollmentService: EnrollmentS) {
    this.enrollmentService.enrollments$.subscribe(enrollments => {
      this.enrollments = enrollments;
    });
  }
}
