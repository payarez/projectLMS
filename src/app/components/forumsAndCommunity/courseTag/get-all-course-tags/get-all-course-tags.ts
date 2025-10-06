import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { CourseTagService } from '../../../../services/forumsAndCommunity/course-tag-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

import { CourseTagI } from '../../../../models/forumsAndCommunity/courseTag';
import { CourseI } from '../../../../models/academicManagment/course';
import { TagI } from '../../../../models/forumsAndCommunity/tag';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-get-all-course-tags',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule],
  templateUrl: './get-all-course-tags.html',
  styleUrl: './get-all-course-tags.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllCourseTags { 
  courseTags: CourseTagI[] = [];
  courses: Record<number, CourseI> = {};
  tags: Record<number, TagI> = {};

  constructor(
    private courseTagService: CourseTagService,
    private courseService: CourseService,
    private tagService: TagService
  ) {
    // cargar courseTags
    this.courseTagService.courseTags$.subscribe(list => this.courseTags = list);

    // mapas de referencia
    this.courseService.courses$.subscribe(list => {
      this.courses = Object.fromEntries(list.map(c => [c.id!, c]));
    });
    this.tagService.tags$.subscribe(list => {
      this.tags = Object.fromEntries(list.map(t => [t.id!, t]));
    });
  }

  courseName(id: number): string {
    return this.courses[id]?.title ?? `Course #${id}`;
  }

  tagName(id: number): string {
    return this.tags[id]?.name ?? `Tag #${id}`;
  }
}
