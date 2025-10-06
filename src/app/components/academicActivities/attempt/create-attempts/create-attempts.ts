import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { AttemptService } from '../../../../services/academicActivities/attempt-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';

@Component({
  selector: 'app-create-attempts',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ],
  standalone: true,
  templateUrl: './create-attempts.html',
  styleUrl: './create-attempts.css'
})
export class CreateAttempts implements OnInit {
  form: FormGroup;
  lessons: LessonI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private attemptService: AttemptService,
    private lessonService: LessonService
  ) {
    this.form = this.fb.group({
      attemptNumber: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required],
      result: [''],
      status: ['ACTIVE', Validators.required],
      lessonId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.lessons = this.lessonService.getLessons();
    // si tu servicio devuelve observable:
    // this.lessonService.lessons$.subscribe(data => this.lessons = data);
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.attemptService.addAttempt({
        attemptNumber: value.attemptNumber,
        date: value.date ?? new Date(),
        result: value.result,
        status: value.status,
        lessonId: value.lessonId
      });
      this.router.navigate(['/attempts']);
    }
  }

  cancelar() {
    this.router.navigate(['/attempts']);
  }
}