import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { ItemCacheService } from '../../services/item-cache.service';
import { Post } from '../../interfaces/post.interface';
import { HeroComponent } from '../../components/hero/hero';
import { CardComponent } from '../../components/card/card';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, HeroComponent, CardComponent],
  template: `
    <app-hero
      title="Detalle del registro"
      [total]="total()"
      [status]="loadStatus()"
    />

    <main class="detail-content">
      <!-- Loading -->
      <div *ngIf="isLoading()" class="loading-wrap">
        <span class="loading-spinner"></span>
        <p class="loading-text">Cargando detalle...</p>
      </div>

      <!-- Error -->
      <div *ngIf="hasError()" class="error-wrap">
        <span class="error-icon">⚠</span>
        <p>Error al cargar el registro.</p>
      </div>

      <!-- Contenido -->
      <div *ngIf="!isLoading() && !hasError() && post()" class="detail-layout">
        <!-- Card reutilizada -->
        <div class="card-col">
          <p class="section-label">Vista previa</p>
          <app-card [item]="post()!" [total]="total()" />
        </div>

        <!-- Info ampliada -->
        <div class="info-col">
          <p class="section-label">Información ampliada</p>
          <div class="info-box">
            <div class="info-row"><span class="info-key">ID</span><span class="info-val">{{ post()!.id }}</span></div>
            <div class="info-row"><span class="info-key">Atributo 1 (userId)</span><span class="info-val">{{ post()!.userId }}</span></div>
            <div class="info-row"><span class="info-key">Atributo 2 (title)</span><span class="info-val">{{ post()!.title }}</span></div>
            <div class="info-row"><span class="info-key">Atributo 3 (body)</span><span class="info-val body-text">{{ post()!.body }}</span></div>
            <div class="info-row">
              <span class="info-key">Atributo 4 (cache)</span>
              <span class="info-val cache-badge">Guardado en localStorage</span>
            </div>
          </div>

          <div class="cache-info">
            <span class="cache-icon">🗄</span>
            <span>Clave: <code>item-cache-{{ post()!.id }}</code></span>
          </div>
        </div>
      </div>

      <!-- Botón regresar -->
      <div class="back-wrap">
        <button (click)="goBack()" class="back-btn">
          Home
        </button>
      </div>
    </main>
  `,
  styles: [`
    .detail-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 4rem;
    }
    .loading-wrap, .error-wrap {
      display: flex; flex-direction: column; align-items: center;
      gap: 1rem; padding: 4rem 0;
    }
    .loading-spinner {
      display: block; width: 48px; height: 48px;
      border: 4px solid #dcfce7; border-top-color: #4ade80;
      border-radius: 50%; animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: #6b7280; font-size: 0.9rem; }
    .error-icon { font-size: 2rem; color: #f87171; }
    .detail-layout {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 2rem;
      align-items: start;
    }
    .section-label {
      font-size: 0.7rem; color: #6b7280;
      text-transform: uppercase; letter-spacing: 0.1em;
      margin-bottom: 0.75rem;
    }
    .info-box {
      background: #fff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    }
    .info-row {
      display: flex; padding: 0.85rem 1.25rem;
      border-bottom: 1px solid #f3f4f6;
      gap: 1rem; align-items: flex-start;
    }
    .info-row:last-child { border-bottom: none; }
    .info-key { font-size: 0.78rem; color: #9ca3af; font-weight: 500; min-width: 160px; flex-shrink: 0; }
    .info-val { font-size: 0.85rem; color: #1a3a2a; font-weight: 500; }
    .body-text { line-height: 1.6; }
    .cache-badge {
      display: inline-flex; align-items: center;
      background: #dcfce7; color: #15803d;
      padding: 0.2rem 0.6rem; border-radius: 999px;
      font-size: 0.75rem;
    }
    .cache-info {
      margin-top: 0.75rem;
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.78rem; color: #6b7280;
    }
    .cache-info code {
      background: #f3f4f6; padding: 0.1rem 0.4rem;
      border-radius: 4px; font-size: 0.75rem; color: #1a3a2a;
    }
    .back-wrap { margin-top: 2.5rem; }
    .back-btn {
      background: #1a3a2a; color: #4ade80;
      border: 1px solid #2d5a3f;
      padding: 0.65rem 1.5rem;
      border-radius: 8px; font-size: 0.9rem; font-weight: 500;
      cursor: pointer; transition: background 0.2s, transform 0.15s;
    }
    .back-btn:hover { background: #0f2318; transform: translateX(-2px); }
    @media (max-width: 768px) {
      .detail-layout { grid-template-columns: 1fr; }
    }
  `]
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostService);
  private cacheService = inject(ItemCacheService);

  post = signal<Post | null>(null);
  isLoading = signal(true);
  hasError = signal(false);
  total = signal<number>(0);

  loadStatus = (): 'loading' | 'loaded' | 'error' => {
    if (this.isLoading()) return 'loading';
    if (this.hasError()) return 'error';
    return 'loaded';
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const totalParam = this.route.snapshot.queryParamMap.get('total');
    this.total.set(totalParam ? +totalParam : 0);

    if (!id) {
      this.hasError.set(true);
      this.isLoading.set(false);
      return;
    }

    // Intentar desde caché primero
    const cached = this.cacheService.getById(id);
    if (cached) {
      this.post.set(cached);
      this.isLoading.set(false);
      return;
    }

    // Retardo simulado + llamada a API
    setTimeout(() => {
      this.postService.getItemById(id).subscribe({
        next: (data) => {
          this.post.set(data);
          this.cacheService.save(data); // Guardar en localStorage
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
    }, 1500);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
