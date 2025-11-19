import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayBadge } from 'primeng/overlaybadge';
import { TieredMenu } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, OverlayBadge, TieredMenu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inicializa el menú según el estado actual
    this.updateMenuItems();

    // Escucha cambios en el estado de autenticación
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateMenuItems();
    });
  }

  ngOnDestroy(): void {
    // Limpia la suscripción al destruir el componente
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Actualiza dinámicamente el menú según si el usuario está logueado o no.
   */
  private updateMenuItems(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.items = [
        {
          label: 'Configuración',
          icon: 'pi pi-cog',
          command: () => {
            console.log('Configuración clicked');
          }
        },
        {
          label: 'Información',
          icon: 'pi pi-info-circle',
          command: () => {
            console.log('Información clicked');
          }
        },
        { separator: true },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout();
          }
        }
      ];
    } else {
      this.items = [
        {
          label: 'Iniciar sesión',
          icon: 'pi pi-sign-in',
          command: () => {
            this.goToLogin();
          }
        },
        {
          label: 'Registrarse',
          icon: 'pi pi-user-plus',
          command: () => {
            this.goToRegister();
          }
        }
      ];
    }
  }

  /**
   * Cierra sesión y redirige al login
   */
  private logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Redirige al login
   */
  private goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Redirige al registro
   */
  private goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
