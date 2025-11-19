import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { ModuleI } from '../../../../models/academicManagment/module';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-get-all-lessons',
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
  templateUrl: './get-all-lessons.html',
  styleUrl: './get-all-lessons.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllLessons implements OnInit {
  
  lessons: LessonI[] = [];
  modules: Record<number, ModuleI> = {};
  loading: boolean = false;

  constructor(
    private lessonService: LessonService,
    private moduleService: ModuleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadLessons();
    this.loadModules();
  }

  // -----------------------------
  // CARGAR LECCIONES
  // -----------------------------
  loadLessons(): void {
    this.loading = true;
    this.lessonService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.lessonService.updateLocalLessons(lessons);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lessons:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las lecciones'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // CARGAR MÓDULOS
  // -----------------------------
  loadModules(): void {
    this.moduleService.getAllModules().subscribe({
      next: (list) => {
        this.modules = Object.fromEntries(list.map(m => [m.id!, m]));
      },
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudieron cargar los módulos'
        });
      }
    });
  }

  // -----------------------------
  // AUTOCOMPLETAR NOMBRE DE MÓDULO
  // -----------------------------
  moduleName(id: number): string {
    return this.modules[id]?.title ?? `Module #${id}`;
  }

  // -----------------------------
  // ELIMINAR LECCIÓN
  // -----------------------------
  deleteLesson(lesson: LessonI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la lección "${lesson.title}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (lesson.id) {
          this.lessonService.deleteLesson(lesson.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Lección eliminada correctamente'
              });
              this.loadLessons();
            },
            error: (error) => {
              console.error('Error deleting lesson:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la lección'
              });
            }
          });
        }
      }
    });
  }
}
