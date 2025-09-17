// get-all-courses.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CourseS } from '../../../../services/course-s';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-get-all-courses',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-courses.html',
  styleUrl: './get-all-courses.css'
})
export class GetAllCourses {
  courses: CourseI[] = [];

  constructor(private courseService: CourseS) {
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }
}
