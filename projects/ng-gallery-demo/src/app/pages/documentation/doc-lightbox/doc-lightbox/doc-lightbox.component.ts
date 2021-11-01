import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss']
})
export class DocLightboxComponent {

  docs = `import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule
  ]
})`;

  docsWithConfig = `import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule.withConfig({ ... })
  ]
})`;

  globalConfig = `import { LIGHTBOX_CONFIG } from 'ng-gallery/lightbox';

@NgModule({
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    }
  ]
})
export class AppModule { }`;

}
