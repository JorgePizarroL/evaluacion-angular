import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header-bar">
      <div class="header-inner">
        <a routerLink="/" class="brand-link">
          <span class="brand-title">Evaluacion</span>
        </a>
        <div class="header-right">
          <div class="meta-info">
            <span class="meta-name">Jorge Pizarro</span>
          </div>
          <a href="https://github.com/JorgePizarroL/evaluacion-angular.git"
             target="_blank" rel="noopener" class="github-btn">
            Enlace Repositorio
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header-bar {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }
    .brand-link { display: flex; align-items: baseline; gap: 0.6rem; text-decoration: none; }
    .brand-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #111827; }
    .brand-sub { font-size: 0.72rem; color: #9ca3af; }
    .header-right { display: flex; align-items: center; gap: 1.25rem; }
    .meta-info { display: flex; flex-direction: column; align-items: flex-end; }
    .meta-name { font-size: 0.82rem; font-weight: 600; color: #111827; }
    .meta-career { font-size: 0.68rem; color: #9ca3af; }
    .github-btn {
      display: flex; align-items: center; gap: 0.4rem;
      border: 1px solid #d1d5db;
      color: #374151;
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.15s, border-color 0.15s;
    }
    .github-btn:hover { background: #f9fafb; border-color: #9ca3af; }
    @media (max-width: 640px) {
      .meta-info { display: none; }
      .brand-sub { display: none; }
    }
  `]
})
export class HeaderComponent {}
