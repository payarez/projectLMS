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

import { AttemptService } from '../../../../services/academicActivities/attempt-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';

import { AttemptI } from '../../../../models/academicActivities/attempt';
import { LessonI } from '../../../../models/academicManagment/lesson';


@Component({
  selector: 'app-update-attempts',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-attempts.html',
  styleUrl: './update-attempts.css',
  providers: [MessageService]
})
export class UpdateAttempts implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  attemptId: number = 0;

  lessons: LessonI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private attemptService: AttemptService,
    private lessonService: LessonService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      attemptNumber: [1, Validators.required],
      date: [new Date(), Validators.required],
      result: ['', Validators.required],
      lessonId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.attemptId = parseInt(id);
      this.loadAttempt();
    }

    this.loadLessons();
  }

  // =======================================================
  // 🔹 Cargar intento
  // =======================================================
  loadAttempt(): void {
    this.loading = true;
    this.attemptService.getAttemptById(this.attemptId).subscribe({
      next: (response: any) => {
        const attempt: AttemptI = response.attempt ?? response;

        this.form.patchValue({
          attemptNumber: attempt.attemptNumber,
          date: new Date(attempt.date),
          result: attempt.result,
          lessonId: attempt.lessonId,
          status: attempt.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar intento:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del intento'
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
  // 🔹 GUARDAR
  // =======================================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.attemptService.updateAttempt(this.attemptId, {
        attemptNumber: value.attemptNumber,
        date: value.date,
        result: value.result,
        lessonId: value.lessonId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Intento actualizado correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/attempts']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar el intento:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el intento'
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
    this.router.navigate(['/attempts']);
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