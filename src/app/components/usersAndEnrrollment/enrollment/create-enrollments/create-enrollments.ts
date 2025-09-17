// create-enrollments.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { EnrollmentS } from '../../../../services/enrollment-s';

@Component({
  selector: 'app-create-enrollments',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-enrollments.html',
  styleUrl: './create-enrollments.css'
})
export class CreateEnrollments {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enrollmentService: EnrollmentS
  ) {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      enrolledAt: [new Date().toISOString().slice(0,16), Validators.required], // datetime-local
      state: ['active', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.enrollmentService.addEnrollment({
        studentId: Number(value.studentId),
        courseId: Number(value.courseId),
        enrolledAt: new Date(value.enrolledAt),
        state: value.state === 'active' || value.state === 'completed' || value.state === 'dropped' ? value.state : 'active',
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      });
      this.router.navigate(['/enrollments']);
    }
  }

  cancelar() {
    this.router.navigate(['/enrollments']);
  }
}
