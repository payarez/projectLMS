import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CourseI } from '../../../../models/academicManagment/course';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';

@Component({
  selector: 'app-create-modules',
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
  templateUrl: './create-modules.html',
  styleUrl: './create-modules.css',
  providers: [MessageService]
})
export class CreateModules implements OnInit {
  form: FormGroup;
  courses: CourseI[] = [];
  loading: boolean = false;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moduleService: ModuleService,
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
    this.loadCourses();
  }

  /** 🔹 Cargar cursos desde el backend */
  loadCourses(): void {
  this.courseService.getAllCourses().subscribe({
    next: (response: any) => {
      console.log('Respuesta del backend cursos:', response);
      // Ajusta según la estructura real de la respuesta
      this.courses = Array.isArray(response) ? response : response.courses ?? [];
      console.log('Cursos procesados:', this.courses);
    },
    error: (error) => {
      console.error('Error cargando cursos:', error);
    }
  });
}


  /** 🔹 Crear módulo */
  submit(): void {
  if (this.form.valid) {
    this.loading = true;
    const value = this.form.value;

    this.moduleService.createModule({
      title: value.title,
      description: value.description,
      courseId: value.courseId,
      status: value.status
    }).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Módulo creado correctamente'
        });
        this.loading = false;
        setTimeout(() => this.router.navigate(['/modules']), 800);
      },
      error: (error) => {
        console.error('Error creando módulo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el módulo'
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


  /** 🔹 Cancelar y volver a la lista */
  cancelar(): void {
    this.router.navigate(['/modules']);
  }

  /** 🔹 Marcar todos los campos como tocados para mostrar errores */
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
