import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

import { Student } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule, SelectModule],
  templateUrl: './create-students.html',
  styleUrl: './create-students.css',
  providers: [MessageService]
})
export class CreateStudents implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: Student,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.studentService.createStudent({
        name: value.name ?? '',
        email: value.email ?? '',
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Estudiante creado correctamente'
          });
          this.loading = false;
          setTimeout(() => this.router.navigate(['/students']), 800);
        },
        error: (error) => {
          console.error('Error creando estudiante:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el estudiante'
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

  cancelar(): void {
    this.router.navigate(['/students']);
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
      if (field.errors['email']) return 'Email no válido';
    }
    return '';
  }
}
