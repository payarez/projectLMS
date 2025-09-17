// get-all-lessons.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { LessonS } from '../../../../services/lesson-s';
import { LessonI } from '../../../../models/academicManagment/lesson';

@Component({
  selector: 'app-get-all-lessons',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-lessons.html',
  styleUrl: './get-all-lessons.css'
})
export class GetAllLessons {
  lessons: LessonI[] = [];

  constructor(private lessonService: LessonS) {
    this.lessonService.lessons$.subscribe(lessons => {
      this.lessons = lessons;
    });
  }
}
