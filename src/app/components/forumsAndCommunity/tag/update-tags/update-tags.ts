import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';

// Servicio del Tag
import { TagService } from '../../../../services/forumsAndCommunity/tag-service';
import { TagI } from '../../../../models/forumsAndCommunity/tag';

@Component({
  selector: 'app-update-tags',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './update-tags.html',
  styleUrl: './update-tags.css',
  providers: [MessageService]
})
export class UpdateTags implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  tagId: number = 0;

  statusOptions = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tagService: TagService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tagId = parseInt(id);
      this.loadTag();
    }
  }

  loadTag(): void {
    this.loading = true;
    this.tagService.getTagById(this.tagId).subscribe({
      next: (response: any) => {
        const tag: TagI = response.tag ? response.tag : response;

        // Llenar el formulario con los datos del tag
        this.form.patchValue({
          name: tag.name,
          status: tag.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el tag:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del Tag'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const tagData = this.form.value;

      this.tagService.updateTag(this.tagId, tagData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tag actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/tags']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar el tag:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el Tag'
          });
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/tags']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
