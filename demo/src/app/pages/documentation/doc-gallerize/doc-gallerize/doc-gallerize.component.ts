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
    GallerizeLightbox
 ]
})`;


  example = `<div class="grid" gallerize innerHtml="{{htmlThatHasImages}}"></div>
<!-- OR -->
<div class="grid" gallerize="galleryId" forClass="lightbox-img">
  <img class="lightbox-img" *ngFor="let item of items" src="{{item.src}}">
</div>`;

}
