import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'lightbox',
    loadComponent: () => import('./pages/lightbox-example/lightbox-example.component').then(m => m.LightboxExampleComponent)
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/lab/lab.component').then(m => m.LabComponent)
  }
];
