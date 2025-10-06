import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SubmissionI } from '../../../../models/academicActivities/submission';
import { LessonI } from '../../../../models/academicManagment/lesson';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { SubmissionService } from '../../../../services/academicActivities/submission-service';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-get-all-submissions',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule],
  templateUrl: './get-all-submissions.html',
  styleUrl: './get-all-submissions.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllSubmissions {
  submissions: SubmissionI[] = [];
  lessons: Record<number, LessonI> = {};
  students: Record<number, StudentI> = {};

  constructor(
    private submissionService: SubmissionService,
    private lessonService: LessonService,
    private studentService: StudentService
  ) {
    // cargar submissions
    this.submissionService.submissions$.subscribe(list => this.submissions = list);

    // mapa de lecciones
    this.lessonService.lessons$.subscribe(list => {
      this.lessons = Object.fromEntries(list.map(l => [l.id!, l]));
    });

    // mapa de estudiantes
    this.studentService.students$.subscribe(list => {
      this.students = Object.fromEntries(list.map(s => [s.id!, s]));
    });
  }

  lessonTitle(id: number): string {
    return this.lessons[id]?.title ?? `Lesson #${id}`;
  }

  studentName(id: number): string {
    return this.students[id]?.name ?? `Student #${id}`;
  }
}
