import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
