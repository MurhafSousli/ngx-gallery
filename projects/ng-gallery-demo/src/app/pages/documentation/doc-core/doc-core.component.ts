import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NoteComponent } from '../../../shared/note/note.component';
import { HlCodeComponent } from '../../../shared/hl-code/hl-code.component';
import { SectionTitleComponent } from '../../../shared/section-title/section-title.component';

@Component({
  selector: 'app-getting-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-core.component.html',
  styleUrls: ['./doc-core.component.scss'],
  standalone: true,
  imports: [SectionTitleComponent, HlCodeComponent, MatButtonModule, RouterLink, NoteComponent]
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
