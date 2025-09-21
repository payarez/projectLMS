import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { TagI } from '../../../../models/forumsAndCommunity/tag';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

@Component({
  selector: 'app-get-all-tags',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './get-all-tags.html',
  styleUrl: './get-all-tags.css'
})
export class GetAllTags {
  tags: TagI[] = [];

  constructor(private tagService: TagService) {
    // Cargar tags
    this.tagService.tags$.subscribe(list => this.tags = list);
  }
}
