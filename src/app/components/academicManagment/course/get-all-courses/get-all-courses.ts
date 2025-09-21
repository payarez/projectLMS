import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CourseI } from '../../../../models/academicManagment/course';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';

@Component({
  selector: 'app-get-all-courses',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-courses.html',
  styleUrl: './get-all-courses.css',
  encapsulation: ViewEncapsulation.None,
})
export class GetAllCourses {
  courses: CourseI[] = [];
  teachers: Record<number, TeacherI> = {};

  constructor(
    private courseService: CourseService,
    private teacherService: Teacher
  ) {
    // cargar cursos
    this.courseService.courses$.subscribe(list => this.courses = list);

    // mapa de docentes
    this.teacherService.teachers$.subscribe(list => {
      this.teachers = Object.fromEntries(list.map(t => [t.id!, t]));
    });
  }

  teacherName(id: number): string {
    return this.teachers[id]?.name ?? `Teacher #${id}`;
  }
}
