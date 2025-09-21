import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LessonI } from '../../models/academicManagment/lesson';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private readonly _state = new BehaviorSubject<LessonI[]>([
    // example data
    { id: 1, title: 'Introduction to Angular', content: 'Basic concepts of Angular framework.', moduleId: 1, status: 'ACTIVE' },
    { id: 2, title: 'Dependency Injection', content: 'Understanding DI in Angular.', moduleId: 1, status: 'INACTIVE' }
  ]);

  readonly lessons$ = this._state.asObservable();
  private get value(): LessonI[] { return this._state.value; }

  // GET all lessons
  getLessons(): LessonI[] {
    return this.value;
  }

  // ADD a new lesson
  addLesson(lesson: Omit<LessonI, 'id'>): LessonI {
    const nextId = this.value.length ? Math.max(...this.value.map(l => l.id ?? 0)) + 1 : 1;
    const newLesson: LessonI = { id: nextId, ...lesson };
    this._state.next([...this.value, newLesson]);
    return newLesson;
  }
}
