import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './create-tags.html',
  styleUrl: './create-tags.css'
})
export class CreateTags {
  form: FormGroup;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tagService: TagService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.tagService.addTag({
        name: value.name,
        status: value.status
      });
      this.router.navigate(['/tags']);
    }
  }

  cancelar() {
    this.router.navigate(['/tags']);
  }
}

