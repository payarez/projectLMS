import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CourseService } from '../../../../services/academicManagment/course-service';
import { CourseTagService } from '../../../../services/forumsAndCommunity/course-tag-service';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

@Component({
  selector: 'app-create-course-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './create-course-tags.html',
  styleUrl: './create-course-tags.css',
  providers: [MessageService]
})
export class CreateCourseTags implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  courses: any[] = [];
  tags: any[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseTagService: CourseTagService,
    private courseService: CourseService,
    private tagService: TagService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      courseId: [null, Validators.required],
      tagId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadTags();
  }

  /** 🔹 Cargar cursos desde el backend */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.courses = Array.isArray(response) ? response : response.courses ?? [];
      },
      error: (error) => {
        console.error('Error cargando cursos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los cursos'
        });
      }
    });
  }

  /** 🔹 Cargar tags desde el backend */
  loadTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (response: any) => {
        this.tags = Array.isArray(response) ? response : response.tags ?? [];
      },
      error: (error) => {
        console.error('Error cargando tags:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los tags'
        });
      }
    });
  }

  /** 🔹 Crear course tag */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.courseTagService.createCourseTag({
        courseId: value.courseId,
        tagId: value.tagId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'CourseTag creado correctamente'
          });
          setTimeout(() => this.router.navigate(['/coursetags']), 1000);
        },
        error: (error) => {
          console.error('Error creando course tag:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el CourseTag'
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

  /** 🔹 Cancelar y volver a la lista */
  cancelar(): void {
    this.router.navigate(['/coursetags']);
  }

  /** 🔹 Marcar todos los campos como tocados */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
