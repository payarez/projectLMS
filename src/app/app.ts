import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Aside } from './components/layout/aside/aside';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Aside, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projectLMS');
  
  // ✅ Computed signal para detectar si hay sesión activa
  // isLoggedIn = computed(() => this.authService.isLoggedIn());

  isLoggedIn = false;

  constructor(public authService: AuthService) {
    this.authService.authState$.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
  }
}
