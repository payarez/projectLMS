import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Gestión Académica',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Cursos',
            icon: 'pi pi-book',
            items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/courses' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/courses/new' },
              { label: 'Editar Curso', icon: 'pi pi-pencil', routerLink: '/courses/edit/1' },
            ],
          },
          {
            label: 'Módulos',
            icon: 'pi pi-clone',
            items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/modules' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/modules/new' },
              { label: 'Editar Módulo', icon: 'pi pi-pencil', routerLink: '/modules/edit/1' },
            ],
          },
          {
            label: 'Lecciones',
            icon: 'pi pi-file',
            items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/lessons' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/lessons/new' },
              { label: 'Editar Lección', icon: 'pi pi-pencil', routerLink: '/lessons/edit/1' },
            ],
          },
        ],
      },
      {
        label: 'Usuarios y Matrículas',
        icon: 'pi pi-id-card',
        items: [
          { label: 'Docentes', icon: 'pi pi-user-plus', items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/teachers' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/teachers/new' },
              { label: 'Editar Docente', icon: 'pi pi-pencil', routerLink: '/teachers/edit/1' },
            ] 
          },
          { label: 'Estudiantes', icon: 'pi pi-users', items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/students' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/students/new' },
              { label: 'Editar Estudiante', icon: 'pi pi-pencil', routerLink: '/students/edit/1' },
            ]
          },
          { label: 'Matrículas', icon: 'pi pi-pencil', items: [
              { label: 'Ver Todas', icon: 'pi pi-eye', routerLink: '/enrollments' },
              { label: 'Crear Nueva', icon: 'pi pi-plus', routerLink: '/enrollments/new' },
              { label: 'Editar Matrícula', icon: 'pi pi-pencil', routerLink: '/enrollments/edit/1' },
            ]
          },
        ],
      },

      {
        label: 'Actividades Académicas',
        icon: 'pi pi-folder-open',
        items: [
          { label: 'Entregas', icon: 'pi pi-upload', items: [
              { label: 'Ver Todas', icon: 'pi pi-eye', routerLink: '/submissions' },
              { label: 'Crear Nueva', icon: 'pi pi-plus', routerLink: '/submissions/new' },
              { label: 'Editar Entrega', icon: 'pi pi-pencil', routerLink: '/submissions/edit/1' },
            ]
          },
          { label: 'Intentos', icon: 'pi pi-refresh',items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/attempts' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/attempts/new' },
              { label: 'Editar Intento', icon: 'pi pi-pencil', routerLink: '/attempts/edit/1' },
            ]
          },
          { label: 'Evaluaciones', icon: 'pi pi-check-circle', items: [
              { label: 'Ver Todas', icon: 'pi pi-eye', routerLink: '/assessments' },
              { label: 'Crear Nueva', icon: 'pi pi-plus', routerLink: '/assessments/new' },
              { label: 'Editar Evaluación', icon: 'pi pi-pencil', routerLink: '/assessments/edit/1' },
            ]
          },
        ],
      },
      
      {
        label: 'Foros y Comunidad',
        icon: 'pi pi-comments',
        items: [
          { label: 'Foros', icon: 'pi pi-comment', items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/forums' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/forums/new' },
              { label: 'Editar Foro', icon: 'pi pi-pencil', routerLink: '/forums/edit/1' },
            ]
          },
          { label: 'Posts', icon: 'pi pi-pencil', items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/posts' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/posts/new' },
              { label: 'Editar Post', icon: 'pi pi-pencil', routerLink: '/posts/edit/1' },
            ]
          },
          { label: 'Tags', icon: 'pi pi-tag',items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/tags' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/tags/new' },
              { label: 'Editar Tag', icon: 'pi pi-pencil', routerLink: '/tags/edit/1' },
            ]
          },
          { label: 'CursoTag', icon: 'pi pi-tags', items: [
              { label: 'Ver Todos', icon: 'pi pi-eye', routerLink: '/coursetags' },
              { label: 'Crear Nuevo', icon: 'pi pi-plus', routerLink: '/coursetags/new' },
              { label: 'Editar CursoTag', icon: 'pi pi-pencil', routerLink: '/coursetags/edit/1' },
            ]
          },
        ],
      },
      
      {
        label: 'Reportes y Tablero',
        icon: 'pi pi-chart-line',
        items: [
          { label: 'Progreso', icon: 'pi pi-chart-bar', routerLink: '/progress' },
          { label: 'Resumen de Calificaciones', icon: 'pi pi-star', routerLink: '/grade-summary' },
        ],
      },
    ];
  }
}
