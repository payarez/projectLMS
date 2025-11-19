import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';

import { SubmissionService } from '../../../../services/academicActivities/submission-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';

import { SubmissionI } from '../../../../models/academicActivities/submission';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';


@Component({
  selector: 'app-update-submissions',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    TextareaModule,
    ToastModule
  ],
  templateUrl: './update-submissions.html',
  styleUrl: './update-submissions.css',
  providers: [MessageService]
})
export class UpdateSubmissions implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  submissionId: number = 0;

  lessons: LessonI[] = [];
  students: StudentI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private lessonService: LessonService,
    private studentService: Student,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      content: ['', Validators.required],
      submittedAt: [new Date(), Validators.required],
      studentId: [null, Validators.required],
      lessonId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submissionId = parseInt(id);
      this.loadSubmission();
    }

    this.loadLessons();
    this.loadStudents();
  }

  // =======================================================
  // 🔹 Cargar submission
  // =======================================================
  loadSubmission(): void {
    this.loading = true;

    this.submissionService.getSubmissionById(this.submissionId).subscribe({
      next: (response: any) => {
        const submission: SubmissionI = response.submission ?? response;

        this.form.patchValue({
          content: submission.content,
          submittedAt: new Date(submission.submittedAt),
          studentId: submission.studentId,
          lessonId: submission.lessonId,
          status: submission.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar submission:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del envío'
        });
        this.loading = false;
      }
    });
  }

  // =======================================================
  // 🔹 Cargar lecciones
  // =======================================================
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (response: any) => {
        this.lessons = Array.isArray(response) ? response : response.lessons ?? [];
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

  // =======================================================
  // 🔹 Cargar estudiantes
  // =======================================================
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        this.students = Array.isArray(response) ? response : response.students ?? [];
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

  // =======================================================
  // 🔹 GUARDAR CAMBIOS
  // =======================================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;

      const value = this.form.value;

      this.submissionService.updateSubmission(this.submissionId, {
        content: value.content,
        submittedAt: value.submittedAt,
        studentId: value.studentId,
        lessonId: value.lessonId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Submission actualizada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/submissions']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error actualizando submission:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el envío'
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
    }
    return '';
  }
}

