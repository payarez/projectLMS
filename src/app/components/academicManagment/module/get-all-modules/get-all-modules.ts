import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { ModuleService } from '../../../../services/academicManagment/module-service';
import { CourseService } from '../../../../services/academicManagment/course-service';

import { ModuleI } from '../../../../models/academicManagment/module';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-get-all-modules',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-modules.html',
  styleUrl: './get-all-modules.css',
  encapsulation: ViewEncapsulation.None,
})
export class GetAllModules {
  modules: ModuleI[] = [];
  courses: Record<number, CourseI> = {};

  constructor(
    private moduleService: ModuleService,
    private courseService: CourseService
  ) {
    // cargar módulos
    this.moduleService.modules$.subscribe(list => this.modules = list);

    // mapa de cursos
    this.courseService.courses$.subscribe(list => {
      this.courses = Object.fromEntries(list.map(c => [c.id!, c]));
    });
  }

  courseName(id: number): string {
    return this.courses[id]?.title ?? `Course #${id}`;
  }
}
