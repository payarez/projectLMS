import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';

@Component({
  selector: 'app-create-forums',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './create-forums.html',
  styleUrl: './create-forums.css'
})
export class CreateForums implements OnInit {
  form: FormGroup;
  courses: any[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forumService: ForumService,
    private courseService: CourseService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.forumService.addForum({
        title: value.title,
        description: value.description,
        courseId: value.courseId,
        status: value.status
      });
      this.router.navigate(['/forums']);
    }
  }

  cancelar() {
    this.router.navigate(['/forums']);
  }
}