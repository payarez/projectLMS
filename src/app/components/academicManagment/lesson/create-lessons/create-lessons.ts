// create-lessons.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { LessonS } from '../../../../services/lesson-s';

@Component({
  selector: 'app-create-lessons',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-lessons.html',
  styleUrl: './create-lessons.css'
})
export class CreateLessons {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonS
  ) {
    this.form = this.fb.group({
      moduleId: ['', Validators.required],
      title: ['', Validators.required],
      content: [''],
      order: ['', [Validators.required, Validators.min(1)]],
      status: ['ACTIVE', Validators.required],
      submissionIds: [''], // IDs separados por coma, opcional
      attemptIds: ['']     // IDs separados por coma, opcional
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      const submissionIds = value.submissionIds
        ? value.submissionIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      const attemptIds = value.attemptIds
        ? value.attemptIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      this.lessonService.addLesson({
        moduleId: Number(value.moduleId),
        title: value.title,
        content: value.content,
        order: Number(value.order),
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        submissionIds,
        attemptIds
      });

      this.router.navigate(['/lessons']);
    }
  }

  cancelar() {
    this.router.navigate(['/lessons']);
  }
}
