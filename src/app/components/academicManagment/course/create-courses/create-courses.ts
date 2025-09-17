// create-courses.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CourseS } from '../../../../services/course-s';

@Component({
  selector: 'app-create-courses',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-courses.html',
  styleUrl: './create-courses.css'
})
export class CreateCourses {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseS
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['ACTIVE', Validators.required],
      moduleIds: [''],       // IDs separados por coma, opcional
      enrollmentIds: [''],   // IDs separados por coma, opcional
      courseTagIds: ['']     // IDs separados por coma, opcional
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;

      const moduleIds = value.moduleIds
        ? value.moduleIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      const enrollmentIds = value.enrollmentIds
        ? value.enrollmentIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      const courseTagIds = value.courseTagIds
        ? value.courseTagIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      this.courseService.addCourse({
        title: value.title,
        description: value.description,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        moduleIds,
        enrollmentIds,
        courseTagIds
      });

      this.router.navigate(['/courses']);
    }
  }

  cancelar() {
    this.router.navigate(['/courses']);
  }
}
