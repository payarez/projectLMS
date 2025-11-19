import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { Teacher as TeacherService } from '../../../../services/usersAndEnrrollment/teacher';

@Component({
  selector: 'app-get-all-teachers',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './get-all-teachers.html',
  styleUrl: './get-all-teachers.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class GetAllTeachers implements OnInit {
  teachers: TeacherI[] = [];
  loading: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.loading = true;
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        console.log('✅ Profesores recibidos:', response);
        this.teachers = Array.isArray(response) ? response : response.teachers ?? [];
        this.teacherService.updateLocalTeachers(this.teachers);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los profesores',
        });
        this.loading = false;
      },
    });
  }

  deleteTeacher(teacher: TeacherI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el docente ${teacher.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (teacher.id) {
          this.teacherService.deleteTeacher(teacher.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Docente eliminado correctamente',
              });
              this.loadTeachers();
            },
            error: (error) => {
              console.error('Error deleting teacher:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el docente',
              });
            },
          });
        }
      },
    });
  }
}
