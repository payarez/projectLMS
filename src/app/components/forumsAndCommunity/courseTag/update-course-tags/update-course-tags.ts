import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CourseService } from '../../../../services/academicManagment/course-service';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';
import { CourseTagService } from '../../../../services/forumsAndCommunity/course-tag-service';
import { CourseI } from '../../../../models/academicManagment/course';
import { TagI } from '../../../../models/forumsAndCommunity/tag';
import { CourseTagI } from '../../../../models/forumsAndCommunity/courseTag';

@Component({
  selector: 'app-update-course-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-course-tags.html',
  styleUrl: './update-course-tags.css',
  providers: [MessageService]
})
export class UpdateCourseTags implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  courseTagId: number = 0;

  courses: CourseI[] = [];
  tags: TagI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseTagId = parseInt(id);
      this.loadCourseTag();
    }
    this.loadCourses();
    this.loadTags();
  }

  /** 🔹 Cargar relación CourseTag por ID */
  loadCourseTag(): void {
    this.loading = true;
    this.courseTagService.getCourseTagById(this.courseTagId).subscribe({
      next: (response: any) => {
        const ct: CourseTagI = response.courseTag ?? response;

        this.form.patchValue({
          courseId: ct.courseId,
          tagId: ct.tagId,
          status: ct.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar CourseTag:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la relación'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar todos los cursos para el select */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (res: any) => {
        this.courses = Array.isArray(res) ? res : res.courses ?? [];
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

  /** 🔹 Cargar todos los tags para el select */
  loadTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (res: any) => {
        this.tags = Array.isArray(res) ? res : res.tags ?? [];
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

  /** 🔹 Guardar cambios en el CourseTag */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.courseTagService.updateCourseTag(this.courseTagId, {
        courseId: value.courseId,
        tagId: value.tagId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'CourseTag actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/coursetags']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar CourseTag:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la relación'
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
    this.router.navigate(['/coursetags']);
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
