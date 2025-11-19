import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { AttemptService } from '../../../../services/academicActivities/attempt-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';

import { AttemptI } from '../../../../models/academicActivities/attempt';
import { LessonI } from '../../../../models/academicManagment/lesson';

@Component({
  selector: 'app-get-all-attempts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './get-all-attempts.html',
  styleUrl: './get-all-attempts.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllAttempts implements OnInit {

  attempts: AttemptI[] = [];
  lessons: Record<number, LessonI> = {};
  loading: boolean = false;

  constructor(
    private attemptService: AttemptService,
    private lessonService: LessonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAttempts();
    this.loadLessons();
  }

  // -----------------------------
  // CARGAR INTENTOS
  // -----------------------------
  loadAttempts(): void {
    this.loading = true;
    this.attemptService.getAllAttempts().subscribe({
      next: (attempts) => {
        this.attempts = attempts;
        this.attemptService.updateLocalAttempts(attempts);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading attempts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los intentos'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // CARGAR LECCIONES PARA MOSTRAR EL NOMBRE
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
  // AUTOCOMPLETAR NOMBRE DE LECCIÓN
  // -----------------------------
  lessonName(id: number): string {
    return this.lessons[id]?.title ?? `Lección #${id}`;
  }

  // -----------------------------
  // ELIMINAR INTENTO
  // -----------------------------
  deleteAttempt(attempt: AttemptI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el intento #${attempt.attemptNumber}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (attempt.id) {
          this.attemptService.deleteAttempt(attempt.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Intento eliminado correctamente'
              });
              this.loadAttempts();
            },
            error: (error) => {
              console.error('Error deleting attempt:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el intento'
              });
            }
          });
        }
      }
    });
  }
}
