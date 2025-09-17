// get-all-course-tags.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CourseTagS } from '../../../../services/course-tag-s';
import { CourseTagI } from '../../../../models/forumsAndCommunity/courseTag';

@Component({
  selector: 'app-get-all-course-tags',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-course-tags.html',
  styleUrl: './get-all-course-tags.css'
})
export class GetAllCourseTags {
  courseTags: CourseTagI[] = [];

  constructor(private courseTagService: CourseTagS) {
    this.courseTagService.courseTags$.subscribe(courseTags => {
      this.courseTags = courseTags;
    });
  }
}
