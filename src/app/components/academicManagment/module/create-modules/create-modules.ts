// create-modules.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ModuleS } from '../../../../services/module-s';

@Component({
  selector: 'app-create-modules',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-modules.html',
  styleUrl: './create-modules.css'
})
export class CreateModules {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moduleService: ModuleS
  ) {
    this.form = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      order: ['', [Validators.required, Validators.min(1)]],
      status: ['ACTIVE', Validators.required],
      lessonIds: [''] // IDs separados por coma, opcional
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      const lessonIds = value.lessonIds
        ? value.lessonIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      this.moduleService.addModule({
        courseId: Number(value.courseId),
        title: value.title,
        order: Number(value.order),
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        lessonIds
      });

      this.router.navigate(['/modules']);
    }
  }

  cancelar() {
    this.router.navigate(['/modules']);
  }
}
