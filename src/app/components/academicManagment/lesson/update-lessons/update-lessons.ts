import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';

import { LessonI } from '../../../../models/academicManagment/lesson';
import { ModuleI } from '../../../../models/academicManagment/module';

@Component({
  selector: 'app-update-lessons',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-lessons.html',
  styleUrl: './update-lessons.css',
  providers: [MessageService]
})
export class UpdateLessons implements OnInit {

  form: FormGroup;
  loading = false;
  lessonId: number = 0;

  modules: ModuleI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private moduleService: ModuleService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      moduleId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lessonId = parseInt(id);
      this.loadLesson();
    }

    this.loadModules();
  }

  // ===========================
  //   Cargar lección por ID
  // ===========================
  loadLesson(): void {
    this.loading = true;

    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response: any) => {
        const lesson: LessonI = response.lesson ?? response;

        this.form.patchValue({
          title: lesson.title,
          content: lesson.content,
          status: lesson.status,
          moduleId: lesson.moduleId
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la lección:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información de la lección'
        });
        this.loading = false;
      }
    });
  }

  // ===========================
  //      Cargar módulos
  // ===========================
  loadModules(): void {
    this.moduleService.getAllModules().subscribe({
      next: (response: any) => {
        this.modules = Array.isArray(response) ? response : response.modules ?? [];
      },
      error: (error) => {
        console.error('Error cargando módulos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los módulos'
        });
      }
    });
  }

  // ===========================
  //        Guardar cambios
  // ===========================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;

      const value = this.form.value;

      this.lessonService.updateLesson(this.lessonId, {
        title: value.title,
        content: value.content,
        status: value.status,
        moduleId: value.moduleId
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lección actualizada correctamente'
          });
          setTimeout(() => this.router.navigate(['/lessons']), 1000);
        },
        error: (error) => {
          console.error('Error al actualizar la lección:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la lección'
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
    this.router.navigate(['/lessons']);
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
