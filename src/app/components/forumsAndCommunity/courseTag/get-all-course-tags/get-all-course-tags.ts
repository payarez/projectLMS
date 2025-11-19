import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

import { CourseTagService } from '../../../../services/forumsAndCommunity/course-tag-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

import { CourseTagI } from '../../../../models/forumsAndCommunity/courseTag';
import { CourseI } from '../../../../models/academicManagment/course';
import { TagI } from '../../../../models/forumsAndCommunity/tag';

@Component({
  selector: 'app-get-all-course-tags',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './get-all-course-tags.html',
  styleUrls: ['./get-all-course-tags.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class GetAllCourseTags implements OnInit {
  courseTags: CourseTagI[] = [];
  courses: Record<number, CourseI> = {};
  tags: Record<number, TagI> = {};
  loading: boolean = false;

  constructor(
    private courseTagService: CourseTagService,
    private courseService: CourseService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCoursesAndTags();
    this.loadCourseTags();
  }

  /** 🔹 Carga de cursos y tags */
  private async loadCoursesAndTags(): Promise<void> {
    await this.loadCourses();
    await this.loadTags();
  }

  /** 🔹 Cargar todos los CourseTags */
  /** 🔹 Cargar todos los CourseTags y asignar nombres si ya se cargaron cursos y tags */
loadCourseTags(): void {
  this.loading = true;
  this.courseTagService.getAllCourseTags().subscribe({
    next: (response: any) => {
      console.log('✅ CourseTags recibidos:', response);
      const list: CourseTagI[] = Array.isArray(response)
        ? response
        : response.courseTags ?? [];

      // Asignar referencias de curso y tag completos si existen
      this.courseTags = list.map(ct => ({
        ...ct,
        course: this.courses[ct.courseId],
        tag: this.tags[ct.tagId],
      }));

      this.courseTagService.updateLocalCourseTags(this.courseTags);
      this.loading = false;
    },
    error: (error) => {
      console.error('Error cargando CourseTags:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los CourseTags',
      });
      this.loading = false;
    },
  });
}


  /** 🔹 Cargar Cursos y mapear por ID */
  private async loadCourses(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.courseService.getAllCourses());
      const list: CourseI[] = Array.isArray(res)
        ? res
        : Array.isArray(res.courses)
        ? res.courses
        : [];
      this.courses = Object.fromEntries(list.map((c) => [c.id!, c]));
      this.courseService.updateLocalCourses(list);
    } catch (err) {
      console.error('Error cargando cursos:', err);
    }
  }

  /** 🔹 Cargar Tags y mapear por ID */
  private async loadTags(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.tagService.getAllTags());
      const list: TagI[] = Array.isArray(res)
        ? res
        : Array.isArray(res.tags)
        ? res.tags
        : [];
      this.tags = Object.fromEntries(list.map((t) => [t.id!, t]));
      this.tagService.updateLocalTags(list);
    } catch (err) {
      console.error('Error cargando tags:', err);
    }
  }

  /** 🔹 Obtener nombre de curso por ID */
  courseName(id: number): string {
    return this.courses[id]?.title ?? `Course #${id}`;
  }

  /** 🔹 Obtener nombre de tag por ID */
  tagName(id: number): string {
    return this.tags[id]?.name ?? `Tag #${id}`;
  }

  /** 🔹 Eliminación de CourseTag con confirmación */
  deleteCourseTag(ct: CourseTagI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la relación "${this.courseName(
        ct.courseId
      )}" - "${this.tagName(ct.tagId)}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (ct.id) {
          this.courseTagService.deleteCourseTag(ct.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'CourseTag eliminado correctamente',
              });
              this.loadCourseTags();
            },
            error: (err) => {
              console.error('Error eliminando CourseTag:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el CourseTag',
              });
            },
          });
        }
      },
    });
  }
}
