// get-all-modules.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ModuleS } from '../../../../services/module-s';
import { ModuleI } from '../../../../models/academicManagment/module';

@Component({
  selector: 'app-get-all-modules',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-modules.html',
  styleUrl: './get-all-modules.css'
})
export class GetAllModules {
  modules: ModuleI[] = [];

  constructor(private moduleService: ModuleS) {
    this.moduleService.modules$.subscribe(modules => {
      this.modules = modules;
    });
  }
}
