import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagI } from '../../models/forumsAndCommunity/tag';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly _state = new BehaviorSubject<TagI[]>([
    // example data
    { id: 1, name: 'Angular', status: 'ACTIVE' },
    { id: 2, name: 'Database', status: 'INACTIVE' }
  ]);

  readonly tags$ = this._state.asObservable();
  private get value(): TagI[] { return this._state.value; }

  // GET all tags
  getTags(): TagI[] {
    return this.value;
  }

  // ADD a new tag
  addTag(tag: Omit<TagI, 'id'>): TagI {
    const nextId = this.value.length ? Math.max(...this.value.map(t => t.id ?? 0)) + 1 : 1;
    const newTag: TagI = { id: nextId, ...tag };
    this._state.next([...this.value, newTag]);
    return newTag;
  }
}
