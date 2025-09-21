import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { PostService } from '../../../../services/forumsAndCommunity/post-service';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';

import { PostI } from '../../../../models/forumsAndCommunity/post';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { StudentI } from '../../../../models/usersAndEnrrollment/student';


@Component({
  selector: 'app-get-all-posts',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-posts.html',
  styleUrl: './get-all-posts.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllPosts {
  posts: PostI[] = [];
  forums: Record<number, ForumI> = {};
  students: Record<number, StudentI> = {};

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private studentService: StudentService
  ) {
    // cargar posts
    this.postService.posts$.subscribe(list => this.posts = list);

    // mapas de referencia
    this.forumService.forums$.subscribe(list => {
      this.forums = Object.fromEntries(list.map(f => [f.id!, f]));
    });
    this.studentService.students$.subscribe(list => {
      this.students = Object.fromEntries(list.map(s => [s.id!, s]));
    });
  }

  forumName(id: number): string {
    return this.forums[id]?.title ?? `Forum #${id}`;
  }

  studentName(id: number): string {
    return this.students[id]?.name ?? `Student #${id}`;
  }
}
