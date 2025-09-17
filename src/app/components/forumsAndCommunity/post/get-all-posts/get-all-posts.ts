// get-all-posts.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PostS } from '../../../../services/post-s';
import { PostI } from '../../../../models/forumsAndCommunity/post';

@Component({
  selector: 'app-get-all-posts',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-posts.html',
  styleUrl: './get-all-posts.css'
})
export class GetAllPosts {
  posts: PostI[] = [];

  constructor(private postService: PostS) {
    this.postService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }
}
