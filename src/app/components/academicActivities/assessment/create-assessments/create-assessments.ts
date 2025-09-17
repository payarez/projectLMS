// create-assessments.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AssessmentS } from '../../../../services/assessment-s';

@Component({
  selector: 'app-create-assessments',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-assessments.html',
  styleUrl: './create-assessments.css'
})
export class CreateAssessments {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assessmentService: AssessmentS
  ) {
    this.form = this.fb.group({
      score: ['', [Validators.required, Validators.min(0)]],
      feedback: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      this.assessmentService.addAssessment({
        score: Number(value.score),
        feedback: value.feedback,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        evaluatedAt: new Date()
      });

      this.router.navigate(['/assessments']);
    }
  }

  cancelar() {
    this.router.navigate(['/assessments']);
  }
}
