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

import { ModuleService } from '../../../../services/academicManagment/module-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { ModuleI } from '../../../../models/academicManagment/module';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-update-modules',
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
  templateUrl: './update-modules.html',
  styleUrl: './update-modules.css',
  providers: [MessageService]
})
export class UpdateModules implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  moduleId: number = 0;

  courses: CourseI[] = [];
  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    // Cargar cursos para selección
    this.loadCourses();

    // Obtener ID del módulo de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moduleId = parseInt(id);
      this.loadModule();
    }
  }

  /** 🔹 Cargar módulo por ID */
  loadModule(): void {
    this.loading = true;
    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (response: any) => {
        // Tomar el objeto módulo si viene dentro de { module: {...} }
        const modData: ModuleI = response.module ?? response;

        // Rellenar los campos del formulario
        this.form.patchValue({
          title: modData.title,
          description: modData.description,
          courseId: modData.courseId,
          status: modData.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando módulo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el módulo'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar cursos desde backend */
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


  /** 🔹 Actualizar módulo */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.moduleService.updateModule(this.moduleId, {
        title: value.title,
        description: value.description,
        courseId: value.courseId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Módulo actualizado correctamente'
          });
          setTimeout(() => this.router.navigate(['/modules']), 800);
        },
        error: (error) => {
          console.error('Error actualizando módulo:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el módulo'
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

  /** 🔹 Mensajes de validación */
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
