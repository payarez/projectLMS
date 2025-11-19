import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';

@Component({
  selector: 'app-update-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, ToastModule],
  templateUrl: './update-students.html',
  styleUrl: './update-students.css',
  providers: [MessageService]
})
export class UpdateStudents implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  studentId: number = 0;

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: Student,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = parseInt(id);
      this.loadStudent();
    }
  }

  loadStudent(): void {
    this.loading = true;
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: any) => {
        const data: StudentI = response.student ?? response;

        this.form.patchValue({
          name: data.name,
          email: data.email,
          status: data.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estudiante:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar la información del estudiante'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const studentData = this.form.value;

      this.studentService.updateStudent(this.studentId, studentData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Estudiante actualizado correctamente'
          });
          setTimeout(() => this.router.navigate(['/students']), 1000);
        },
        error: (error) => {
          console.error('Error actualizando estudiante:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el estudiante'
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
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
