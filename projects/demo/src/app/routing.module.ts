import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: './pages/home/home.module#HomeModule', pathMatch: 'full'},
  {path: 'getting-started', loadChildren: './pages/documentation/documentation.module#DocumentationModule'},
  {path: 'gallery-example', loadChildren: './pages/gallery-example/gallery-example.module#GalleryExampleModule'},
  {path: 'mixed', loadChildren: './pages/mixed-example/mixed-example.module#MixedExampleModule'},
  {path: 'lightbox', loadChildren: './pages/lightbox-example/lightbox-example.module#LightboxExampleModule'},
  {path: 'advanced', loadChildren: './pages/advanced-example/advanced-example.module#AdvancedExampleModule'},
  {path: 'auto-detect', loadChildren: './pages/auto-detect-example/auto-detect-example.module#AutoDetectExampleModule'},
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
