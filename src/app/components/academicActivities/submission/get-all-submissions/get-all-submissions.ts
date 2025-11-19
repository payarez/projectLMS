import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { SubmissionI } from '../../../../models/academicActivities/submission';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';

import { SubmissionService } from '../../../../services/academicActivities/submission-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';


@Component({
  selector: 'app-get-all-submissions',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule, ConfirmDialogModule, ToastModule],
  templateUrl: './get-all-submissions.html',
  styleUrl: './get-all-submissions.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllSubmissions implements OnInit {

  submissions: SubmissionI[] = [];
  lessons: Record<number, LessonI> = {};
  students: Record<number, StudentI> = {};
  loading: boolean = false;

  constructor(
    private submissionService: SubmissionService,
    private lessonService: LessonService,
    private studentService: Student,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
    this.loadLessons();
    this.loadStudents();
  }

  // -----------------------------
  // CARGAR SUBMISSIONS
  // -----------------------------
  loadSubmissions(): void {
    this.loading = true;

    this.submissionService.getAllSubmissions().subscribe({
      next: (submissions) => {
        this.submissions = submissions;
        this.submissionService.updateLocalSubmissions(submissions);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las entregas'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // CARGAR LECCIONES
  // -----------------------------
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (list) => {
        this.lessons = Object.fromEntries(list.map(l => [l.id!, l]));
      },
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudieron cargar las lecciones'
        });
      }
    });
  }

  // -----------------------------
  // CARGAR ESTUDIANTES
  // -----------------------------
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (list) => {
        this.students = Object.fromEntries(list.map(s => [s.id!, s]));
      },
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudieron cargar los estudiantes'
        });
      }
    });
  }

  // -----------------------------
  // AUTOCOMPLETAR NOMBRES
  // -----------------------------
  lessonName(id: number): string {
    return this.lessons[id]?.title ?? `Lección #${id}`;
  }

  studentName(id: number): string {
  const student = this.students[id];
  return student ? student.name : `Estudiante #${id}`;
}


  // -----------------------------
  // ELIMINAR SUBMISSION
  // -----------------------------
  deleteSubmission(submission: SubmissionI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la entrega del estudiante #${submission.studentId}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (submission.id) {
          this.submissionService.deleteSubmission(submission.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Entrega eliminada correctamente'
              });
              this.loadSubmissions();
            },
            error: (error) => {
              console.error('Error deleting submission:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la entrega'
              });
            }
          });
        }
      }
    });
  }
}