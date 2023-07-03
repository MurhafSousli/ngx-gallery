import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./pages/documentation/routes').then(m => m.DOCUMENTATION_ROUTES)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery-example/gallery-example.component').then(m => m.GalleryExampleComponent)
  },
  {
    path: 'lightbox',
    loadComponent: () => import('./pages/lightbox-example/lightbox-example.component').then(m => m.LightboxExampleComponent)
  },
  {
    path: 'gallerize',
    loadComponent: () => import('./pages/gallerize-example/gallerize-example.component').then(m => m.GallerizeExampleComponent)
  },
  {
    path: 'advanced',
    loadComponent: () => import('./pages/advanced-example/advanced-example.component').then(m => m.AdvancedExampleComponent)
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/lab/lab.component').then(m => m.LabComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
