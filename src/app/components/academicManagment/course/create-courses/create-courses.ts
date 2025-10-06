import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';

@Component({
  selector: 'app-create-courses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './create-courses.html',
  styleUrl: './create-courses.css'
})
export class CreateCourses implements OnInit {
  form: FormGroup;
  teachers: TeacherI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private teacherService: Teacher
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      teacherId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.teachers = this.teacherService.getTeachers();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.courseService.addCourse({
        title: value.title,
        description: value.description,
        startDate: value.startDate,
        endDate: value.endDate,
        teacherId: value.teacherId,
        status: value.status
      });
      this.router.navigate(['/courses']);
    }
  }

  cancelar() {
    this.router.navigate(['/courses']);
  }
}
