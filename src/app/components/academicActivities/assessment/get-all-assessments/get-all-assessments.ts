import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { AssessmentI } from '../../../../models/academicActivities/assessment';
import { SubmissionI } from '../../../../models/academicActivities/submission';

import { AssessmentService } from '../../../../services/academicActivities/assessment-service';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';

@Component({
  selector: 'app-get-all-assessments',standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule, ConfirmDialogModule, ToastModule],
  templateUrl: './get-all-assessments.html',
  styleUrl: './get-all-assessments.css', 
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllAssessments implements OnInit {

  assessments: AssessmentI[] = [];
  submissions: Record<number, SubmissionI> = {};
  loading: boolean = false;

  constructor(
    private assessmentService: AssessmentService,
    private submissionService: SubmissionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAssessments();
    this.loadSubmissions();
  }

  // -----------------------------
  // CARGAR ASSESSMENTS
  // -----------------------------
  loadAssessments(): void {
    this.loading = true;
    this.assessmentService.getAllAssessments().subscribe({
      next: (data) => {
        this.assessments = data;
        this.assessmentService.updateLocalAssessments(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading assessments:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las evaluaciones'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // CARGAR SUBMISSIONS
  // -----------------------------
  loadSubmissions(): void {
    this.submissionService.getAllSubmissions().subscribe({
      next: (list) => {
        this.submissions = Object.fromEntries(list.map(s => [s.id!, s]));
      },
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudieron cargar las entregas'
        });
      }
    });
  }

  // -----------------------------
  // OBTENER NOMBRE DE SUBMISSION
  // -----------------------------
  submissionName(id: number): string {
    return this.submissions[id]?.content ?? `Entrega #${id}`;
  }

  submissionId(id: number): string {
  return this.submissions[id]?.id?.toString() ?? `ID #${id}`;
}

  

  // -----------------------------
  // ELIMINAR ASSESSMENT
  // -----------------------------
  deleteAssessment(assessment: AssessmentI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la evaluación con nota ${assessment.grade}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (assessment.id) {
          this.assessmentService.deleteAssessment(assessment.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Evaluación eliminada correctamente'
              });
              this.loadAssessments();
            },
            error: (error) => {
              console.error('Error deleting assessment:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la evaluación'
              });
            }
          });
        }
      }
    });
  }
}