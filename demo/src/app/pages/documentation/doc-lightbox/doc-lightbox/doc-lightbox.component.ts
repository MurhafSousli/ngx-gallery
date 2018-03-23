import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss'],
  preserveWhitespaces: false
})
export class DocLightboxComponent {

  docs = `import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from  '@ngx-gallery/core';
import { GalleryLightbox } from  '@ngx-gallery/lightbox';

@NgModule({
 imports: [
    BrowserAnimationsModule,
    GalleryModule.forRoot(galleryConfig?),
    GalleryLightbox.forRoot(lightboxConfig?)
 ]
})`;

}
