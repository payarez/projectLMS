import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { EnrollmentService } from '../../../../services/usersAndEnrrollment/enrrollment-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { EnrollmentI } from '../../../../models/usersAndEnrrollment/enrollment';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-get-all-enrollments',
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
  templateUrl: './get-all-enrollments.html',
  styleUrls: ['./get-all-enrollments.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllEnrollments implements OnInit {
  enrollments: EnrollmentI[] = [];
  students: Record<number, StudentI> = {};
  courses: Record<number, CourseI> = {};
  loading: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: Student,
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
    this.loadStudents();
    this.loadCourses();
  }

  /** 🔹 Cargar enrollments desde backend */
  loadEnrollments(): void {
    this.loading = true;
    this.enrollmentService.getAllEnrollments().subscribe({
      next: (response: any) => {
        // Validar que sea array o acceder a propiedad 'enrollments'
        this.enrollments = Array.isArray(response) ? response : response.enrollments ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando inscripciones:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las inscripciones'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar estudiantes desde backend y mapear por id */
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        const list: StudentI[] = Array.isArray(response) ? response : response.students ?? [];
        this.students = Object.fromEntries(list.map(s => [s.id!, s]));
      },
      error: (err) => {
        console.error('Error cargando estudiantes:', err);
      }
    });
  }

  /** 🔹 Cargar cursos desde backend y mapear por id */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        const list: CourseI[] = Array.isArray(response) ? response : response.courses ?? [];
        this.courses = Object.fromEntries(list.map(c => [c.id!, c]));
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
      }
    });
  }

  /** 🔹 Obtener nombre de estudiante por id */
  studentName(id: number): string {
    return this.students[id]?.name ?? `#${id}`;
  }

  /** 🔹 Obtener título de curso por id */
  courseTitle(id: number): string {
    return this.courses[id]?.title ?? `#${id}`;
  }

  /** 🔹 Eliminación de enrollment con confirmación */
  deleteEnrollment(enrollment: EnrollmentI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la inscripción del estudiante "${this.studentName(enrollment.studentId)}" en el curso "${this.courseTitle(enrollment.courseId)}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (enrollment.id) {
          this.enrollmentService.deleteEnrollment(enrollment.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Inscripción eliminada correctamente'
              });
              this.loadEnrollments();
            },
            error: (err) => {
              console.error('Error eliminando inscripción:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la inscripción'
              });
            }
          });
        }
      }
    });
  }
}
