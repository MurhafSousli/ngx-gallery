import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-core.component.html',
  styleUrls: ['./doc-core.component.scss']
})
export class DocCoreComponent {

  docs = `import { GalleryModule } from  'ngx-gallery';

@NgModule({
  imports: [
    GalleryModule
  ]
})`;

  docsWithConfig = `import { GalleryModule } from  'ngx-gallery';

@NgModule({
  imports: [
    GalleryModule.withConfig({ ... })
  ]
})`;

  globalConfig = `import { GALLERY_CONFIG } from 'ngx-gallery';

@NgModule({
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ]
})
export class AppModule { }`;

}
