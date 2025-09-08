import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Teacher } from '../../../../services/teacher';

@Component({
  selector: 'app-create-teachers',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-teachers.html',
  styleUrl: './create-teachers.css'
})
export class CreateTeachers {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teacherService: Teacher
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      registrationDate: [new Date(), Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.teacherService.addTeachers({
        name: value.name ?? '',
        subject: value.subject ?? '',
        email: value.email ?? '',
        phone: value.phone ?? '',
        registration_date: value.registrationDate ?? new Date(),
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      });
      this.router.navigate(['/teachers']);
    }
  }

  cancelar() {
    this.router.navigate(['/teachers']);
  }
}
