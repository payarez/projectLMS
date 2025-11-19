import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ModuleService } from '../../../../services/academicManagment/module-service';
import { CourseService } from '../../../../services/academicManagment/course-service';

import { ModuleI } from '../../../../models/academicManagment/module';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-get-all-modules',
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
  templateUrl: './get-all-modules.html',
  styleUrls: ['./get-all-modules.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllModules implements OnInit {
  modules: ModuleI[] = [];
  courses: Record<number, CourseI> = {};
  loading: boolean = false;

  constructor(
    private moduleService: ModuleService,
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadModules();
  }

  /** 🔹 Cargar módulos desde el backend */
  private loadModules(): void {
    this.loading = true;
    this.moduleService.getAllModules().subscribe({
      next: (response: any) => {
        // asegurarse de que sea array
        const modulesList = Array.isArray(response) ? response : response.modules ?? [];
        console.log('✅ Modules recibidos:', modulesList);
        this.modules = modulesList;
        this.moduleService.updateLocalModules(this.modules);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando módulos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los módulos'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Cargar cursos y mapear por ID */
  private loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        const coursesList = Array.isArray(response) ? response : response.courses ?? [];
        this.courses = Object.fromEntries(coursesList.map((c: { id: any; }) => [c.id!, c]));
      },
      error: (error) => {
        console.error('Error cargando cursos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los cursos'
        });
      }
    });
  }

  /** 🔹 Obtener nombre de curso por ID */
  courseName(id: number): string {
    return this.courses[id]?.title ?? `Course #${id}`;
  }

  /** 🔹 Eliminación de módulo con confirmación */
  deleteModule(module: ModuleI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el módulo "${module.title}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (module.id) {
          this.moduleService.deleteModule(module.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Módulo eliminado correctamente',
              });
              this.loadModules();
            },
            error: (err) => {
              console.error('Error eliminando módulo:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el módulo',
              });
            },
          });
        }
      },
    });
  }
}
