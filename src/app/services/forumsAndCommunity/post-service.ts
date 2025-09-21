import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostI } from '../../models/forumsAndCommunity/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly _state = new BehaviorSubject<PostI[]>([
    // example data
    { id: 1, content: 'This course is awesome!', date: new Date('2025-09-10'), forumId: 1, studentId: 1, status: 'ACTIVE' },
    { id: 2, content: 'I need help with lesson 2.', date: new Date('2025-09-12'), forumId: 1, studentId: 2, status: 'INACTIVE' }
  ]);

  readonly posts$ = this._state.asObservable();
  private get value(): PostI[] { return this._state.value; }

  // GET all posts
  getPosts(): PostI[] {
    return this.value;
  }

  // ADD a new post
  addPost(post: Omit<PostI, 'id'>): PostI {
    const nextId = this.value.length ? Math.max(...this.value.map(p => p.id ?? 0)) + 1 : 1;
    const newPost: PostI = { id: nextId, ...post };
    this._state.next([...this.value, newPost]);
    return newPost;
  }
}
