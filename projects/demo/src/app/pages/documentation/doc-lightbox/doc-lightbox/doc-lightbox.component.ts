import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss']
})
export class DocLightboxComponent {

  docs = `import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule
  ]
})`;

  docsWithConfig = `import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule.withConfig({ ... })
  ]
})`;

  globalConfig = `import { LIGHTBOX_CONFIG } from '@ngx-gallery/lightbox';

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
