import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { EnrollmentI } from '../../../../models/usersAndEnrrollment/enrollment';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { CourseI } from '../../../../models/academicManagment/course';

import { EnrollmentService } from '../../../../services/usersAndEnrrollment/enrrollment-service';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';
import { CourseService } from '../../../../services/academicManagment/course-service';


@Component({
  selector: 'app-get-all-enrollments',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-enrollments.html',
  styleUrl: './get-all-enrollments.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllEnrollments {
  enrollments: EnrollmentI[] = [];
  students: Record<number, StudentI> = {};
  courses: Record<number, CourseI> = {};

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    // Load enrollments
    this.enrollmentService.enrollments$.subscribe(list => this.enrollments = list);

    // Map students by id
    this.studentService.students$.subscribe(list => {
      this.students = Object.fromEntries(list.map(s => [s.id!, s]));
    });

    // Map courses by id
    this.courseService.courses$.subscribe(list => {
      this.courses = Object.fromEntries(list.map(c => [c.id!, c]));
    });
  }

  studentName(id: number): string {
    return this.students[id]?.name ?? `#${id}`;
  }

  courseTitle(id: number): string {
    return this.courses[id]?.title ?? `#${id}`;
  }
}
