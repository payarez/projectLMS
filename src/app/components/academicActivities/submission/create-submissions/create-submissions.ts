// create-submissions.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { SubmissionS } from '../../../../services/submission-s';

@Component({
  selector: 'app-create-submissions',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-submissions.html',
  styleUrl: './create-submissions.css'
})
export class CreateSubmissions {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private submissionService: SubmissionS
  ) {
    this.form = this.fb.group({
      lessonId: ['', Validators.required],
      studentId: ['', Validators.required],
      fileUrl: [''],
      grade: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      this.submissionService.addSubmission({
        lessonId: Number(value.lessonId),
        studentId: Number(value.studentId),
        fileUrl: value.fileUrl,
        grade: value.grade ? Number(value.grade) : undefined,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        submittedAt: new Date()
      });

      this.router.navigate(['/submissions']);
    }
  }

  cancelar() {
    this.router.navigate(['/submissions']);
  }
}
