// get-all-tags.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagS } from '../../../../services/tag-s';
import { TagI } from '../../../../models/forumsAndCommunity/tag';

@Component({
  selector: 'app-get-all-tags',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-tags.html',
  styleUrl: './get-all-tags.css'
})
export class GetAllTags {
  tags: TagI[] = [];

  constructor(private tagService: TagS) {
    this.tagService.tags$.subscribe(tags => {
      this.tags = tags;
    });
  }
}
