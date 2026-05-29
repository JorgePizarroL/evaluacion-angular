import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';
import { HeroComponent } from '../../components/hero/hero';
import { CardComponent } from '../../components/card/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, HeroComponent, CardComponent],
  template: `
    <app-hero
      title="Listado de Posts"
      [total]="totalItems()"
      [status]="loadStatus()"
    />

    <main class="main-content">
      <!-- Loading spinner -->
      <div *ngIf="isLoading()" class="loading-wrap">
        <span class="loading-spinner"></span>
        <p class="loading-text">Cargando registros...</p>
      </div>

      <!-- Error state -->
      <div *ngIf="hasError()" class="error-wrap">
        <span class="error-icon">⚠</span>
        <p class="error-text">Error al cargar los datos. Intenta de nuevo.</p>
      </div>

      <!-- Grid de cards -->
      <div *ngIf="!isLoading() && !hasError()" class="cards-grid">
        <app-card
          *ngFor="let post of posts()"
          [item]="post"
          [total]="totalItems()"
        />
      </div>
    </main>
  `,
  styles: [`
    .main-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 4rem;
    }
    .loading-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 4rem 0;
    }
    .loading-spinner {
      display: block;
      width: 48px;
      height: 48px;
      border: 4px solid #dcfce7;
      border-top-color: #4ade80;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: #6b7280; font-size: 0.9rem; }
    .error-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 4rem 0;
    }
    .error-icon { font-size: 2.5rem; color: #f87171; }
    .error-text { color: #6b7280; }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 640px) {
      .cards-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService);

  posts = signal<Post[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  totalItems = computed(() => this.posts().length);
  loadStatus = computed<'loading' | 'loaded' | 'error'>(() => {
    if (this.isLoading()) return 'loading';
    if (this.hasError()) return 'error';
    return 'loaded';
  });

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    // 2 segundos
    setTimeout(() => {
      this.postService.getItems().subscribe({
        next: (data) => {
          this.posts.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
    }, 2000);
  }
}
