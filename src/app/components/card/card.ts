import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe],
  template: `
    <article class="post-card">
      <div class="card-image-wrap" (click)="goToDetail()">
        <img
          [src]="'https://picsum.photos/seed/' + item().id + '/400/220'"
          [alt]="item().title"
          class="card-image"
          loading="lazy"
        />
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-id">#{{ item().id }}</span>
          <span class="card-user">Usuario {{ item().userId }}</span>
        </div>
        <h2 class="card-title" (click)="goToDetail()">{{ item().title }}</h2>
        <p class="card-body-text">{{ item().body | slice:0:80 }}...</p>
      </div>
    </article>
  `,
  styles: [`
    .post-card {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      transition: box-shadow 0.2s, transform 0.2s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .post-card:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }
    .card-image-wrap {
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 16/9;
    }
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
      display: block;
    }
    .card-image-wrap:hover .card-image { transform: scale(1.04); }
    .card-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.45rem; flex: 1; }
    .card-meta { display: flex; align-items: center; justify-content: space-between; }
    .card-id { font-size: 0.68rem; font-weight: 700; background: #f0fdf4; color: #16a34a; padding: 0.1rem 0.45rem; border-radius: 999px; border: 1px solid #bbf7d0; }
    .card-user { font-size: 0.68rem; color: #9ca3af; }
    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.4;
      cursor: pointer;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.15s;
    }
    .card-title:hover { color: #16a34a; }
    .card-body-text { font-size: 0.78rem; color: #6b7280; line-height: 1.5; }
  `]
})
export class CardComponent {
  item  = input.required<Post>();
  total = input.required<number>();
  private router = inject(Router);

  goToDetail(): void {
    this.router.navigate(['/details', this.item().id], {
      queryParams: { total: this.total() }
    });
  }
}
