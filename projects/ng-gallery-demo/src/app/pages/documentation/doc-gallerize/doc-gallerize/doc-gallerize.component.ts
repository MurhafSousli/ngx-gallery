import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-gallerize',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-gallerize.component.html',
  styleUrls: ['./doc-gallerize.component.scss']
})
export class DocGallerizeComponent {

  docs = `import { GalleryModule } from  'ngx-gallery';
import { LightboxModule } from  'ngx-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule,
  ]
})`;

}
