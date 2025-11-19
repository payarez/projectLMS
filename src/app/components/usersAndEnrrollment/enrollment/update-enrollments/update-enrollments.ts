import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';

import { EnrollmentService } from '../../../../services/usersAndEnrrollment/enrrollment-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { EnrollmentI } from '../../../../models/usersAndEnrrollment/enrollment';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-update-enrollments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, SelectModule, DatePickerModule, ToastModule],
  templateUrl: './update-enrollments.html',
  styleUrl: './update-enrollments.css',
  providers: [MessageService]
})
export class UpdateEnrollments implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  enrollmentId: number = 0;

  students: StudentI[] = [];
  courses: CourseI[] = [];

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private studentService: Student,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required],
      studentId: [null, Validators.required],
      courseId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.enrollmentId = parseInt(id);
      this.loadEnrollment();
    }
  }

  /** 🔹 Cargar enrollments por ID */
  loadEnrollment(): void {
    this.loading = true;
    this.enrollmentService.getEnrollmentById(this.enrollmentId).subscribe({
      next: (response: any) => {
        const data: EnrollmentI = response.enrollment ?? response;

        this.form.patchValue({
          date: new Date(data.date),
          status: data.status,
          studentId: data.studentId,
          courseId: data.courseId
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando inscripción:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la inscripción'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar estudiantes para select */
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        this.students = Array.isArray(response) ? response : response.students ?? [];
      },
      error: (err) => {
        console.error('Error cargando estudiantes:', err);
      }
    });
  }

  /** 🔹 Cargar cursos para select */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.courses = Array.isArray(response) ? response : response.courses ?? [];
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
      }
    });
  }

  /** 🔹 Actualizar enrollment */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const enrollmentData = this.form.value;

      this.enrollmentService.updateEnrollment(this.enrollmentId, enrollmentData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Inscripción actualizada correctamente'
          });
          setTimeout(() => this.router.navigate(['/enrollments']), 1000);
        },
        error: (error) => {
          console.error('Error actualizando inscripción:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la inscripción'
          });
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  cancelar(): void {
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
