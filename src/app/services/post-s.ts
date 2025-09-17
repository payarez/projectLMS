import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostI } from '../models/forumsAndCommunity/post';

@Injectable({
  providedIn: 'root'
})
export class PostS {
  private postsService = new BehaviorSubject<PostI[]>([
    {
      id: 1,
      content: 'Bienvenidos al foro!',
      createdAt: new Date(2023, 4, 15),
      updatedAt: new Date(2023, 4, 15),
      status: 'ACTIVE'
    },
    {
      id: 2,
      content: 'Recuerden revisar las reglas del foro.',
      createdAt: new Date(2022, 9, 7),
      updatedAt: new Date(2023, 2, 1),
      status: 'INACTIVE'
    }
  ]);

  posts$ = this.postsService.asObservable();

  getPosts() {
    return this.postsService.value;
  }

  addPost(post: PostI) {
    const posts = this.postsService.value;
    post.id = posts.length ? Math.max(...posts.map(p => p.id ?? 0)) + 1 : 1;
    post.createdAt = new Date();
    post.updatedAt = new Date();
    this.postsService.next([...posts, post]);
  }
}
