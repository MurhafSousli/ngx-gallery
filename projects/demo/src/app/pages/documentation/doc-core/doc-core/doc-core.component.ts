import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doc-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-core.component.html',
  styleUrls: ['./doc-core.component.scss']
})
export class DocCoreComponent {

  importStyle = `@import '~@ngx-gallery/core/styles/gallery/';`;
  docs = `import { GalleryModule } from  '@ngx-gallery/core';

@NgModule({
 imports: [
    GalleryModule.forRoot(config?)
 ]
})`;

}
