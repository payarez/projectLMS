import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PostService } from '../../../../services/forumsAndCommunity/post-service';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';
import { PostI } from '../../../../models/forumsAndCommunity/post';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';

@Component({
  selector: 'app-update-posts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TextareaModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update-posts.html',
  styleUrl: './update-posts.css',
  providers: [MessageService]
})
export class UpdatePosts implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  postId: number = 0;

  forums: ForumI[] = [];
  students: StudentI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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

  async ngOnInit(): Promise<void> {
    // Obtener ID del post
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.postId = parseInt(id);

    // Cargar foros y estudiantes antes de cargar el post
    await Promise.all([this.loadForums(), this.loadStudents()]);

    if (this.postId) this.loadPost();
  }

  /** 🔹 Cargar foros */
  private loadForums(): Promise<void> {
    return new Promise((resolve) => {
      this.forumService.forums$.subscribe(list => {
        this.forums = list;
        resolve();
      });
    });
  }

  /** 🔹 Cargar estudiantes */
  private loadStudents(): Promise<void> {
  return new Promise((resolve) => {
    this.studentService.getAllStudents().subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : res.students ?? [];
        this.students = list;
        resolve();
      },
      error: () => resolve()
    });
  });
}


  /** 🔹 Cargar post por ID y asignar al formulario */
  private loadPost(): void {
    this.loading = true;
    this.postService.getPostById(this.postId).subscribe({
      next: (response: any) => {
        const postData: PostI = response.post ?? response;
        this.form.patchValue({
          content: postData.content,
          forumId: postData.forumId,
          studentId: postData.studentId,
          status: postData.status
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando post:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el post'
        });
        this.loading = false;
      }
    });
  }

  /** 🔹 Actualizar post */
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.postService.updatePost(this.postId, {
        content: value.content,
        forumId: value.forumId,
        studentId: value.studentId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Post actualizado correctamente'
          });
          setTimeout(() => this.router.navigate(['/posts']), 800);
        },
        error: (error) => {
          console.error('Error actualizando post:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el post'
          });
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos correctamente'
      });
    }
  }

  /** 🔹 Cancelar */
  cancelar(): void {
    this.router.navigate(['/posts']);
  }

  /** 🔹 Marcar campos como tocados */
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  /** 🔹 Mensajes de error de validación */
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
