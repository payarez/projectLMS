import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SubmissionI } from '../../../../models/academicActivities/submission';
import { AssessmentService } from '../../../../services/academicActivities/assessment-service';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';

@Component({
  selector: 'app-create-assessments',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ],
  standalone: true,
  templateUrl: './create-assessments.html',
  styleUrl: './create-assessments.css'
})
export class CreateAssessments implements OnInit {
  form: FormGroup;
  submissions: SubmissionI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assessmentService: AssessmentService,
    private submissionService: SubmissionService
  ) {
    this.form = this.fb.group({
      grade: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      feedback: [''],
      date: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required],
      submissionId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.submissions = this.submissionService.getSubmissions();
    // si es observable:
    // this.submissionService.submissions$.subscribe(data => this.submissions = data);
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.assessmentService.addAssessment({
        grade: value.grade,
        feedback: value.feedback,
        date: value.date ?? new Date(),
        status: value.status,
        submissionId: value.submissionId
      });
      this.router.navigate(['/assessments']);
    }
  }

  cancelar() {
    this.router.navigate(['/assessments']);
  }
}