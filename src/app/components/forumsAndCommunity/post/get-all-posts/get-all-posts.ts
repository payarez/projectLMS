import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PostService } from '../../../../services/forumsAndCommunity/post-service';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { Student } from '../../../../services/usersAndEnrrollment/student-service';

import { PostI } from '../../../../models/forumsAndCommunity/post';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';

@Component({
  selector: 'app-get-all-posts',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule, ToastModule, ConfirmDialogModule],
  templateUrl: './get-all-posts.html',
  styleUrls: ['./get-all-posts.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class GetAllPosts implements OnInit {
  posts: PostI[] = [];
  forums: Record<number, ForumI> = {};
  students: Record<number, StudentI> = {};
  loading: boolean = false;

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private studentService: Student,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadForumsAndStudents();
    this.loadPosts();
  }

  /** 🔹 Cargar foros y estudiantes para mapear por ID */
  private async loadForumsAndStudents(): Promise<void> {
    await this.loadForums();
    await this.loadStudents();
  }

  /** 🔹 Cargar posts y asignar referencias */
  private loadPosts(): void {
  this.loading = true;
  this.postService.getAllPosts().subscribe({
    next: (response: any) => {
      // 🔹 Asegurarte de que sea un array
      const list: PostI[] = Array.isArray(response) ? response : response.posts ?? [];
      
      this.posts = list.map(p => ({
        ...p,
        forum: this.forums[p.forumId],
        student: this.students[p.studentId]
      }));
      this.loading = false;
      console.log('Posts cargados:', this.posts);
    },
    error: (err) => {
      console.error('Error cargando posts:', err);
      this.loading = false;
    }
  });
}




  /** 🔹 Cargar foros y mapear por ID */
  private async loadForums(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.forumService.getAllForums());
      const list: ForumI[] = Array.isArray(res) ? res : res.forums ?? [];
      this.forums = Object.fromEntries(list.map(f => [f.id!, f]));
      this.forumService.updateLocalForums(list);
    } catch (err) {
      console.error('Error cargando foros:', err);
    }
  }

  /** 🔹 Cargar estudiantes y mapear por ID */
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        const list: StudentI[] = Array.isArray(response) ? response : response.students ?? [];
        this.students = Object.fromEntries(list.map(s => [s.id!, s]));
      },
      error: (err) => {
        console.error('Error cargando estudiantes:', err);
      }
    });
  }

  /** 🔹 Obtener nombre de foro por ID */
  forumName(id: number): string {
    return this.forums[id]?.title ?? `Forum #${id}`;
  }

  /** 🔹 Obtener nombre de estudiante por ID */
  studentName(id: number): string {
    return this.students[id]?.name ?? `Student #${id}`;
  }

  /** 🔹 Eliminar post con confirmación */
  deletePost(post: PostI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el post de "${this.studentName(post.studentId)}" en "${this.forumName(post.forumId)}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (post.id) {
          this.postService.deletePost(post.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Post eliminado correctamente'
              });
              this.loadPosts();
            },
            error: (err) => {
              console.error('Error eliminando post:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el post'
              });
            }
          });
        }
      }
    });
  }
}
