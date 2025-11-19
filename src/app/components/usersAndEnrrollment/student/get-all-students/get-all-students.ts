import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';

@Component({
  selector: 'app-get-all-students',
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
  templateUrl: './get-all-students.html',
  styleUrls: ['./get-all-students.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllStudents implements OnInit {
  students: StudentI[] = [];
  loading: boolean = false;

  constructor(
    private studentService: Student,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  /** 🔹 Cargar estudiantes desde backend */
  loadStudents(): void {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        // Asegurarse de recibir un array
        this.students = Array.isArray(response) ? response : response.students ?? [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estudiantes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los estudiantes'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Eliminación de estudiante con confirmación */
  deleteStudent(student: StudentI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar al estudiante "${student.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (student.id) {
          this.studentService.deleteStudent(student.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Estudiante eliminado correctamente',
              });
              this.loadStudents();
            },
            error: (err) => {
              console.error('Error eliminando estudiante:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el estudiante',
              });
            },
          });
        }
      },
    });
  }
}
