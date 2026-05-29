import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass],
  template: `
    <section class="hero-section">
      <div class="hero-inner">
        <h1 class="hero-title">{{ title() }}</h1>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-label">Total de registros</span>
            <span class="stat-value" [ngClass]="{'stat-error': isError()}">
              {{ isError() ? 'ERROR EN TOTAL' : total() }}
            </span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">Estado</span>
            <span class="stat-badge" [ngClass]="statusClass()">{{ statusText() }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      padding: 2rem 0 1.75rem;
    }
    .hero-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 700;
      color: #111827;
      margin: 0 0 1rem 0;
    }
    .hero-stats { display: flex; align-items: center; gap: 1.25rem; }
    .stat-item { display: flex; flex-direction: column; gap: 0.1rem; }
    .stat-label { font-size: 0.68rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
    .stat-value { font-size: 1.25rem; font-weight: 700; color: #111827; }
    .stat-error { color: #ef4444 !important; font-size: 0.85rem !important; }
    .stat-divider { width: 1px; height: 32px; background: #e5e7eb; }
    .stat-badge {
      display: inline-block;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-loading { background: #fef9c3; color: #92400e; }
    .badge-loaded  { background: #dcfce7; color: #15803d; }
    .badge-error   { background: #fee2e2; color: #b91c1c; }
  `]
})
export class HeroComponent {
  title  = input.required<string>();
  total  = input.required<number>();
  status = input<'loading' | 'loaded' | 'error'>('loaded');

  isError = computed(() => this.status() === 'error');

  statusClass = computed(() => ({
    'stat-badge': true,
    'badge-loading': this.status() === 'loading',
    'badge-loaded':  this.status() === 'loaded',
    'badge-error':   this.status() === 'error',
  }));

  statusText = computed(() => {
    switch (this.status()) {
      case 'loading': return 'Cargando...';
      case 'loaded':  return 'Cargado';
      case 'error':   return 'Error';
      default: return '';
    }
  });
}
