import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CourseI } from '../../../../models/academicManagment/course';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';

@Component({
  selector: 'app-get-all-courses',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './get-all-courses.html',
  styleUrl: './get-all-courses.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class GetAllCourses implements OnInit {
  courses: CourseI[] = [];
  teachers: TeacherI[] = [];
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    private teacherService: Teacher,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadTeachers();
  }

  /** 🔹 Carga de cursos desde el backend */
  loadCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        console.log('✅ Cursos recibidos:', response);
        this.courses = Array.isArray(response) ? response : response.courses ?? [];
        this.courseService.updateLocalCourses(this.courses);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los cursos',
        });
        this.loading = false;
      },
    });
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        console.log('✅ Profesores recibidos:', response);
        this.teachers = Array.isArray(response) ? response : response.teachers ?? [];
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
      },
    });
  }

  /** 🔹 Obtener nombre del profesor por ID */
  teacherName(teacherId: number): string {
    const teacher = this.teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Sin asignar';
  }

  /** 🔹 Eliminación de curso con confirmación */
  deleteCourse(course: CourseI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el curso "${course.title}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (course.id) {
          this.courseService.deleteCourse(course.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Curso eliminado correctamente',
              });
              this.loadCourses();
            },
            error: (error) => {
              console.error('Error deleting course:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el curso',
              });
            },
          });
        }
      },
    });
  }
}
