import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}
  menuItems: MenuItem[] = [
  { label: 'Personalizar', icon: 'pi pi-palette', command: () => { /* acción */ } },
  { label: 'Configuración', icon: 'pi pi-cog', command: () => { /* acción */ } },
  { label: 'Ayuda', icon: 'pi pi-question-circle', command: () => { /* acción */ } },
  { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => { /* acción */ } }
];
}
