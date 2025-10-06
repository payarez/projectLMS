import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { CourseTagService } from '../../../../services/forumsAndCommunity/course-tag-service';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

@Component({
  selector: 'app-create-course-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './create-course-tags.html',
  styleUrl: './create-course-tags.css'
})
export class CreateCourseTags implements OnInit {
  form: FormGroup;
  courses: any[] = [];
  tags: any[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseTagService: CourseTagService,
    private courseService: CourseService,
    private tagService: TagService
  ) {
    this.form = this.fb.group({
      courseId: [null, Validators.required],
      tagId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.tags = this.tagService.getTags();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.courseTagService.addCourseTag({
        courseId: value.courseId,
        tagId: value.tagId,
        status: value.status
      });
      this.router.navigate(['/coursetags']);
    }
  }

  cancelar() {
    this.router.navigate(['/coursetags']);
  }
}