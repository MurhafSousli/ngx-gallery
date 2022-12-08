import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-core.component.html',
  styleUrls: ['./doc-core.component.scss']
})
export class DocCoreComponent {

  docs = `import { GalleryModule } from  'ng-gallery';

@NgModule({
  imports: [
    GalleryModule
  ]
})`;

  docsWithConfig = `import { GalleryModule } from  'ng-gallery';

@NgModule({
  imports: [
    GalleryModule.withConfig({ ... })
  ]
})`;

  globalConfig = `import { GALLERY_CONFIG } from 'ng-gallery';

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
