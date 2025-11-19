import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { LessonI } from '../../../../models/academicManagment/lesson';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-submissions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ToastModule,
    Select
  ],
  templateUrl: './create-submissions.html',
  styleUrl: './create-submissions.css',
  providers: [MessageService]
})
export class CreateSubmissions implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  lessons: { label: string; value: number }[] = [];
  students: { label: string; value: number }[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private submissionService: SubmissionService,
    private lessonService: LessonService,
    private studentService: Student,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      submittedAt: ['', Validators.required],
      studentId: [null, Validators.required],
      lessonId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLessons();
    this.loadStudents();
  }

  // =====================================
  //        🔹 CARGAR LECCIONES
  // =====================================
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (response: any) => {

        const list: LessonI[] = Array.isArray(response)
          ? response
          : response.lessons ?? [];

        this.lessons = list.map((l: LessonI) => ({
          label: l.title,
          value: l.id!
        }));
      },
      error: (error) => {
        console.error('Error cargando lecciones:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las lecciones'
        });
      }
    });
  }

  // =====================================
  //        🔹 CARGAR ESTUDIANTES
  // =====================================
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {

        const list: StudentI[] = Array.isArray(response)
          ? response
          : response.students ?? [];

        this.students = list.map((s: StudentI) => ({
          label: s.name,
          value: s.id!
        }));
      },
      error: (error) => {
        console.error('Error cargando estudiantes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los estudiantes'
        });
      }
    });
  }

  // =====================================
  //        🔹 CREAR SUBMISSION
  // =====================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const submissionData = this.form.value;

      this.submissionService.createSubmission(submissionData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Entrega creada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/submissions']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al crear submission:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la entrega'
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
    this.router.navigate(['/submissions']);
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
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}