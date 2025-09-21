import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModuleI } from '../../models/academicManagment/module';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private readonly _state = new BehaviorSubject<ModuleI[]>([
    // example data
    { id: 1, title: 'Getting Started', description: 'Introduction to the basics of the course.', courseId: 1, status: 'ACTIVE' },
    { id: 2, title: 'Advanced Concepts', description: 'Deep dive into advanced topics.', courseId: 1, status: 'INACTIVE' }
  ]);

  readonly modules$ = this._state.asObservable();
  private get value(): ModuleI[] { return this._state.value; }

  // GET all modules
  getModules(): ModuleI[] {
    return this.value;
  }

  // ADD a new module
  addModule(module: Omit<ModuleI, 'id'>): ModuleI {
    const nextId = this.value.length ? Math.max(...this.value.map(m => m.id ?? 0)) + 1 : 1;
    const newModule: ModuleI = { id: nextId, ...module };
    this._state.next([...this.value, newModule]);
    return newModule;
  }
}
