import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CourseService } from '../../../../services/academicManagment/course-service';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { CourseI } from '../../../../models/academicManagment/course';

@Component({
  selector: 'app-update-courses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ToastModule
  ],
  templateUrl: './update-courses.html',
  styleUrl: './update-courses.css',
  providers: [MessageService]
})
export class UpdateCourses implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  courseId: number = 0;
  teachers: TeacherI[] = [];

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private teacherService: Teacher,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      teacherId: [null, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = parseInt(id);
      this.loadCourse();
    }
  
  this.loadTeachers();
}

loadCourse(): void {
  this.loading = true;
  this.courseService.getCourseById(this.courseId).subscribe({
    next: (response: any) => {
      const course: CourseI = response.course ?? response;

      this.form.patchValue({
        title: course.title,
        description: course.description,
        startDate: new Date(course.startDate),
        endDate: new Date(course.endDate),
        teacherId: course.teacherId, // ahora funcionará
        status: course.status
      });

      this.loading = false;
    },
    error: (error) => {
      console.error('Error al cargar el curso:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cargar la información del curso'
      });
      this.loading = false;
    }
  });
}

loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = Array.isArray(response) ? response : response.teachers ?? [];
      },
      error: (error) => {
        console.error('Error cargando profesores:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los profesores'
        });
      }
    });
  }


  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.courseService.updateCourse(this.courseId, {
        title: value.title,
        description: value.description,
        startDate: value.startDate,
        endDate: value.endDate,
        teacherId: value.teacherId,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Curso actualizado correctamente'
          });
          setTimeout(() => {
            this.router.navigate(['/courses']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar el curso:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el curso'
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
    this.router.navigate(['/courses']);
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
