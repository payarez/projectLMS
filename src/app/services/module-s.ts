// module-s.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModuleI } from '../models/academicManagment/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleS {
  private modulesService = new BehaviorSubject<ModuleI[]>([
    {
      id: 1,
      courseId: 101,
      title: 'Introducción',
      order: 1,
      createdAt: new Date(2023, 4, 15),
      updatedAt: new Date(2023, 4, 15),
      status: 'ACTIVE',
      lessonIds: [1001, 1002]
    },
    {
      id: 2,
      courseId: 101,
      title: 'Avanzado',
      order: 2,
      createdAt: new Date(2023, 5, 1),
      updatedAt: new Date(2023, 5, 1),
      status: 'INACTIVE',
      lessonIds: [1003]
    }
  ]);

  modules$ = this.modulesService.asObservable();

  getModules() {
    return this.modulesService.value;
  }

  addModule(module: ModuleI) {
    const modules = this.modulesService.value;
    module.id = modules.length ? Math.max(...modules.map(m => m.id ?? 0)) + 1 : 1;
    module.createdAt = new Date();
    module.updatedAt = new Date();
    this.modulesService.next([...modules, module]);
  }
}
