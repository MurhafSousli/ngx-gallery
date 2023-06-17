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

  readonly globalConfig: string = `import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    },
  ]
})`

}
