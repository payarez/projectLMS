import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CourseI } from '../../../../models/academicManagment/course';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';

@Component({
  selector: 'app-create-modules',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './create-modules.html',
  styleUrl: './create-modules.css'
})
export class CreateModules implements OnInit {
  form: FormGroup;
  courses: CourseI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moduleService: ModuleService,
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
      this.moduleService.addModule({
        title: value.title,
        description: value.description,
        courseId: value.courseId,
        status: value.status
      });
      this.router.navigate(['/modules']);
    }
  }

  cancelar() {
    this.router.navigate(['/modules']);
  }
}
