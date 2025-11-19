import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CourseService } from '../../../../services/academicManagment/course-service';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';

@Component({
  selector: 'app-create-forums',
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
  templateUrl: './create-forums.html',
  styleUrls: ['./create-forums.css'],
  providers: [MessageService]
})
export class CreateForums implements OnInit {
  form: FormGroup;
  courses: any[] = [];
  loading: boolean = false;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forumService: ForumService,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  /** 🔹 Cargar cursos desde el backend */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        const list = Array.isArray(response) ? response : response.courses ?? [];
        this.courses = list;

        // Actualizar BehaviorSubject si es necesario
        this.courseService.updateLocalCourses(list);
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los cursos'
        });
      }
    });
  }

  /** 🔹 Crear un nuevo foro */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.forumService.createForum({
        title: value.title,
        description: value.description,
        courseId: value.courseId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Foro creado correctamente'
          });
          this.loading = false;
          setTimeout(() => this.router.navigate(['/forums']), 800);
        },
        error: (err) => {
          console.error('Error creando foro:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el foro'
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

  /** 🔹 Cancelar y volver al listado de foros */
  cancelar(): void {
    this.router.navigate(['/forums']);
  }

  /** 🔹 Marcar todos los campos como tocados para mostrar errores */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  /** 🔹 Obtener mensaje de error para un campo */
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
    }
    return '';
  }
}
