// create-tags.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { TagS } from '../../../../services/tag-s';

@Component({
  selector: 'app-create-tags',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-tags.html',
  styleUrl: './create-tags.css'
})
export class CreateTags {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tagService: TagS
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      courseTagIds: [''] // IDs separados por coma, opcional
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      const courseTagIds = value.courseTagIds
        ? value.courseTagIds.split(',').map((id: string) => Number(id.trim()))
        : [];

      this.tagService.addTag({
        name: value.name,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        courseTagIds
      });
      this.router.navigate(['/tags']);
    }
  }

  cancelar() {
    this.router.navigate(['/tags']);
  }
}
