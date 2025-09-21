import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ForumI } from '../../../../models/forumsAndCommunity/forum';
import { ForumService } from '../../../../services/forumsAndCommunity/forum-service';

@Component({
  selector: 'app-get-all-forums',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-forums.html',
  styleUrl: './get-all-forums.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllForums {
  forums: ForumI[] = [];

  constructor(private forumService: ForumService) {
    this.forumService.forums$.subscribe(list => this.forums = list);
  }
}
