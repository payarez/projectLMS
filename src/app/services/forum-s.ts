import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ForumI } from '../models/forumsAndCommunity/forum';

@Injectable({
  providedIn: 'root'
})
export class ForumS {
  private forumsService = new BehaviorSubject<ForumI[]>([
    {
      id: 1,
      title: 'General Discussion',
      description: 'For general topics and announcements',
      createdAt: new Date(2023, 4, 15),
      updatedAt: new Date(2023, 4, 15),
      status: 'ACTIVE'
    },
    {
      id: 2,
      title: 'Support',
      description: 'Questions and technical support',
      createdAt: new Date(2022, 9, 7),
      updatedAt: new Date(2023, 2, 1),
      status: 'INACTIVE'
    }
  ]);

  forums$ = this.forumsService.asObservable();

  getForums() {
    return this.forumsService.value;
  }

  addForum(forum: ForumI) {
    const forums = this.forumsService.value;
    forum.id = forums.length ? Math.max(...forums.map(f => f.id ?? 0)) + 1 : 1;
    forum.createdAt = new Date();
    forum.updatedAt = new Date();
    this.forumsService.next([...forums, forum]);
  }
}
