import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForumI } from '../../models/forumsAndCommunity/forum';

@Injectable({ providedIn: 'root' })
export class ForumService {
  private readonly _state = new BehaviorSubject<ForumI[]>([
    // example data
    {
      id: 1, title: 'General Discussion', courseId: 1, status: 'ACTIVE',
      description: 'first forum'
    },
    {
      id: 2, title: 'Homework Help', courseId: 1, status: 'INACTIVE',
      description: 'solve your doubts here'
    }
  ]);

  readonly forums$ = this._state.asObservable();
  private get value(): ForumI[] { return this._state.value; }

  // GET all forums
  getForums(): ForumI[] {
    return this.value;
  }

  // ADD a new forum
  addForum(forum: Omit<ForumI, 'id'>): ForumI {
    const nextId = this.value.length ? Math.max(...this.value.map(f => f.id ?? 0)) + 1 : 1;
    const newForum: ForumI = { id: nextId, ...forum };
    this._state.next([...this.value, newForum]);
    return newForum;
  }
}
