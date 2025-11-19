import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-get-all-forums',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './get-all-forums.html',
  styleUrl: './get-all-forums.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class GetAllForums implements OnInit {
  forums: ForumI[] = [];
  courses: Record<number, CourseI> = {};
  loading: boolean = false;

  constructor(
    private forumService: ForumService,
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadForums();
  }

  /** 🔹 Carga de cursos y mapeo por ID */
  loadCourses(): void {
    this.courseService.courses$.subscribe((list: CourseI[]) => {
      this.courses = Object.fromEntries(list.map(c => [c.id!, c]));
    });
  }

  /** 🔹 Carga de foros desde el backend */
  loadForums(): void {
  this.loading = true;
  this.forumService.getAllForums().subscribe({
    next: (data: any) => {
      console.log('✅ Foros recibidos desde backend:', data);
      // asegurar que siempre sea array
      this.forums = Array.isArray(data) ? data : data.forums ?? [];
      this.forumService.updateLocalForums(this.forums);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando foros:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los foros'
      });
      this.loading = false;
    }
  });
}


  /** 🔹 Obtener título del curso por ID */
  courseTitle(id: number): string {
    return this.courses[id]?.title ?? `#${id}`;
  }

  /** 🔹 Eliminación de foro con confirmación */
  deleteForum(forum: ForumI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el foro "${forum.title}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (forum.id) {
          this.forumService.deleteForum(forum.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Foro eliminado correctamente'
              });
              this.loadForums(); // refrescar lista
            },
            error: (err) => {
              console.error('Error eliminando foro:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el foro'
              });
            }
          });
        }
      }
    });
  }
}
