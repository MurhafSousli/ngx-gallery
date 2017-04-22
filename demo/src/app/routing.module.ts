import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from './pages/pages.module';

/** COMPONENTS */
import {BasicExampleComponent} from './pages/basic-example/basic-example.component';
import {ModalExampleComponent} from './pages/modal-example/modal-example.component';
import {AutoDetectExampleComponent} from './pages/auto-detect-example/auto-detect-example.component';
import {DocumentationComponent} from './pages/documentation/documentation.component';
import {HomeComponent} from './pages/home/home.component';
import {ReloadOptionsComponent} from './pages/reload-options/reload-options.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basic', component: BasicExampleComponent},
  {path: 'modal', component: ModalExampleComponent},
  {path: 'auto-detect', component: AutoDetectExampleComponent},
  {path: 'reload', component: ReloadOptionsComponent},
  {path: 'getting-started', component: DocumentationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    PagesModule
  ],
  exports: [
    RouterModule,
    PagesModule
  ]
})

export class AppRoutingModule {
}
