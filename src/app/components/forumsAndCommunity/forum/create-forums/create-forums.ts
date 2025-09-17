// create-forums.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ForumS } from '../../../../services/forum-s';

@Component({
  selector: 'app-create-forums',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-forums.html',
  styleUrl: './create-forums.css'
})
export class CreateForums {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forumService: ForumS
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['ACTIVE', Validators.required],
      createdAt: [new Date().toISOString().slice(0,16), Validators.required], // datetime-local
      updatedAt: [new Date().toISOString().slice(0,16)]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.forumService.addForum({
        title: value.title,
        description: value.description,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        createdAt: new Date(value.createdAt),
        updatedAt: value.updatedAt ? new Date(value.updatedAt) : new Date()
      });
      this.router.navigate(['/forums']);
    }
  }

  cancelar() {
    this.router.navigate(['/forums']);
  }
}
