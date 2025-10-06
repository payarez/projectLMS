import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-submissions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './create-submissions.html',
  styleUrl: './create-submissions.css'
})
export class CreateSubmissions implements OnInit {
  form: FormGroup;
  students: StudentI[] = [];
  lessons: LessonI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private submissionService: SubmissionService,
    private studentService: StudentService,
    private lessonService: LessonService
  ) {
    this.form = this.fb.group({
      content: ['', Validators.required],
      submittedAt: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required],
      studentId: [null, Validators.required],
      lessonId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.lessons = this.lessonService.getLessons();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.submissionService.addSubmission({
        content: value.content,
        submittedAt: value.submittedAt ?? new Date(),
        status: value.status,
        studentId: value.studentId,
        lessonId: value.lessonId
      });
      this.router.navigate(['/submissions']);
    }
  }

  cancelar() {
    this.router.navigate(['/submissions']);
  }
}