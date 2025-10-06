import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { PostService } from '../../../../services/forumsAndCommunity/post-service';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './create-posts.html',
  styleUrl: './create-posts.css'
})
export class CreatePosts implements OnInit {
  form: FormGroup;

  forums: any[] = [];
  students: any[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private forumService: ForumService,
    private studentService: StudentService
  ) {
    this.form = this.fb.group({
      content: ['', Validators.required],
      forumId: [null, Validators.required],
      studentId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.forums = this.forumService.getForums();   // necesitas ForumService implementado
    this.students = this.studentService.getStudents();
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.postService.addPost({
        content: value.content,
        date: new Date(),
        forumId: value.forumId,
        studentId: value.studentId,
        status: value.status
      });
      this.router.navigate(['/posts']);
    }
  }

  cancelar() {
    this.router.navigate(['/posts']);
  }
}