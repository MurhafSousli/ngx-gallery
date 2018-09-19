import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss']
})
export class DocLightboxComponent {

  docs = `import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';

@NgModule({
 imports: [
    BrowserAnimationsModule,
    GalleryModule.forRoot(galleryConfig?),
    LightboxModule.forRoot(lightboxConfig?)
 ]
})`;

  importStyle = `@import '~@ngx-gallery/core/styles/scss/gallery';
@import '~@ngx-gallery/core/styles/scss/lightbox';`;

}
