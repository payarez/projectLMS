// create-attempts.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AttemptS } from '../../../../services/attempt-s';

@Component({
  selector: 'app-create-attempts',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-attempts.html',
  styleUrl: './create-attempts.css'
})
export class CreateAttempts {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private attemptService: AttemptS
  ) {
    this.form = this.fb.group({
      lessonId: ['', Validators.required],
      studentId: ['', Validators.required],
      attemptNumber: ['', [Validators.required, Validators.min(1)]],
      score: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      this.attemptService.addAttempt({
        lessonId: Number(value.lessonId),
        studentId: Number(value.studentId),
        attemptNumber: Number(value.attemptNumber),
        score: value.score ? Number(value.score) : undefined,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        attemptedAt: new Date()
      });

      this.router.navigate(['/attempts']);
    }
  }

  cancelar() {
    this.router.navigate(['/attempts']);
  }
}
