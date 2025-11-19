import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagI } from '../../../../models/forumsAndCommunity/tag';
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';

@Component({
  selector: 'app-get-all-tags',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './get-all-tags.html',
  styleUrl: './get-all-tags.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class GetAllTags implements OnInit {
  tags: TagI[] = [];
  loading: boolean = false;

  constructor(
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  /** 🔹 Carga de etiquetas desde el backend */
  loadTags(): void {
    this.loading = true;
    this.tagService.getAllTags().subscribe({
      next: (response: any) => {
        console.log('✅ Tags recibidos:', response);
        this.tags = Array.isArray(response) ? response : response.tags ?? [];
        this.tagService.updateLocalTags(this.tags);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las etiquetas',
        });
        this.loading = false;
      },
    });
  }

  /** 🔹 Eliminación de etiqueta con confirmación */
  deleteTag(tag: TagI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la etiqueta "${tag.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (tag.id) {
          this.tagService.deleteTag(tag.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Etiqueta eliminada correctamente',
              });
              this.loadTags();
            },
            error: (error) => {
              console.error('Error deleting tag:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la etiqueta',
              });
            },
          });
        }
      },
    });
  }
}
