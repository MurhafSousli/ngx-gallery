import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: './pages/home/home.module#HomeModule', pathMatch: 'full'},
  {path: 'getting-started', loadChildren: './pages/documentation/documentation.module#DocumentationModule'},
  {path: 'gallery', loadChildren: './pages/gallery-example/gallery-example.module#GalleryExampleModule'},
  {path: 'lightbox', loadChildren: './pages/lightbox-example/lightbox-example.module#LightboxExampleModule'},
  {path: 'gallerize', loadChildren: './pages/gallerize-example/gallerize-example.module#GallerizeExampleModule'},
  {path: 'advanced', loadChildren: './pages/advanced-example/advanced-example.module#AdvancedExampleModule'},
  {path: '**', loadChildren: './pages/not-found/not-found.module#NotFoundPageModule'}
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
