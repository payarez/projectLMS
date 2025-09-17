// create-course-tags.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CourseTagS } from '../../../../services/course-tag-s';

@Component({
  selector: 'app-create-course-tags',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-course-tags.html',
  styleUrl: './create-course-tags.css'
})
export class CreateCourseTags {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseTagService: CourseTagS
  ) {
    this.form = this.fb.group({
      courseId: ['', Validators.required],
      tagId: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.courseTagService.addCourseTag({
        courseId: Number(value.courseId),
        tagId: Number(value.tagId),
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      });
      this.router.navigate(['/coursetags']);
    }
  }

  cancelar() {
    this.router.navigate(['/coursetags']);
  }
}
