import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-gallerize',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-gallerize.component.html',
  styleUrls: ['./doc-gallerize.component.scss']
})
export class DocGallerizeComponent {

  docs = `import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';
import { GallerizeModule } from  '@ngx-gallery/gallerize';

@NgModule({
 imports: [
    BrowserAnimationsModule,
    GalleryModule.forRoot(galleryConfig?),
    GalleryLightbox.forRoot(lightboxConfig?),
    GallerizeModule
 ]
})`;

  importStyle = `@import '~@ngx-gallery/core/styles/scss/gallery';
@import '~@ngx-gallery/core/styles/scss/lightbox';`;

}
