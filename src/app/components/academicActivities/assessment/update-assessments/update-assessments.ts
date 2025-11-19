import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AssessmentService } from '../../../../services/academicActivities/assessment-service';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';

import { AssessmentI } from '../../../../models/academicActivities/assessment';
import { SubmissionI } from '../../../../models/academicActivities/submission';

@Component({
  selector: 'app-update-assessments',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-assessments.html',
  styleUrl: './update-assessments.css',
  providers: [MessageService]
})
export class UpdateAssessments implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  assessmentId: number = 0;

  submissions: SubmissionI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private submissionService: SubmissionService,
    private messageService: MessageService
  ) {

    this.form = this.fb.group({
      grade: [0, [Validators.required]],
      date: [new Date(), Validators.required],
      feedback: [''],
      submissionId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.assessmentId = parseInt(id);
      this.loadAssessment();
    }

    this.loadSubmissions();
  }

  // =======================================================
  // 🔹 Cargar evaluación
  // =======================================================
  loadAssessment(): void {
    this.loading = true;

    this.assessmentService.getAssessmentById(this.assessmentId).subscribe({
      next: (response: any) => {
        const assessment: AssessmentI = response.assessment ?? response;

        this.form.patchValue({
          grade: assessment.grade,
          date: new Date(assessment.date),
          feedback: assessment.feedback,
          submissionId: assessment.submissionId,
          status: assessment.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar evaluación:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información de la evaluación'
        });
        this.loading = false;
      }
    });
  }

  // =======================================================
  // 🔹 Cargar submissions
  // =======================================================
  loadSubmissions(): void {
    this.submissionService.getAllSubmissions().subscribe({
      next: (response: any) => {
        this.submissions = Array.isArray(response)
          ? response
          : response.submissions ?? [];
      },
      error: (error) => {
        console.error('Error cargando entregas:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las entregas'
        });
      }
    });
  }

  // =======================================================
  // 🔹 GUARDAR
  // =======================================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.assessmentService.updateAssessment(this.assessmentId, {
        grade: value.grade,
        date: value.date,
        feedback: value.feedback,
        submissionId: value.submissionId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Evaluación actualizada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/assessments']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar evaluación:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la evaluación'
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
    }
    return '';
  }
}