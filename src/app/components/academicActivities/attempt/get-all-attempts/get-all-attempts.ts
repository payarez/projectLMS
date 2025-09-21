import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AttemptI } from '../../../../models/academicActivities/attempt';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { AttemptService } from '../../../../services/academicActivities/attempt-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';

@Component({
  selector: 'app-get-all-attempts',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-attempts.html',
  styleUrl: './get-all-attempts.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllAttempts {
  attempts: AttemptI[] = [];
  lessons: Record<number, LessonI> = {};

  constructor(
    private attemptService: AttemptService,
    private lessonService: LessonService
  ) {
    // cargar intentos
    this.attemptService.attempts$.subscribe(list => this.attempts = list);

    // mapa de lecciones
    this.lessonService.lessons$.subscribe(list => {
      this.lessons = Object.fromEntries(list.map(l => [l.id!, l]));
    });
  }

  lessonTitle(id: number): string {
    return this.lessons[id]?.title ?? `Lesson #${id}`;
  }
}
