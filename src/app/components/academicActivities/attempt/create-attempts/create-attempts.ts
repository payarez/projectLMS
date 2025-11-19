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
    DatePickerModule,
    Select,
    TextareaModule,
    ToastModule
  ],
  standalone: true,
  templateUrl: './create-attempts.html',
  styleUrl: './create-attempts.css',
  providers: [MessageService]
})
export class CreateAttempts implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  lessons: { label: string; value: number }[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private attemptService: AttemptService,
    private lessonService: LessonService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      attemptNumber: [1, [Validators.required]],
      date: ['', Validators.required],
      result: ['', [Validators.minLength(3)]],
      lessonId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLessons();
  }

  // =====================================
  //        🔹 CARGAR LECCIONES
  // =====================================
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (response: any) => {

        const lessonsList: LessonI[] = Array.isArray(response)
          ? response
          : response.lessons ?? [];

        this.lessons = lessonsList.map((l: LessonI) => ({
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
  //        🔹 CREAR ATTEMPT
  // =====================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const attemptData = this.form.value;

      this.attemptService.createAttempt(attemptData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Intento creado correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/attempts']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al crear attempt:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el intento'
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
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}