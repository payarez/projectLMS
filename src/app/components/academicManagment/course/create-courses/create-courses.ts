import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';

@Component({
  selector: 'app-create-courses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ToastModule
  ],
  templateUrl: './create-courses.html',
  styleUrl: './create-courses.css',
  providers: [MessageService]
})
export class CreateCourses implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  teachers: TeacherI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private teacherService: Teacher,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      teacherId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  /** 🔹 Cargar profesores desde el backend */
  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = Array.isArray(response) ? response : response.teachers ?? [];
      },
      error: (error) => {
        console.error('Error cargando profesores:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los profesores'
        });
      }
    });
  }

  /** 🔹 Crear curso */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const courseData = this.form.value;

      this.courseService.createCourse(courseData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Curso creado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/courses']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creando curso:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el curso'
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
    this.router.navigate(['/courses']);
  }

  /** 🔹 Marcar todos los campos como tocados */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  /** 🔹 Mensajes personalizados de validación */
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
