import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery-example/gallery-example.module').then(m => m.GalleryExampleModule)
  },
  {
    path: 'lightbox',
    loadChildren: () => import('./pages/lightbox-example/lightbox-example.module').then(m => m.LightboxExampleModule)
  },
  {
    path: 'gallerize',
    loadChildren: () => import('./pages/gallerize-example/gallerize-example.module').then(m => m.GallerizeExampleModule)
  },
  {
    path: 'advanced',
    loadChildren: () => import('./pages/advanced-example/advanced-example.module').then(m => m.AdvancedExampleModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./pages/lab/lab.module').then(m => m.LabModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
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
