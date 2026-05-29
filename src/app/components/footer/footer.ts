import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-bar">
      <div class="footer-inner">
        <span class="footer-tech">Angular TailwindCSS DaisyUI</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer-bar { background: #fff; border-top: 1px solid #e5e7eb; }
    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .footer-copy { font-size: 0.75rem; color: #6b7280; }
    .footer-tech { font-size: 0.7rem; color: #9ca3af; }
  `]
})
export class FooterComponent {}
