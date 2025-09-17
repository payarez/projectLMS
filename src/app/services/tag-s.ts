import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TagI } from '../models/forumsAndCommunity/tag'; 

@Injectable({
  providedIn: 'root'
})
export class TagS {
  private tagsService = new BehaviorSubject<TagI[]>([
    {
      id: 1,
      name: 'Angular',
      status: 'ACTIVE',
      courseTagIds: [101, 102]
    },
    {
      id: 2,
      name: 'TypeScript',
      status: 'INACTIVE',
      courseTagIds: [101]
    }
  ]);

  tags$ = this.tagsService.asObservable();

  getTags() {
    return this.tagsService.value;
  }

  addTag(tag: TagI) {
    const tags = this.tagsService.value;
    tag.id = tags.length ? Math.max(...tags.map(t => t.id ?? 0)) + 1 : 1;
    this.tagsService.next([...tags, tag]);
  }
}
