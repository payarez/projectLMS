import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { PostService } from '../../../../services/forumsAndCommunity/post-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TextareaModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './create-posts.html',
  styleUrl: './create-posts.css',
  providers: [MessageService]
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
    private studentService: Student,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      forumId: [null, Validators.required],
      studentId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadForums();
    this.loadStudents();
  }

  /** 🔹 Cargar foros desde el servicio */
  /** 🔹 Cargar foros desde el backend */
loadForums(): void {
  this.forumService.getAllForums().subscribe({
    next: (response: any) => {
      const list = Array.isArray(response) ? response : response.forums ?? [];
      this.forums = list;
      // si tu servicio tiene updateLocalForums, úsalo para mantener el BehaviorSubject actualizado
      this.forumService.updateLocalForums(list);
    },
    error: (err) => {
      console.error('Error cargando foros:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los foros'
      });
    }
  });
}


  /** 🔹 Cargar estudiantes desde el servicio */
  loadStudents(): void {
  this.studentService.getAllStudents().subscribe({
    next: (response: any) => {
      const list = Array.isArray(response) ? response : response.students ?? [];
      this.students = list;
      // si tu servicio tiene updateLocalStudents, úsalo para mantener el BehaviorSubject actualizado
      this.studentService.updateLocalStudents(list);
    },
    error: (err) => {
      console.error('Error cargando estudiantes:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los estudiantes'
      });
    }
  });
}


  /** 🔹 Crear un nuevo post */
  submit(): void {
  if (this.form.valid) {
    const value = this.form.value;

    this.postService.createPost({
      content: value.content,
      date: new Date(),
      forumId: value.forumId,
      studentId: value.studentId,
      status: value.status
    }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Post creado correctamente'
        });
        setTimeout(() => this.router.navigate(['/posts']), 800);
      },
      error: (err) => {
        console.error('Error creando post:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el post'
        });
      }
    });

  } else {
    this.markFormGroupTouched();
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Por favor complete todos los campos requeridos'
    });
  }
}


  /** 🔹 Cancelar y volver a la lista de posts */
  cancelar(): void {
    this.router.navigate(['/posts']);
  }

  /** 🔹 Marcar todos los campos como tocados */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
