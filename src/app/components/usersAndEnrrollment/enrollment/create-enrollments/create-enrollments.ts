import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { EnrollmentService } from '../../../../services/usersAndEnrrollment/enrrollment-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { CourseService } from '../../../../services/academicManagment/course-service';

import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-create-enrollments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, SelectModule, DatePicker, ToastModule],
  templateUrl: './create-enrollments.html',
  styleUrl: './create-enrollments.css',
  providers: [MessageService]
})
export class CreateEnrollments implements OnInit {
  form: FormGroup;
  students: StudentI[] = [];
  courses: CourseI[] = [];
  loading: boolean = false;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enrollmentService: EnrollmentService,
    private studentService: Student,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required],
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.studentService.students$.subscribe(data => this.students = data);
  }

  loadCourses() {
    this.courseService.courses$.subscribe(data => this.courses = data);
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;
      this.enrollmentService.createEnrollment({
        date: value.date ?? new Date(),
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        studentId: value.studentId,
        courseId: value.courseId,
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Matrícula creada correctamente'
      });

      this.loading = false;
      setTimeout(() => this.router.navigate(['/enrollments']), 800);
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos correctamente'
      });
    }
  }

  cancelar() {
    this.router.navigate(['/enrollments']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
    }
    return '';
  }
}
