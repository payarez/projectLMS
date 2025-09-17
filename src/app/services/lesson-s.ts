import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LessonI } from '../models/academicManagment/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonS {
  private lessonsService = new BehaviorSubject<LessonI[]>([
    {
      id: 1,
      moduleId: 1,
      title: 'Introducción a Angular',
      content: 'Contenido inicial de la lección',
      order: 1,
      createdAt: new Date(2023, 4, 15),
      updatedAt: new Date(2023, 4, 15),
      status: 'ACTIVE',
      submissionIds: [201, 202],
      attemptIds: [301]
    },
    {
      id: 2,
      moduleId: 1,
      title: 'Componentes y Templates',
      content: 'Aprendiendo sobre componentes',
      order: 2,
      createdAt: new Date(2023, 4, 20),
      updatedAt: new Date(2023, 4, 20),
      status: 'INACTIVE',
      submissionIds: [203],
      attemptIds: [302, 303]
    }
  ]);

  lessons$ = this.lessonsService.asObservable();

  getLessons() {
    return this.lessonsService.value;
  }

  addLesson(lesson: LessonI) {
    const lessons = this.lessonsService.value;
    lesson.id = lessons.length ? Math.max(...lessons.map(l => l.id ?? 0)) + 1 : 1;
    lesson.createdAt = new Date();
    lesson.updatedAt = new Date();
    this.lessonsService.next([...lessons, lesson]);
  }
}
