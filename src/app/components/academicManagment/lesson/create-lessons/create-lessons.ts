import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ModuleI } from '../../../../models/academicManagment/module';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-lessons', standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    Select,
    ToastModule
  ],
  templateUrl: './create-lessons.html',
  styleUrl: './create-lessons.css',
  providers: [MessageService]
})
export class CreateLessons implements OnInit {
  
  form: FormGroup;
  loading: boolean = false;

  modules: { label: string; value: number }[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private moduleService: ModuleService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      moduleId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadModules();
  }

  // =====================================
  //        🔹 NUEVO loadModules()
  // =====================================
  loadModules(): void {
    this.moduleService.getAllModules().subscribe({
      next: (response: any) => {

        const modulesList: ModuleI[] = Array.isArray(response)
          ? response
          : response.modules ?? [];

        this.modules = modulesList.map((m: ModuleI) => ({
          label: m.title,
          value: m.id!
        }));
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

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const lessonData = this.form.value;

      this.lessonService.createLesson(lessonData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Lección creada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/lessons']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating lesson:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la lección'
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
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
