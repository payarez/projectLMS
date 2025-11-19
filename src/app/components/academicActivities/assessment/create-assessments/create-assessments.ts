import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { SubmissionI } from '../../../../models/academicActivities/submission';
import { AssessmentService } from '../../../../services/academicActivities/assessment-service';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';

@Component({
  selector: 'app-create-assessments',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ToastModule,
    Select
  ],
  standalone: true,
  templateUrl: './create-assessments.html',
  styleUrl: './create-assessments.css',
  providers: [MessageService]
})

export class CreateAssessments implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  submissions: { label: string; value: number }[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assessmentService: AssessmentService,
    private submissionService: SubmissionService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      grade: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      feedback: ['', [Validators.minLength(3)]],
      date: ['', Validators.required],
      submissionId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSubmissions();
  }

  // =====================================
  //       🔹 CARGAR SUBMISSIONS
  // =====================================
  loadSubmissions(): void {
    this.submissionService.getAllSubmissions().subscribe({
      next: (response: any) => {

        const submissionList: SubmissionI[] = Array.isArray(response)
          ? response
          : response.submissions ?? [];

        this.submissions = submissionList.map((s: SubmissionI) => ({
          label: `Submission #${s.id} - ${s.content?.substring(0, 25) || ''}`,
          value: s.id!
        }));
      },
      error: (error) => {
        console.error('Error cargando submissions:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las submissions'
        });
      }
    });
  }

  // =====================================
  //       🔹 CREAR ASSESSMENT
  // =====================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const assessmentData = this.form.value;

      this.assessmentService.createAssessment(assessmentData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Assessment creado correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/assessments']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al crear assessment:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el assessment'
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
    this.router.navigate(['/assessments']);
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
      if (field.errors['min']) return `La nota debe ser mayor o igual a 0`;
      if (field.errors['max']) return `La nota debe ser menor o igual a 100`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

}