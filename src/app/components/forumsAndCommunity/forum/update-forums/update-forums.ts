import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-update-forums',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-forums.html',
  styleUrl: './update-forums.css',
  providers: [MessageService]
})
export class UpdateForums implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  forumId: number = 0;

  courses: CourseI[] = [];
  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private forumService: ForumService,
    private courseService: CourseService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      courseId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar cursos
    this.loadCourses();

    // Obtener ID del foro
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.forumId = parseInt(id);
      this.loadForum();
    }
  }

  /** 🔹 Cargar foro por ID */
  loadForum(): void {
    this.loading = true;
    this.forumService.getForumById(this.forumId).subscribe({
      next: (response: any) => {
        const forumData: ForumI = response.forum ?? response;
        this.form.patchValue({
          title: forumData.title,
          description: forumData.description,
          courseId: forumData.courseId,
          status: forumData.status
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando foro:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el foro'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar cursos desde backend */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.courses = Array.isArray(response) ? response : response.courses ?? [];
      },
      error: (error) => {
        console.error('Error cargando cursos:', error);
      }
    });
  }

  /** 🔹 Actualizar foro */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;
      this.forumService.updateForum(this.forumId, {
        title: value.title,
        description: value.description,
        courseId: value.courseId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Foro actualizado correctamente'
          });
          setTimeout(() => this.router.navigate(['/forums']), 800);
        },
        error: (error) => {
          console.error('Error actualizando foro:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el foro'
          });
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos correctamente'
      });
    }
  }

  /** 🔹 Cancelar */
  cancelar(): void {
    this.router.navigate(['/forums']);
  }

  /** 🔹 Marcar campos como tocados */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  /** 🔹 Mensajes de error de validación */
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
