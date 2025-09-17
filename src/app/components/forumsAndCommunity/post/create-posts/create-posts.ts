// create-posts.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { PostS } from '../../../../services/post-s';

@Component({
  selector: 'app-create-posts',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-posts.html',
  styleUrl: './create-posts.css'
})
export class CreatePosts {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostS
  ) {
    this.form = this.fb.group({
      content: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      createdAt: [new Date().toISOString().slice(0,16), Validators.required], // datetime-local
      updatedAt: [new Date().toISOString().slice(0,16)]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.postService.addPost({
        content: value.content,
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE',
        createdAt: new Date(value.createdAt),
        updatedAt: value.updatedAt ? new Date(value.updatedAt) : new Date()
      });
      this.router.navigate(['/posts']);
    }
  }

  cancelar() {
    this.router.navigate(['/posts']);
  }
}
