// get-all-forums.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ForumS } from '../../../../services/forum-s';

@Component({
  selector: 'app-get-all-forums',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-forums.html',
  styleUrl: './get-all-forums.css'
})
export class GetAllForums {
  forums: ForumI[] = [];

  constructor(private forumService: ForumS) {
    this.forumService.forums$.subscribe(forums => {
      this.forums = forums;
    });
  }
}
