// get-all-attempts.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AttemptI } from '../../../../models/academicActivities/attempt';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AttemptS } from '../../../../services/attempt-s';

@Component({
  selector: 'app-get-all-attempts',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-attempts.html',
  styleUrl: './get-all-attempts.css'
})
export class GetAllAttempts {
  attempts: AttemptI[] = [];

  constructor(private attemptService: AttemptS) {
    this.attemptService.attempts$.subscribe(attempts => {
      this.attempts = attempts;
    });
  }
}
