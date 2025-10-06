import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ModuleI } from '../../../../models/academicManagment/module';
import { LessonService } from '../../../../services/academicManagment/lesson-service';
import { ModuleService } from '../../../../services/academicManagment/module-service';

@Component({
  selector: 'app-create-lessons',standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './create-lessons.html',
  styleUrl: './create-lessons.css'
})
export class CreateLessons implements OnInit {
  form: FormGroup;
  modules: ModuleI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private moduleService: ModuleService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      moduleId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.modules = this.moduleService.getModules();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.lessonService.addLesson({
        title: value.title,
        content: value.content,
        status: value.status,
        moduleId: value.moduleId
      });
      this.router.navigate(['/lessons']);
    }
  }

  cancelar() {
    this.router.navigate(['/lessons']);
  }
}
