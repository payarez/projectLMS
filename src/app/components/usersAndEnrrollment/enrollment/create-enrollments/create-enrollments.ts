import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


import { EnrollmentService } from '../../../../services/usersAndEnrrollment/enrrollment-service';

import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { CourseI } from '../../../../models/academicManagment/course';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';
import { CourseService } from '../../../../services/academicManagment/course-service';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-create-enrollments',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './create-enrollments.html',
  styleUrl: './create-enrollments.css'
})
export class CreateEnrollments implements OnInit {
  form: FormGroup;

  students: StudentI[] = [];
  courses: CourseI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required],
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.students = this.studentService.getStudents(); 
    // si tu servicio devuelve observable, cambia a:
    // this.studentService.students$.subscribe(data => this.students = data);
  }

  loadCourses() {
    this.courses = this.courseService.getCourses(); 
    // si tu servicio devuelve observable:
    // this.courseService.courses$.subscribe(data => this.courses = data);
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.enrollmentService.addEnrollment({
        date: value.date ?? new Date(),
        status: value.status,
        studentId: value.studentId,
        courseId: value.courseId,
      });
      this.router.navigate(['/enrollments']);
    }
  }

  cancelar() {
    this.router.navigate(['/enrollments']);
  }
}
