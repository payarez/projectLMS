import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { ModuleI } from '../../../../models/academicManagment/module';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-get-all-lessons',standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule],
  templateUrl: './get-all-lessons.html',
  styleUrl: './get-all-lessons.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllLessons {
  lessons: LessonI[] = [];
  modules: Record<number, ModuleI> = {};

  constructor(
    private lessonService: LessonService,
    private moduleService: ModuleService
  ) {
    // cargar lecciones
    this.lessonService.lessons$.subscribe(list => this.lessons = list);

    // mapa de módulos
    this.moduleService.modules$.subscribe(list => {
      this.modules = Object.fromEntries(list.map(m => [m.id!, m]));
    });
  }

  moduleName(id: number): string {
    return this.modules[id]?.title ?? `Module #${id}`;
  }
}
